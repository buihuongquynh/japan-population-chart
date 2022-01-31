import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { listPrefectures, dataPopulations } from '../../api/api';
import { useRouter } from 'next/router';
import queryString from 'query-string';
interface HomeController {
    data: object;
  }

const useChart = ():HomeController => {
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
  const getDataPopulation = async (prefCode, prefName) => {
    try {
      const data = {
        cityCode: '-',
        prefCode,
      }
      const resPopulation = await dataPopulations(data)
      const PopuCompact = resPopulation.result.data[0].data
      const formatData = [
        {
          year: "",
          
        },
        {
          year: "1980",
        },
        {
          year: "1990",
        },
        {
          year: "2000",
        },
        {
          year: "2010",
        },
        {
          year: "2020",
        },
       
      ]
     for (let index = 0; index < formatData.length; index++) {
        formatData[0][`${prefName}`] = PopuCompact[2]?.value/100;
        formatData[1][`${prefName}`] = PopuCompact[4]?.value/100;
        formatData[2][`${prefName}`] = PopuCompact[6]?.value/100;
        formatData[3][`${prefName}`] = PopuCompact[8]?.value/100;
        formatData[4][`${prefName}`] = PopuCompact[10]?.value/100;
        formatData[5][`${prefName}`] = PopuCompact[12]?.value/100;

     }
     console.log(formatData,"format")
      setDataPopulation(formatData)
      console.log(resPopulation.result.data[0].data,"hihi")
    } catch (error) {
      if (error?.response?.status === 404) {
        router.push('/404')
      }
    }
  }
  
  useEffect(() => {
    getListCities()
    getDataPopulation(1, '北海道')
  }, []);
  return {
    dataPrefecture,
    dataPopulation,
    getDataPopulation,
    setDataPopulation
  };
};
export default useChart;