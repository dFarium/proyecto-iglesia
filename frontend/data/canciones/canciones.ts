import axios, { AxiosResponse } from "axios";

export interface IModeloCancion {
    nombre: string;
    clave?: string;
    letra?: string;
    genero?: string;
    autor?: string;
    instrumentos?: string;
    id_song?: string;
    _id?: string; // id de mongoDB
    __v?: number;
}

const createCancion = async (cancion: IModeloCancion) => {
    const res = await axios.post(`${process.env.API_URL}/canciones/create`, cancion);
    return res.data;
};

const editarCancion = async (id: string, newCancion: IModeloCancion) => {
    console.log(id,newCancion);
    const res = await axios.put(`${process.env.API_URL}/canciones/edit/${id}`,newCancion);
    console.log(res);
    return res.data;
}

const deleteCancion = async (id: string) => {
    const res = await axios.delete(`${process.env.API_URL}/canciones/delete`,{data:{id}});
    return res.data;
}

const getCancion =async (id: string) => {
    const res = await axios.get(`${process.env.API_URL}/canciones/getone/${id}`);
    return res.data;
}

const getAllCancion = async () => {
    const res = await axios.get(`${process.env.API_URL}/canciones/getall`);
    return res.data;
}

export {
    createCancion,
    editarCancion,
    deleteCancion,
    getCancion,
    getAllCancion
}