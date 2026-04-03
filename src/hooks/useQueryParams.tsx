"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useQueryParams = () => {
  const router = useRouter();
  const searchParam = useSearchParams();

  // отримати всі параметри як об'єкт
  const getAll = useCallback(() => {
    return Object.fromEntries(searchParam.entries());
  }, [searchParam]);

  // отримати один параметр
  const get = useCallback(
    (key: string) => {
      return searchParam.get(key);
    },
    [searchParam],
  );

  // встановити параметри
  const set = useCallback(
    (params: Record<string, string | null | undefined>) => {
      const newParams = new URLSearchParams(searchParam.toString());

      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      });

      router.push(`?${newParams.toString()}`);
    },
    [router, searchParam],
  );

  // очистити всі параметри
  const clear = useCallback(() => {
    router.push("?");
  }, [router]);

  const queryParams = {
    get,
    getAll,
    set,
    clear,
  };

  return queryParams;
};
