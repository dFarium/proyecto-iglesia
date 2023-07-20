import axios, { AxiosResponse } from "axios";

export interface IArchivos {
    _id?: string;
    fileName: string;
    tagCategoria: string;
    mimetype: string;
    url: string;
    userSubida: string;
    userModifica?: string;
    publico: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}

const viewAllFiles = async () => {
    const res = await axios.get(`${process.env.API_URL}/files/`);
    return res.data;
};

const viewOneFile = async (id: string) => {
    const res = await axios.get(`${process.env.API_URL}/file/specific/${id}`);
    return res.data;
};

const viewFavorite = async (id: string) => {
    const res = await axios.get(`${process.env.API_URL}/file/${id}`);
    return res.data;
};

const downloadFile = async (id: string) => {
    const res = await axios.get(`${process.env.API_URL}/file/download/${id}`);
    return res.data;
};

const subirArchivo = async () => {
    const res = await axios.get(`${process.env.API_URL}/file/upload/`);
    return res.data;
};

const deleteFile = async (id: string) => {
    const res = await axios.get(`${process.env.API_URL}/file/delete/${id}`);
    return res.data;
};

export {
    viewAllFiles,
    viewOneFile,
    viewFavorite,
    downloadFile,
    subirArchivo,
    deleteFile,
};
