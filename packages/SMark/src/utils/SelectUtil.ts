import { Storage } from "./Storage";

export default {
  selectCategory: (id: string): Category | undefined => {
    return Storage.getData().categories.get(id) ?? undefined;
  },
};
