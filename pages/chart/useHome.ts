import React, {useState, useEffect} from 'react';
import axios from 'axios';
interface HomeController {
    data: object;
  }

const useHome = ():HomeController => {
//   const [data, setData] = useState(Object);
//   useEffect(():void => {
//     let mounted = true;
//     const fetchApi = async () => {
//       try {
//         const res = await axios.get(
//           `https://www.themealdb.com/api/json/v1/1/filter.php?a=American`,
//         );
//         setData(res.data.meals);
//       } catch (error) {
//         console.log(error);
//       }
//     };
   
//   }, []);

  
  return {
    data,
  };
};
export default useHome;