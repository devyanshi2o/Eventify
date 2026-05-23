import axios from "axios";

const API = "http://localhost:5000/api/events";

export const getEvents = () => axios.get(API);

export const createEvent = (data) =>
   axios.post(API, data);

export const updateEvent = (id, data) =>
   axios.put(`${API}/${id}`, data);

export const deleteEvent = (id) =>
   axios.delete(`${API}/${id}`);

export const getSingleEvent = (id) =>
   axios.get(`${API}/${id}`);