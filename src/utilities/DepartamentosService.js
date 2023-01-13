import Constants from "./Constants";
import axios from 'axios';

export const Get = async () => {
    let response = {};
    try {
        response = await axios.get(Constants.API_GET_ALL_DEPARTAMENTOS);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const GetById = async (id) => {
    let response = {};
    try {
        response = await axios.get(Constants.API_GET_DEPARTAMENTO_BY_ID + id);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const Post = async (departamento) => {
    try {
        await axios.post(Constants.API_CREATE_DEPARTAMENTO, departamento);
    } catch (error) {
        throw error;
    }
};

export const Put = async (id, departamento) => {
    try {
        await axios.put(Constants.API_UPDATE_DEPARTAMENTO + id, departamento);
    } catch (error) {
        throw error;
    }
};

export const Delete = async (id) => {
    try {
        await axios.delete(Constants.API_DELETE_DEPARTAMENTO + id);
    } catch (error) {
        throw error;
    }
};