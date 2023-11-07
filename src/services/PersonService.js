import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api/persons';

export const getAllPersons = () => {
    return axios.get(BASE_URL);
};

export const getPerson = (id) => {
    return axios.get(`${BASE_URL}/${id}`);
};

export const createPerson = (person) => {
    return axios.post(BASE_URL, person);
};

export const updatePerson = (id, person) => {
    return axios.put(`${BASE_URL}/${id}`, person);
};

export const deletePerson = (id) => {
    return axios.delete(`${BASE_URL}/${id}`);
};
