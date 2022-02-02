import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "./style.module.scss";
import React, { useState, useEffect } from "react";
import { RANDOM_COLOR } from "../../utils/common";
import usePrefecture from "./usePrefecture";
const ListPrefecture: NextPage = ({
  dataPrefecture,
  setChecked,
  checked,
  getDataPopulation,
  setDataPopulation,
  dataPopulation,
}) => {
  const { handleCheck, isChecked } = usePrefecture(  dataPrefecture,
    setChecked,
    checked,
    getDataPopulation,
    setDataPopulation,
    dataPopulation   );

  return (
    <>
      <div className={styles.checkList}>
        <div className={styles.title}>Your CheckList:</div>
        <div className={styles.list__container}>
          {dataPrefecture?.map((item, index) => (
            <div className={styles.item__prefecture} key={item?.prefCode}>
              <input
                key={index}
                value={item?.prefName}
                type="checkbox"
                onChange={handleCheck}
              />
              <span className={isChecked(item?.prefName)}>
                {item?.prefName}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ListPrefecture;
