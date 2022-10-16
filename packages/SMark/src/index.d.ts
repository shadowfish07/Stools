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
  deletedAt: number | undefined;
  children: Category[];
};

declare type StorageData = {
  categories: Map<string, Category>;
};
