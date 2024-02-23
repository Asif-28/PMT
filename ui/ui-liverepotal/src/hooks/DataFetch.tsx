import axios, { AxiosRequestConfig } from "axios";

const apiUrl = "http://localhost:8000/live_portal";

async function axiosWrapper<T>(
  endpoint: string,
  method: "get" | "post" | "put" | "delete" = "get",
  params: Record<string, any> = {},
  headers: Record<string, any> = {}
): Promise<T> {
  const token = localStorage.getItem("Authorization");

  const config: AxiosRequestConfig = {
    method,
    url: apiUrl + endpoint,
    params,
    headers: {
      Authorization: token,
      ...headers,
    },
    withCredentials: true,
  };

  try {
    const response = await axios(config);
    return response.data as T;
  } catch (error) {
    throw error;
  }
}

export default axiosWrapper;
