import styles from "./style.module.scss";
import React, { useState, useEffect } from "react";
import { listPrefectures, dataPopulations } from "../../api/api";
import { useRouter } from "next/router";
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
import ListPrefecture from "../../components/list-prefecture";
export type ChartType = {
  name: any;
  color: string;
  prefCode: number;
  prefName: any | string;
  year: string;
  checked: any;
  setChecked: (checked: any) => void;
};
const Chart = () => {
  const [dataPrefecture, setDataPrefecture] = useState([] as ChartType[]);
  const [checked, setChecked] = useState([] as ChartType[]);
  const [loadding, setLoadding] = useState(false);
  const [dataPopulation, setDataPopulation] = useState([
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
  ] as ChartType[]);
  const getDataPopulation = async (prefCode: number, prefName: string) => {
    setLoadding(true);
    try {
      const data = {
        cityCode: "-",
        prefCode,
      };
      const resPopulation = await dataPopulations(data);
      const PopuCompact = resPopulation?.result?.data[0]?.data;
      const formatData = dataPopulation as any;
      for (let index = 0; index < formatData.length; index++) {
        formatData[0][`${prefName}`] = PopuCompact[2]?.value;
        formatData[1][`${prefName}`] = PopuCompact[4]?.value;
        formatData[2][`${prefName}`] = PopuCompact[6]?.value;
        formatData[3][`${prefName}`] = PopuCompact[8]?.value;
        formatData[4][`${prefName}`] = PopuCompact[10]?.value;
        formatData[5][`${prefName}`] = PopuCompact[12]?.value;
      }
      setDataPopulation(formatData);
      setLoadding(false);
    } catch (error) {
      console.log(error)
    }
  };
  const getListPrefectures = async (): Promise<any> => {
    setLoadding(true);
    try {
      const resPrefecture = await listPrefectures();
      setDataPrefecture(resPrefecture?.result);
      resPrefecture?.result?.forEach(
        (element: { prefCode: number; prefName: string }, index: number) => {
          getDataPopulation(element.prefCode, element.prefName);
        }
      );
    } catch (error) {
      console.log(error)
    }
    setLoadding(false);
  };
  useEffect(() => {
    getListPrefectures();
  }, [dataPopulation]);
  return (
    <div className="wrapper">
      {loadding ? (
        <div className="flexLoading">
        <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="list__prefecture">
            <ListPrefecture
              dataPrefecture={dataPrefecture}
              checked={checked}
              setChecked={setChecked}
            />
          </div>
          <div className={styles.chart}>
            <div className={styles.nameY}>人口数</div>
            <ResponsiveContainer width="98%" height={650}>
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
                <XAxis dataKey="year" />
                <YAxis
                  type="number"
                  domain={["100000", "800000"]}
                />
                <Tooltip />
                <Legend />
                {checked?.map((item, key) => {
                  return (
                    <Line
                      key={item?.name}
                      strokeWidth={3}
                      type="monotone"
                      dataKey={item?.name}
                      stroke={item?.color}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
            <span className={styles.nameX}>年度</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Chart;
