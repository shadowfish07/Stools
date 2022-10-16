import { nanoid } from "nanoid";
export class Storage {
  static data: StorageData;

  static async initLocalData(): Promise<StorageData> {
    const initData = {
      categories: new Map<string, Category>(),
    };
    const id = nanoid();
    initData.categories.set(id, {
      id,
      titleReadOnly: true,
      title: "所有书签",
      iconReadOnly: false,
      icon: "🗂️",
      deletedAt: undefined,
      children: [],
    });
    await Storage.writeLocalData(initData);
    return initData;
  }

  static async loadLocalData(): Promise<StorageData> {
    let jsonData = (await chrome.storage.local.get(["data"])).data;
    console.log("loaded data", jsonData);
    if (!jsonData || Object.keys(jsonData).length === 0) {
      console.log("init data");
      jsonData = await Storage.initLocalData();
    }

    Storage.data = {} as StorageData;

    Object.keys(jsonData).forEach((key) => {
      Storage.data[key as keyof StorageData] = new Map();
      jsonData[key as keyof StorageData].forEach(
        (item: { id: string; [key: string]: unknown }) => {
          Storage.data[key as keyof StorageData].set(item.id, item as any);
        }
      );
    });

    console.log("parsed data", Storage.data);

    return Storage.data;
  }

  static async writeLocalData(data: StorageData): Promise<void> {
    const finalData: {
      categories: (Category & { id: string })[];
    } = {
      categories: [],
    };
    data.categories.forEach((value, key) => {
      finalData.categories.push({
        ...value,
        id: key,
      });
    });
    await chrome.storage.local.set({ data: finalData });
  }

  private constructor() {}
}
