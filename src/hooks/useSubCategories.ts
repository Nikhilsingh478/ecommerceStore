import { useEffect, useState } from "react";
import api from "@/services/apiClient";

export const useSubCategories = (primaryCategoryId: number | string) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!primaryCategoryId) return;

    api.get("/subcategory", {
      headers: {
        primaryCategoryId: primaryCategoryId.toString(),
        pageNumber: "1"
      }
    }).then(res => setData(res.data))
      .catch(console.error);

  }, [primaryCategoryId]);

  return data;
};
