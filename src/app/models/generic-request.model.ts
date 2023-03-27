import { GenericItem } from "./generic-item.model";

export class GenericRequest {
  count: number = 1;
  next: string | null | undefined = null;
  previous: string | null | undefined = null;
  results: GenericItem[] = [];
}

export class PageParams {
  page: number = 0;
  limit: number = 12;
}
