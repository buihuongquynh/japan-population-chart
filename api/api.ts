import axios from './axios'
export const listPrefectures = () => axios.get("/prefectures")
export const dataPopulations = (data: { cityCode: string; prefCode: number }) => axios.get("/population/composition/perYear", {params: data})


