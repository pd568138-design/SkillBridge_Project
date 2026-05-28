import axios from "axios";

const API = "http://localhost:5000/api/mentors";

export const getMentors = () => axios.get(API);

export const addMentor = (mentorData) =>
  axios.post(API, mentorData);

export const deleteMentor = (id) =>
  axios.delete(`${API}/${id}`);

// ✅ UPDATE
export const updateMentor = (id, mentorData) =>
  axios.put(`${API}/${id}`, mentorData);