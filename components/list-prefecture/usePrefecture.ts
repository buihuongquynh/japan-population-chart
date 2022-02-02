import React, {useState, useEffect} from 'react';
import { listPrefectures, dataPopulations } from '../../api/api';
import { useRouter } from 'next/router';
const usePrefecture = (dataPrefecture,
  setChecked,
  checked,
  getDataPopulation,
  setDataPopulation,
  dataPopulation) => {
 
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      getDataPopulation()
      updatedList = [...checked,{name:event.target.value, color: "#" + ((Math.random() * 0xffffff) | 0).toString(16)    } ];
      // const dataSelect = dataPrefecture.filter((item, index)=>(item.prefName === event.target.value))
      // getDataPopulation(dataSelect[0].prefCode, dataSelect[0].prefName)
      setChecked(updatedList);
      console.log(updatedList,"aaa")

    } else {
      // const dataRemove = [...dataPopulation]
      // setDataPopulation
      // updatedList.splice(checked.name.indexOf(event.target.value), 1);
      const dataTest = [...checked]
      const updatedList = dataTest.filter((item, index)=>(item.name !== event.target.value))
      console.log(updatedList,"aa")
      setChecked(updatedList);

    }
  };
  // Generate string of checked items
  // Return classes based on whether item is checked
  const isChecked = (item) => {
    return checked.includes(item) ? "checked-item" : "not-checked-item";
  };
  return {
    handleCheck,
    isChecked
  };
};
export default usePrefecture;