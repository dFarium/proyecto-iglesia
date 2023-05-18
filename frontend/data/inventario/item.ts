import axios, { AxiosResponse } from "axios";

export interface IItemInventario {
  _id?: string;
  name: string;
  categoria?: string;
  cantidad: number;
  state: string;
  outDate?: Date;
  desc?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

const getItemInventario = async (id: string) => {
  const res = await axios.get(`${process.env.API_URL}/inventario/getone/${id}`);
  return res.data;
};

const getAllItemsInventario = async () => {
  const res = await axios.get(`${process.env.API_URL}/inventario/getall`);
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
    data: { id },
  });
  console.log(res);
  return res.data;
};

export {
  getItemInventario,
  getAllItemsInventario,
  editItemInventario,
  createItemInventario,
  deleteItemInventario,
};
