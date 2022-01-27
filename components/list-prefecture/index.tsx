import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "./style.module.scss";
import React, { useState } from "react";
const ListPrefecture: NextPage = ({dataPrefecture}) => {
  
 const [checked, setChecked] = useState([]);
  const handleCheck = (event) => {
   var updatedList = [...checked];
   if (event.target.checked) {
     updatedList = [...checked, event.target.value];
     console.log(event.target.value,"aa")
   } else {
     updatedList.splice(checked.indexOf(event.target.value), 1);
   }
   setChecked(updatedList);
 };

 // Generate string of checked items
 const checkedItems = checked.length
   ? checked.reduce((total, item) => {
       return total + ", " + item;
     })
   : "";
 // Return classes based on whether item is checked
 var isChecked = (item) =>
   checked.includes(item) ? "checked-item" : "not-checked-item";
  return (
    <>
      <div className={styles.checkList}>
        <div className={styles.title}>Your CheckList:</div>
        <div className={styles.list__container}>
          {dataPrefecture?.map((item, index) => (
            <div className={styles.item__prefecture} key={index}>
              <input value={item?.prefCode} type="checkbox" onChange={handleCheck} />
              <span className={isChecked(item?.prefName)}>{item?.prefName}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        {`Items checked are: ${checkedItems}`}
      </div>
    </>
  );
};

export default ListPrefecture;