import axios from "axios";
import { responseValidator } from "../utils/responseValidator";
const RestAPIController = async (config) => {
  config.headers = {
    "Content-Type": "application/json",
  };
  return await axios(config).then((response) => {
    return responseValidator(response);
  });
};

export default RestAPIController;
