import axios from "axios";

const API_URL = 'http://localhost:8080/athletes';

export async function saveAthlete(athlete){
    return await axios.post(API_URL, athlete);
}
export async function deleteAthlete(id){
    return await axios.delete(`${API_URL}/${id}`);
}

export async function getAthletes(page = 0, size = 10){
    return await axios.get(`${API_URL}?page=${page}&size=${size}`);
}

export async function getAthlete(id){
    return await axios.get(`${API_URL}/${id}`);
}

export async function updateAthlete(athlete){
    return await axios.post(API_URL, athlete);
}


export async function updatePhoto(formData){
    return await axios.put(`${API_URL}/photo`, formData);
}

