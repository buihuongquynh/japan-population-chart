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
  const [dataPopulation, setDataPopulation] = useState([
    {
      year: "1970", 
      total: 150000 
    },
    {
      year: "1980",
      total: 300000 

    },
    {
      year: "1990",
      total: 4500000 

    },
    {
      year: "2000",
      total: 100000 

    },
    {
      year: "2010",
      total: 100000 

    },
    {
      year: "2020",
      total: 100000 


    },
    
  ])
  const getDataPopulation = async (prefCode, prefName) => {
    try {
      const data = {
        cityCode: '-',
        prefCode,
      }
      const resPopulation = await dataPopulations(data)
      const PopuCompact = resPopulation.result.data[0].data
      const formatData = dataPopulation
     for (let index = 0; index < formatData.length; index++) {
        formatData[0][`${prefName}`] = PopuCompact[2]?.value;
        formatData[1][`${prefName}`] = PopuCompact[4]?.value;
        formatData[2][`${prefName}`] = PopuCompact[6]?.value;
        formatData[3][`${prefName}`] = PopuCompact[8]?.value;
        formatData[4][`${prefName}`] = PopuCompact[10]?.value;
        formatData[5][`${prefName}`] = PopuCompact[12]?.value;

     }
      setDataPopulation(formatData)   
     } catch (error) {
      if (error?.response?.status === 404) {
        router.push('/404')
      }
    }
  }
  const getListCities = async () => {
    try {
      const resPrefecture = await listPrefectures()
      setDataPrefecture(resPrefecture?.result)
      resPrefecture?.result.forEach(element => {
        getDataPopulation(element.prefCode, element.prefName)
      });
    } catch (error) {
      if (error.response.status === 404) {
        router.push('/404')
      }
    }
  }
 
  console.log(dataPopulation,"dataPopulation")
  useEffect(() => {
    getListCities()
  }, [dataPopulation]);
  return {
    dataPrefecture,
    dataPopulation,
    getDataPopulation,
    setDataPopulation
  };
};
export default useChart;