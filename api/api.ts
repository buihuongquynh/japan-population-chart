import axios from './axios'
export const listPrefectures = () => axios.get("/prefectures")
export const dataPopulations = () => axios.get(`/population/composition/perYear?cityCode=11362&prefCode=11`)

