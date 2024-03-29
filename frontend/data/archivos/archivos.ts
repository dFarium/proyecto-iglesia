import axios, { AxiosResponse } from "axios";

export interface IArchivos {
  _id?: string;
  originalName: string;
  fileName: string;
  userName?:string;
  tagCategoria: string;
  mimetype?: string;
  url?: string;
  userSubida?: string;
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
  folderName: string,
  saveName: string,
  tag: string,
  acceso: boolean
) => {
  const resFile = await axios.post(
    `${process.env.API_URL}/file/upload/${folderName}/${saveName}/${tag}/${acceso}`,
    file,
    {
      headers: { "Content-Type": "multipart-formdata" },
    }
  );
  return resFile.data;
};

const viewImg = async (folderName: string, imgName: string) => {
  const res = await axios.get(
    `${process.env.API_URL}/file/${folderName}/${imgName}`
  );
  console.log(res);
  return res;
};

const viewAllFiles = async () => {
  const res = await axios.get(`${process.env.API_URL}/files/`);
  return res.data;
};

const viewAllSpecificFiles = async (access: boolean) => {
  const res = await axios.get(`${process.env.API_URL}/files/specific/${access}`);
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
  console.log(process.env.API_URL, "/file/download/", id);
  const res = await axios.get(`${process.env.API_URL}/file/download/${id}`);
  return res;
};

// const subirArchivo = async () => {
//     const res = await axios.get(`${process.env.API_URL}/file/upload/`);
//     return res.data;
// };

const deleteFile = async (id: string) => {
  const res = await axios.delete(`${process.env.API_URL}/file/delete/${id}`);
  return res.data;
};

const updateFile = async (id: string, newItem: IArchivos) => {
  const res = await axios.put(`${process.env.API_URL}/files/update/${id}`, {
    newItem,
  });
  return res.data;
};

const subirNewFile = async (
  file: FormData,
  folderName: string,
  saveName: string,
  tag: string,
  acceso: boolean,
  userName: string
) => {
  const resFile = await axios.post(
    `${process.env.API_URL}/file/uploadFile/${folderName}/${saveName}/${tag}/${acceso}/${userName}`,
    file,
    {
      headers: { "Content-Type": "multipart-formdata" },
    }
  );
  return resFile.data;
};

export {
  viewAllFiles,
  viewOneFile,
  viewFavorite,
  downloadFile,
  // subirArchivo,
  deleteFile,
  uploadNewFile,
  viewImg,
  uploadNewFileData,
  updateFile,
  subirNewFile,
  viewAllSpecificFiles
};
