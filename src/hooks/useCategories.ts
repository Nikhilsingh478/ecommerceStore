import { useEffect, useState } from "react";
import api from "@/services/apiClient";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.get("/primarycategory", {
      headers: { pageNumber: "1" }
    }).then(res => setCategories(res.data))
      .catch(console.error);
  }, []);

  return categories;
};
