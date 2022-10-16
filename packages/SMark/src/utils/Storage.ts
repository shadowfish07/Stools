import { nanoid } from "nanoid";
export class Storage {
  private static data: StorageData;
  private static config: Config;

  static getData(): StorageData {
    return Storage.data;
  }
  static getConfig(): Config {
    return Storage.config;
  }

  private static async initLocalConfig(): Promise<Config> {
    const initConfig = {
      defaultCategory: {
        title: "所有书签",
        icon: "🗂️",
      },
      favorite: {
        title: "星标",
        icon: "❤️",
      },
    };
    await Storage.writeLocalConfig(initConfig);
    return initConfig;
  }

  private static async initLocalData(): Promise<StorageData> {
    const initData: StorageData = {
      categories: new Map<string, Category>(),
      bookmarks: new Map<string, BookMark>(),
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

  static async loadLocalConfig(): Promise<Config> {
    let jsonConfig = (await chrome.storage.local.get(["config"])).config;
    console.log("loaded config", jsonConfig);
    if (!jsonConfig || Object.keys(jsonConfig).length === 0) {
      console.log("init config");
      jsonConfig = await Storage.initLocalConfig();
    }

    Storage.config = jsonConfig;

    return Storage.config;
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
    const finalData: JsonStorageData = {
      categories: [] as any,
      bookmarks: [] as any,
    };

    Object.keys(finalData).forEach((key) => {
      finalData[key as keyof JsonStorageData] = [
        ...data[key as keyof StorageData].values(),
      ] as any;
    });

    Storage.data = data;

    await chrome.storage.local.set({ data: finalData });
  }

  static async writeLocalConfig(config: Config): Promise<void> {
    Storage.config = config;
    await chrome.storage.local.set({ config });
  }

  private constructor() {}
}
