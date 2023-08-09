import axios, {AxiosResponse} from "axios";

export interface IItemInventario {
    nombre: string; // <=
    categoria?: string; // <=

    cantidad?: number; // cantidad actual
    estado?: string; // estado actual

    fechaSalida?: Date; // fecha de salida - vencimiento
    desc?: string; // descripcion - comentarios

    prestable?: boolean; // si es prestable o no (cuestionable)
    ultMant?: Date; // ultima mantencion (fecha)

    cicloMant?: number; // ciclo de mantencion (problemamente en segundos)
    uploader?: string; // quien subió el item (nombre por ahora quizas id despues)

    ultMod?: string; // ultimo en modificar
    urlPic?: string; // url de imagen adjunta

    createdAt?: Date; // timestamp
    updatedAt?: Date; // timestamp

    _id?: string; // id de mongoDB
    __v?: number; // dios sabrá que es esto
}

export interface IEditPrestable {
    prestable?: boolean;
    estado: string;
}

const getAllItemsInventario = async () => {
    const res = await axios.get(`${process.env.API_URL}/inventario/getall`);
    return res.data;
};

const getItemInventario = async (id: string) => {
    const res = await axios.get(`${process.env.API_URL}/inventario/getone/${id}`);
    return res.data;
};

const getItemsInventarioCategoria = async (categoria: string) => {
    const res = await axios.get(
        `${process.env.API_URL}/inventario/getcategoria/${categoria}`
    );
    return res.data;
};

const editItemInventario = async (id: string, newItem: IItemInventario) => {
    const res = await axios.put(`${process.env.API_URL}/inventario/edit/${id}`, {
        newItem,
    });
    return res.data;
};

const createItemInventario = async (item: IItemInventario) => {
    const res = await axios.post(
        `${process.env.API_URL}/inventario/create`,
        item
    );
    return res.data;
};

const deleteItemInventario = async (id: string) => {
    const res = await axios.delete(`${process.env.API_URL}/inventario/delete`, {
        data: {id},
    });
    console.log(res);
    return res.data;
};

const editPrestable = async (id: string, newItem: IEditPrestable) => {
    const res = await axios.put(`${process.env.API_URL}/inventario/edit/${id}`, {
        newItem,
    });
    return res.data;
};

export {
    getItemsInventarioCategoria,
    getAllItemsInventario,
    getItemInventario,
    editItemInventario,
    createItemInventario,
    deleteItemInventario,
    editPrestable
};
