import { Storage } from "./Storage";

export default {
  selectCategory: (id: string): Category | undefined => {
    return Storage.data.categories.get(id) ?? undefined;
  },
};
