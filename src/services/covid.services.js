import axios from "axios";
import { API_COVID_URL } from "../config";

const getAll = async () => {
  const { data, status } = await axios.get(`${API_COVID_URL}/all`);
  return status === 200 && data ? data : null;
};

export default {
  getAll,
};
