import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "./style.module.scss";
import React, { PureComponent, useState , useEffect} from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useChart from "./useChart";

import ListPrefecture from "../../components/list-prefecture";
const Home: NextPage = () => {
  const { dataPrefecture, dataPopulation, getDataPopulation,setDataPopulation } = useChart();
  const [checked, setChecked] = useState([]);
  useEffect(() => {
  }, [checked])
  return (
    <div className="wrapper">
      <div className="list__prefecture">
        <ListPrefecture
          dataPrefecture={dataPrefecture}
          dataPopulation={dataPopulation}
          checked={checked}
          setChecked={setChecked}
          getDataPopulation={getDataPopulation}
          setDataPopulation={setDataPopulation}
        />
      </div>
      <div className={styles.chart}>
        <div className={styles.nameY}>
          số  dân
        </div>
        <ResponsiveContainer width="98%" height={600}>
          <LineChart
            data={dataPopulation}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year"  />
            <YAxis type="number" domain={['dataMin - 100', 'dataMax + 100']}  />
            <Tooltip />
            <Legend />
            {checked?.map((item, index) => {
              return (
                <Line
                  index
                  strokeWidth={3}
                  type="monotone"
                  dataKey={item.name}
                  stroke={item.color}
                />
              );
            })}
            {/* <Line strokeWidth={3} type="monotone" dataKey="岩手県" stroke="red" /> */}
          </LineChart>
        </ResponsiveContainer>
        <span className={styles.nameX}>
          nam
        </span>
      </div>
    </div>
  );
};

export default Home;
