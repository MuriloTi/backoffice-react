import Constants from "./Constants";
import axios from 'axios';

export const Get = async () => {
    let response = {};
    try {
        response = await axios.get(Constants.API_GET_ALL_PESSOAS);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const GetById = async (id) => {
    let response = {};
    try {
        response = await axios.get(Constants.API_GET_PESSOA_BY_ID + id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const Post = async (pessoa) => {
    try {
        await axios.post(Constants.API_CREATE_PESSOA, pessoa);
    } catch (error) {
        throw error;
    }
};

export const Put = async (id, pessoa) => {
    try {
        await axios.put(Constants.API_UPDATE_PESSOA + id, pessoa);
    } catch (error) {
        throw error;
    }
};

export const Delete = async (id) => {
    try {
        await axios.delete(Constants.API_DELETE_PESSOA + id);
    } catch (error) {
        throw error;
    }
};