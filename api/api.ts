import axios from './axios'
export const listPrefectures = () => axios.get("/prefectures")
export const dataPopulations = (data) => axios.get("/population/composition/perYear", {params: data})


