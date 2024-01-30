import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const UseProjectCode = (reload: boolean) => {
  const [projectCodeNo, setProjectCodeNo] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}project/generate_code`);
        const data = response.data;
        // console.log(data);

        if (data.status_code === 200) {
          setProjectCodeNo(data.detail);
        } else {
          setProjectCodeNo("");
        }
      } catch (error) {
        console.error("Error fetching project list:", error);
        setProjectCodeNo("");
      }
    };

    fetchData();
  }, [reload]);

  return { projectCodeNo };
};

export default UseProjectCode;
