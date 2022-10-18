import create from "zustand";

type DataState = {
  data: StorageData;
  setData: (data: StorageData) => Promise<void>;
  loadLocalData: () => Promise<StorageData>;
};

const loadLocalData = async () => {
  let jsonData = (await chrome.storage.local.get(["data"])).data;
  console.log("loaded data", jsonData);

  const dataMap = {} as StorageData;

  Object.keys(jsonData).forEach((key) => {
    dataMap[key as keyof StorageData] = new Map();
    jsonData[key as keyof StorageData].forEach(
      (item: { id: string; [key: string]: unknown }) => {
        dataMap[key as keyof StorageData].set(item.id, item as any);
      }
    );
  });

  console.log("parsed data", dataMap);

  return dataMap;
};

const writeLocalData = async (data: StorageData) => {
  const finalData: JsonStorageData = {
    categories: [] as any,
    bookmarks: [] as any,
  };

  Object.keys(finalData).forEach((key) => {
    finalData[key as keyof JsonStorageData] = [
      ...data[key as keyof StorageData].values(),
    ] as any;
  });

  await chrome.storage.local.set({ data: finalData });
  return;
};

export const useDataState = create<DataState>((set) => ({
  data: {} as StorageData,
  setData: async (data: StorageData) => {
    set({ data });
    await writeLocalData(data);
  },
  loadLocalData: async () => {
    const dataMap = await loadLocalData();
    set({ data: dataMap });
    return dataMap;
  },
}));
