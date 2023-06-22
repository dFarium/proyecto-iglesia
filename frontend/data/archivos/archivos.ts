

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