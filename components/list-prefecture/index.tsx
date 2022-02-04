import React from "react";
import styles from "./style.module.scss";
import { ChartType } from "../../pages/chart";
type Props = {
  dataPrefecture: ChartType[];
  setChecked: (checked: ChartType[])=>void
  checked: ChartType[];
};

const ListPrefecture: React.FC<Props> = ({
  dataPrefecture,
  setChecked,
  checked,
}) => {
  const handleCheck = (event: any) => {
    var updatedList = [...checked] as ChartType[];
    if (event.target.checked) {
      updatedList = [
        ...checked,
        { 
          name: event.target.value, 
          color: '#'+(Math.floor(Math.random()*16777215)+1).toString(16) 
        },
      ] as ChartType[];
      setChecked(updatedList);
    } else {
      const dataTest = [...checked];
      const updatedList = dataTest.filter(
        (item, index) => item.name !== event.target.value
      );
      setChecked(updatedList);
    }
  };
  const isChecked = (item: ChartType) => {
    let isChecked
    checked.forEach(element => {
      if(element.name === item){
        isChecked = "checked-item"
      }
      else isChecked = "not-checked-item"
    });
    return isChecked
  };
  return (
    <>
      <div className={styles.checkList}>
        <h1 style={{color:'#1f2f98', fontSize:'30px'}}>都道府県</h1>
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
