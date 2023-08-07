import axios, { AxiosResponse } from "axios";

export interface ItemTesoreria {
  nombre: string;
  valorCaja: number;
  fechaGasto?: Date;
  descripcion: string;
  tipo: string;
  boleta?: string;
  _id?: string;
}

const obtenerTodoTesoreria = async () => {
  const res = await axios.get(`${process.env.API_URL}/tesoreria/getall`);
  return res.data;
};

const ObtenerGastoIngresoTesoreria = async (id: string) => {
  const res = await axios.get(`${process.env.API_URL}/tesoreria/getone/${id}`);
  return res.data;
};

const editarGastoIngresoTesoreria = async (id: string, newItem: ItemTesoreria) => {
  const res = await axios.put(`${process.env.API_URL}/tesoreria/edit/${id}`, {
    newItem,
  });
  return res.data;
};

const crearGastoIngresoTesoreria = async (item: ItemTesoreria) => {
  const res = await axios.post(
    `${process.env.API_URL}/tesoreria/create`,
    item
  );
  return res.data;
};

const eliminarGastoIngresoTesoreria = async (id: string) => {
  const res = await axios.delete(`${process.env.API_URL}/tesoreria/delete`, {
    data: { id },
  });
  console.log(res);
  return res.data;
};

const obtenerIngresoTesoreria = async () => {
  const res = await axios.get(`${process.env.API_URL}/tesoreria/geting`);
  return res.data;
};

const obtenerGastoTesoreria = async () => {
  const res = await axios.get(`${process.env.API_URL}/tesoreria/getgas`);
  return res.data;
};

const obtenerGastosTesoreriaPorFecha = async (fechaInicio: Date, fechaFin: Date) => {
  const res = await axios.delete(`${process.env.API_URL}/tesoreria/getgasfecha/`, {
    data: { fechaInicio, fechaFin },
  });
  console.log(res);
  return res.data;
};

const obtenerIngresoTesoreriaPorFecha = async (fechaInicio: Date, fechaFin: Date) => {
  const res = await axios.delete(`${process.env.API_URL}/tesoreria/delete`, {
    data: { fechaInicio, fechaFin },
  });
  console.log(res);
  return res.data;
};
export {

  ObtenerGastoIngresoTesoreria,
  obtenerTodoTesoreria,
  editarGastoIngresoTesoreria,
  eliminarGastoIngresoTesoreria,
  crearGastoIngresoTesoreria,
  obtenerIngresoTesoreria,
  obtenerGastoTesoreria,
  obtenerGastosTesoreriaPorFecha,
  obtenerIngresoTesoreriaPorFecha
};