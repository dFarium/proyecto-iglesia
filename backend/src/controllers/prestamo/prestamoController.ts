import {IPrestamoInstrumento, PrestamoInstrumento} from "../../models/prestamo/prestamo";
import {IUsuarioModel, UsuarioModel} from "../../models/usuario/usuarioModel";
import {Request, Response} from "express";
import {CallbackError} from "mongoose";
import {sendMail} from "../correoPrestamo/mailController";

const nodeCron = require("node-cron");

const createPrestamoInstrumento = async (req: Request, res: Response) => {
  let newPrestamo = new PrestamoInstrumento(req.body);

  await newPrestamo.save().catch((err: CallbackError) => {
    console.log(err);
    return res.status(400).send({ message: "Error al generar prestamo" });
  });
  return res.status(201).send(newPrestamo);
};

const getIPrestamoInstrumento = async (req: Request, res: Response) => {
  await PrestamoInstrumento.findOne({ name: req.body.name })
    .then((item: IPrestamoInstrumento) => {
      return res.status(200).send(item);
    })
    .catch((err: CallbackError) => {
      console.log(err);
      return res
        .status(400)
        .send({ message: "Error al encontrar el prestamo" });
    });
};

const editPrestamoInstrumento = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  await PrestamoInstrumento.findByIdAndUpdate(id, req.body.newItem)
    .then((item: IPrestamoInstrumento) => {
      if (!item) {
        return res.status(404).send({ message: "Item no encontrado" });
      }
      return res.status(200).send({ message: "Item actualizado" });
    })
    .catch((err: CallbackError) => {
      console.log(err);
      return res.status(400).send({ message: "Error al editar Item" });
    });
};

const deleteIPrestamoInventario = async (req: Request, res: Response) => {
  const { id } = req.body;
  await PrestamoInstrumento.findByIdAndDelete(id)
    .then(() => {
      return res.status(200).send({ message: "Prestamo eliminado correctamente" });
    })
    .catch((err: CallbackError) => {
      console.log(err);
      return res.status(400).send({ message: "Error al eliminar el prstamo" });
    });
};

const getAllPrestamosInstrumento = async (req: Request, res: Response) => {
  await PrestamoInstrumento.find({})
    .sort({ createdAt: "desc" })
    .then((items: IPrestamoInstrumento[]) => {
      if (items.length === 0) {
        return res.status(200).send([]);
      }
      return res.status(200).send(items);
    })
    .catch((err: CallbackError) => {
      console.log(err);
      return res
        .status(400)
        .send({ message: "Error al obtener los prestamos de instrumentos" });
    });
};

//Revisa a las 9 si hay personas que necesitan ser avisadas
nodeCron.schedule('* * * * *',() =>{
    console.log("CORREOS");
    notificarPrestamosPendientes();
});



async function buscarPrestamosPorVencer(): Promise<IPrestamoInstrumento[]> {
    const fechaActual = new Date();
    const fechaLimite = new Date();
    fechaLimite.setDate(fechaLimite.getDate() + 3);

    try {
        return await PrestamoInstrumento.find({
            fechaLimite: {$gte: fechaActual, $lte: fechaLimite},
            devuelto: false,
        })
            .populate("prestatario", "name email") // Obtiene solo el campo 'name' y 'email' del prestatario
            .exec();
    } catch (error) {
        console.error("Error al buscar préstamos por vencer:", error);
        throw error;
    }
}

const notificarPrestamosPendientes = async () => {
    try {
        const prestamosPendientes = await buscarPrestamosPorVencer();

        if (prestamosPendientes.length === 0) {
            console.log("Sin prestamos pendientes hoy")
        }

        // Envía un correo a cada usuario prestatario
        for (const prestamo of prestamosPendientes) {
            try {
                const prestatario = await UsuarioModel.findById(prestamo.prestatario) as IUsuarioModel;
                if (prestatario) {
                    if (prestatario.email) {
                        sendMail(
                            "Tu Nombre", // Nombre o remitente del correo
                            "Préstamo por vencer", // Asunto del correo
                            prestatario.email, // Correo del prestatario
                            `Hola ${prestatario.name}, tienes un préstamo de instrumento que está por vencer.`, // Contenido del correo
                            // Objeto 'res' para enviar la respuesta al cliente después de enviar el correo
                        );
                    }
                }
            } catch (error) {
                console.error("Error al enviar el correo:", error);
            }
        }

        // No envíes una respuesta aquí, ya que se enviará en la función sendMail
    } catch (error) {
        // ... manejo de errores ...
    }
};



export {
    createPrestamoInstrumento,
    getIPrestamoInstrumento,
    editPrestamoInstrumento,
    deleteIPrestamoInventario,
    getAllPrestamosInstrumento,
    notificarPrestamosPendientes
};
