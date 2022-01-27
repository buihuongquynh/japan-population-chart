import React, {useState, useEffect} from 'react';
import { listPrefectures, dataPopulations } from '../../api/api';
import { useRouter } from 'next/router';
const useCities = () => {
    const router = useRouter()
  const [dataPrefecture, setDataPrefecture] = useState([]);
  const [dataPopulation, setDataPopulation] = useState([])
  const getListCities = async () => {
    try {
      const resPrefecture = await listPrefectures()
      setDataPrefecture(resPrefecture?.result)
      console.log(resPrefecture?.result,"ressss")
    } catch (error) {
      if (error.response.status === 404) {
        router.push('/404')
      }
    }
  }
  const getDataPopulation = async () => {
    try {
      const resPopulation = await dataPopulations()
      setDataPopulation(resPopulation)
      console.log(resPopulation,"hihi")
    } catch (error) {
      if (error.response.status === 404) {
        router.push('/404')
      }
    }
  }
  useEffect(() => {
    getListCities()
    getDataPopulation()
  }, []);
  return {
    dataPrefecture,
    dataPopulation
  };
};
export default useCities;