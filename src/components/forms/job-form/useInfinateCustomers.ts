import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteCustomers = () => {
  return useInfiniteQuery({
    queryKey: ["customers"],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await fetch(`/api/customers?offset=${pageParam}&limit=10`);
      if (!res.ok) {
        throw new Error("Failed to fetch customers");
      }
      const data = await res.json();
      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) {
        return undefined;
      }
      return allPages.length * 10;
    },
    initialPageParam: 0,
  });
};
