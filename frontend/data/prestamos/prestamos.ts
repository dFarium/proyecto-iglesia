import axios, { AxiosResponse } from "axios";
import {IItemInventario} from "@/data/inventario/item";

export interface IPrestamoInstrumento {
    _id?: string,
    instrumento: {
        _id: string,
        nombre: string
    },
    prestatario: {
        _id: string,
        name: string
    },
    prestamista: {
        _id: string,
        name: string
    },
    devuelto: boolean,
    fechaInicio: Date,
    fechaLimite: Date,
    comentario?: string,
    createdAt: Date,
    updatedAt: Date,
    fechaDevolucion?: Date,
    __v?: number
}

export interface ICrearInstrumento {
    instrumento: string,
    prestatario: string,
    prestamista: string,
    fechaInicio: Date,
    fechaLimite: Date,
    comentario?: string
}

const getAllPrestamoInstrumento = async () => {
    const res = await axios.get(`${process.env.API_URL}/prestamo/getall`);
    return res.data;
};

const getPrestamoInstrumento = async (id: string) => {
    const res = await axios.get(`${process.env.API_URL}/prestamo/getone/${id}`);
    return res.data;
};


const editPrestamoInstrumento = async (id: string, newItem: ICrearInstrumento) => {
    const res = await axios.put(`${process.env.API_URL}/prestamo/edit/${id}`, {
        newItem,
    });
    return res.data;
};

const createPrestamoInstrumento = async (prestamo: ICrearInstrumento) => {
    const res = await axios.post(
        `${process.env.API_URL}/prestamo/create`,
        prestamo
    );
    return res.data;
};

const deletePrestamoInstrumnto = async (id: string) => {
    const res = await axios.delete(`${process.env.API_URL}/prestamo/delete`, {
        data: { id },
    });
    console.log(res);
    return res.data;
};

const getInstrumentosPrestables = async () => {
    const res = await axios.get(
        `${process.env.API_URL}/prestamo/getAvailableInstrumento`
    )
    return res.data;
}



export {
    getAllPrestamoInstrumento,
    getPrestamoInstrumento,
    editPrestamoInstrumento,
    createPrestamoInstrumento,
    deletePrestamoInstrumnto,
    getInstrumentosPrestables
};
