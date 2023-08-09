import axios, { AxiosResponse } from "axios";

export interface ItemCalendario {
    nombreAct: string;
    fechaInicio?: Date;
    fechaTermino?: Date;
    estadoActividad: boolean;
    descripcion: string;
    _id?: string;
}

const obtenerListaCalendario = async () => {
    const res = await axios.get(`${process.env.API_URL}/calendario/getall`);
    return res.data;
};

const crearItemCalendario = async (item: ItemCalendario) => {
    const res = await axios.post(
        `${process.env.API_URL}/calendario/create`,
        item
    );
    return res.data;
};

const eliminarItemCalendario = async (id: string) => {
    const res = await axios.delete(`${process.env.API_URL}/calendario/delete`, {
        data: { id },
    });
    console.log(res);
    return res.data;
};

export {
    obtenerListaCalendario,
    crearItemCalendario,
    eliminarItemCalendario,
}