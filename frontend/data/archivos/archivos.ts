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

const uploadNewFileData = async (fileData: IArchivos) => {
  const resData = await axios.post(
    `${process.env.API_URL}/file/data`,
    fileData
  );
  return resData.data;
};
const uploadNewFile = async (
  file: FormData,
  fileName: string,
  folderName: string
) => {
  const resFile = await axios.post(
    `${process.env.API_URL}/file/upload/${folderName}/${fileName}`,
    file,
    {
      headers: { "Content-Type": "multipart-formdata" },
    }
  );
  return resFile.data;
};

const viewImg = async (imgName: string, folderName: string) => {
  const res = await axios.get(
    `${process.env.API_URL}/file/${folderName}/${imgName}`
  );
  return res;
};

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
  uploadNewFile,
  viewImg,
  uploadNewFileData
};
