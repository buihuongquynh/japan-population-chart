import type { NextPage } from "next";
import Head from "next/head";
import Chart from "./chart";
const Index: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>日本の人口チャート</title>
        <meta name="description" />
      </Head>
      <Chart/>
    </div>
  );
};

export default Index;
