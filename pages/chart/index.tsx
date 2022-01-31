import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "./style.module.scss";
import React, { PureComponent,useState } from "react";
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
  const {dataPrefecture, dataPopulation,getDataPopulation} = useChart()
  const [checked, setChecked] = useState([]);
  console.log(dataPopulation,"daattatata")
  const data = [
    {
      year: "",
      北海道: 4000,
      青森県: 2400,
      岩手県: 2400,
      count: "100000"
    },
    {
      year: "1980",
      北海道: 4000,
      青森県: 2400,
      岩手県: 2400,
      count: "200000"

    },
    {
      year: "1990",
      北海道: 3000,
      青森県: 1398,
      岩手県: 2210,
      count: "300000"

    },
    {
      year: "2000",
      北海道: 2000,
      青森県: 9800,
      岩手県: 2290,
      count: "400000"

    },
    {
      year: "2010",
      北海道: 2780,
      青森県: 3908,
      岩手県: 2000,
      count: "500000"

    },
    {
      year: "2020",
      北海道: 1890,
      青森県: 4800,
      岩手県: 2181,
      count: "600000"

    },
  ];

  return (
    <div className="wrapper">
      <div className="list__prefecture">
        <ListPrefecture 
        dataPrefecture={dataPrefecture}
        checked={checked}
        setChecked = {setChecked}
        />
      </div>
      <div className="chart">
        <ResponsiveContainer width="80%" height={600}>
          <LineChart
            // width={500}
            // height={300}
            width={730} height={250} 
            data={dataPopulation.length > 0 ? dataPopulation : data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line strokeWidth={3} type="monotone" dataKey="北海道" stroke="#8884d8" />
            <Line strokeWidth={3} type="monotone" dataKey="青森県" stroke="#82ca9d" />
            <Line strokeWidth={3} type="monotone" dataKey="岩手県" stroke="red" />

          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Home;
