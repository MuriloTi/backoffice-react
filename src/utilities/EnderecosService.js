import Constants from "./Constants";
import axios from 'axios';

export const GetById = async (id) => {
    let response = {};
    try {
        response = await axios.get(Constants.API_GET_ENDERECO_BY_ID + id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const Post = async (endereco) => {
    try {
        await axios.post(Constants.API_CREATE_ENDERECO, endereco);
    } catch (error) {
        throw error;
    }
};

export const Put = async (id, endereco) => {
    try {
        await axios.put(Constants.API_UPDATE_ENDERECO + id, endereco);
    } catch (error) {
        throw error;
    }
};

export const Delete = async (id) => {
    try {
        await axios.delete(Constants.API_DELETE_ENDERECO + id);
    } catch (error) {
        throw error;
    }
};