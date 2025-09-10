export class QueryParams {
  page: number;
  size: number;

  constructor(page: string, size: string) {
    this.page = +page;
    this.size = +size;
  }
}
