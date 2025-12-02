import axios from "./axiosInstance";

export const createNote = (data) => axios.post("/note", data);
export const getUserNotes = () => axios.get("/note");
export const getNoteDetails = (id) => axios.get(`/note/${id}`);
export const updateNote = (id, data) => axios.put(`/note/${id}`, data);
export const deleteNote = (id) => axios.delete(`/note/${id}`);
export const togglePinNote = (id) => axios.patch(`/note/${id}/pin`);
export const toggleArchiveNote = (id) => axios.patch(`/note/${id}/archive`);
export const searchNotes = (query) => axios.get(`/note/search?q=${query}`);
export const createTodo = (data) => axios.post(`/note/todo`, data);
export const toggleTodoDone = (id, todoId) =>
  axios.patch(`/note/${id}/todo/${todoId}`);
export const updateTodo = (id, data) => axios.put(`note/${id}/todo`, data);
export const deleteTodo = (id) => axios.delete(`/note/${id}/todo`);
