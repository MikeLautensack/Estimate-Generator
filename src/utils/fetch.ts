import { HTTPMethods } from "@/types/types";

const defaultHeaders = {
  "Content-Type": "application/json",
};

export const fetchData = async <T = Response>(
  route: string,
  method: HTTPMethods,
  body?: any,
  headers: any = defaultHeaders,
): Promise<T> => {
  const res = await fetch(route, {
    method,
    headers,
    body,
  });
  return res as T;
};
