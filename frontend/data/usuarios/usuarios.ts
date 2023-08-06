import axios from "axios";

export interface IUsuarioModel {
    name: string;
    rut: string,
    email: string;
    password: string;
    rol?: string[], // referenciado
    telefono?: string,
    direccion?: string,
    fecha_nacimiento?: Date,
    num_emergencia?: string,
    estado?: string, // referenciado
    canciones?: string,
    archivos?: string, // referenciado
    RRSS?: string,
    foto?: string

    createdAt?: Date; // timestamp
    updatedAt?: Date; // timestamp

    _id?: string; // id de mongoDB
    __v?: number; // dios sabrá que es esto
}

const getUser = async (id: string) => {
    const res = await axios.get(`${process.env.API_URL}/usuario/${id}`);
    return res.data;
}

const getUsers = async () => {
    const res = await axios.get(`${process.env.API_URL}/usuarios`);
    return res.data;
}

const updateUser = async (id: string) => {
    const res = await axios.get(`${process.env.API_URL}/usuario/update/${id}`);
    return res.data;
}

const deleteUser = async (id: string) => {
    const res = await axios.get(`${process.env.API_URL}/usuario/delete/${id}`);
    return res.data;
}

const registerUser = async () => {
    const res = await axios.get(`${process.env.API_URL}/usuario/register`);
    return res.data;
}

const loginUser = async () => {
    const res = await axios.get(`${process.env.API_URL}/usuario/login`);
    return res.data;
}

export {
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    registerUser,
    loginUser
};
