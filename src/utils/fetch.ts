import { HTTPMethods } from "@/types/types";

const defaultHeaders = {
  "Content-Type": "application/json",
};

export const fetchData = async <T = Response>(
  route: string,
  method: HTTPMethods,
  headers: any = defaultHeaders,
  body?: any,
): Promise<T> => {
  const res = await fetch(route, {
    method,
    headers,
    body,
  });
  return res as T;
};
