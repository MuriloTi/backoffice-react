import Constants from "./Constants";
import axios from 'axios';

export const Get = async (cep) => {
    let response = {};
    try {
        response = await axios.get(Constants.API_GET_CEP + cep + '/json');
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};