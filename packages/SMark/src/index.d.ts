declare type Emoji = {
  id: string;
  keywords: string[];
  name: string;
  native: string;
  shortcodes: string;
  unified: string;
};

declare type Category = {
  id: string;
  title: string;
  titleReadOnly: boolean;
  icon: string;
  iconReadOnly: boolean;
  deletedAt?: number;
  children: Category[];
};

declare type BookMark = {
  id: string;
  title: string;
  url: string;
  deletedAt?: number;
  createdAt: number;
  category?: string;
  icon?: string;
};

declare type SupportTypeOfStorageData = KeyOfMapType<
  StorageData[keyof StorageData]
>;

declare type KeyOfMapType<T> = T extends Map<infer K, infer V> ? V : never;

declare type StorageData = {
  categories: Map<string, Category>;
  bookmarks: Map<string, BookMark>;
};

declare type JsonStorageData = {
  [K in keyof StorageData]: KeyOfMapType<StorageData[K]>[];
};

declare type Config = {
  defaultCategory: {
    title: string;
    icon: string;
  };
  favorite: {
    title: string;
    icon: string;
  };
};
