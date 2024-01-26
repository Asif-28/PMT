import { ProjectCodeStore } from "@/store/ProjectCode";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDebounce } from "./Debounce";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const UseProjectCodeList = () => {
  const ProjectCode = ProjectCodeStore((state: any) => state.ProjectCode);
  const [list, setList] = useState([]);
  const debouncedSearch = useDebounce(ProjectCode.ProjectCode);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getAllList() {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}project/list`);
        const data = response.data;
        const filteredData = data.filter((item: any) => {
          return item.project_code.includes(ProjectCode.ProjectCode);
        });
        setList(filteredData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getAllList();
  }, [debouncedSearch]);
  return { list, loading };
};

export default UseProjectCodeList;
