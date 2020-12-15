import axios from "axios";
import { API_COVID_URL } from "../config";

const getCountries = async () => {
  const { data, status } = await axios.get(`${API_COVID_URL}/countries`);
  return status === 200 && data ? data : [];
};

export default {
  getCountries,
};
