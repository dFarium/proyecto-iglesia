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
  folderName: string,
  fileName: string
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

const viewImg = async (folderName: string, imgName: string) => {
  const res = await axios.get(
    `${process.env.API_URL}/file/${folderName}/${imgName}`
  );
  return res;
};

export { uploadNewFile, viewImg, uploadNewFileData };
