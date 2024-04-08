import axios, { AxiosResponse } from "axios";
import { Model } from "../models/model";

axios.defaults.baseURL = "http://domain.com/api/";

const responseBody = <T> (response: AxiosResponse<T>) => response.data;
// Generic Crud Requests
const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: object) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: object) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody)
}

// Example of Requests Specified to a Model
const Model = {
    listAll: () => requests.get<Model[]>('model/records'),
    details: (id: number) => requests.get<Model>(`model/${id}`),
    create: (model: Model) => requests.post<void>('model/', model),
    update: (model: Model) => requests.put<void>(`model/${model.id}`, model),
    delete: (id: number) => requests.del<Model>(`model/${id}`),
}

// Add the Request Obj to the Agent Obj for Use
const agent ={
    Model
}

export default agent;