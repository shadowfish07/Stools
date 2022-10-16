import { useState, useEffect, useContext } from "react";
import { SavingContext } from "../main";
import { Storage } from "../utils/Storage";

type Props<T extends keyof StorageData | StorageData = StorageData> = {
  useKey?: T;
};

type execType<T> = T extends keyof StorageData ? StorageData[T] : T;

type returnType<T> = [execType<T>, (data: execType<T>) => void, boolean];

/**
 *  若传入useKey，则返回的数据、更新数据时的入参均为StorageData[useKey]
 */
export const useStorage = <
  T extends keyof StorageData | StorageData = StorageData
>({ useKey }: Props<T> = {}): returnType<T> => {
  const [data, setData] = useState<StorageData>(Storage.data);
  const { isSaving, setIsSaving } = useContext(SavingContext);

  const updateData = (newData: execType<T>) => {
    setIsSaving(true);

    const finalData = (
      useKey ? { ...data, [useKey as keyof StorageData]: newData } : newData
    ) as StorageData;

    Storage.writeLocalData(finalData).then(() => setIsSaving(false));
    setData(finalData);
  };

  const finalData = (
    useKey ? data[useKey as keyof StorageData] : data
  ) as execType<T>;

  console.log(data, finalData, useKey);

  return [finalData, updateData, isSaving];
};
