import { useState, useEffect, useContext } from "react";
import { SavingContext } from "../main";
import { Storage } from "../utils/Storage";

type Props<T extends keyof StorageData | StorageData = StorageData> = {
  useKey?: T;
};

type execType<T> = T extends keyof StorageData ? StorageData[T] : T;

type returnType<T> = {
  data: execType<T>;
  updateField: <P extends FieldType<T>>(
    id: string,
    field: P,
    value: KeyOfMapType<execType<T>>[P]
  ) => void;
  updateData: (newData: execType<T>) => void;
  updateRecord: (id: string, value: KeyOfMapType<execType<T>>) => void;
  isSaving: boolean;
};

type FieldType<T> = keyof KeyOfMapType<execType<T>>;

/**
 *  若传入useKey，则返回的数据、更新数据时的入参均为StorageData[useKey]
 */
export const useStorage = <
  T extends keyof StorageData | StorageData = StorageData
>({ useKey }: Props<T> = {}): returnType<T> => {
  const [data, setData] = useState<StorageData>(Storage.data);
  const { isSaving, setIsSaving } = useContext(SavingContext);

  /**
   * 直接替换整个map或local data
   */
  const updateData = (newData: execType<T>) => {
    setIsSaving(true);

    const finalData = (
      useKey ? { ...data, [useKey as keyof StorageData]: newData } : newData
    ) as StorageData;

    Storage.writeLocalData(finalData).then(() => setIsSaving(false));
    setData(finalData);
  };

  /**
   * 更新指定id的数据
   *
   * 只能在传入useKey时使用
   */
  const updateRecord = (id: string, value: KeyOfMapType<execType<T>>) => {
    if (!useKey) {
      throw new Error("this method is only supported when useKey is passed");
    }
    setIsSaving(true);
    const finalData = {
      ...Storage.data,
      [useKey as keyof StorageData]: new Map(
        Storage.data[useKey as keyof StorageData] as any
      ).set(id, value),
    };

    Storage.writeLocalData(finalData).then(() => setIsSaving(false));
    setData(finalData);
  };

  /**
   * 更新指定id的指定字段数据
   *
   * 只能在传入useKey时使用
   */
  const updateField = <P extends FieldType<T>>(
    id: string,
    field: P,
    value: KeyOfMapType<execType<T>>[P]
  ) => {
    if (!useKey) {
      throw new Error("this method is only supported when useKey is passed");
    }
    setIsSaving(true);
    const finalData = {
      ...Storage.data,
      [useKey as keyof StorageData]: new Map(
        Storage.data[useKey as keyof StorageData] as any
      ).set(id, {
        ...Storage.data[useKey as keyof StorageData].get(id),
        [field]: value,
      }),
    };

    Storage.writeLocalData(finalData).then(() => setIsSaving(false));
    setData(finalData);
  };

  const finalData = (
    useKey ? data[useKey as keyof StorageData] : data
  ) as execType<T>;

  return { data: finalData, updateField, updateData, updateRecord, isSaving };
};
