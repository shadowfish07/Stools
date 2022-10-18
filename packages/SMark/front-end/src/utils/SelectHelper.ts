export default class {
  constructor(private data: StorageData) {}

  selectCategory(id: string): Category | undefined {
    return this.data.categories.get(id) ?? undefined;
  }
}
