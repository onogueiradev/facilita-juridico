import { DataClient, DataClientCreate } from "@/interfaces/DataClient";

const url = "http://localhost:3000";

export async function fetchData(endpoint: string = "clients", method: string = "GET", data?: DataClientCreate | DataClient, id?: string) {
  try {
    const requestConfig: RequestInit = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (method === "PUT" || method === "DELETE" && id) {
      endpoint += `/${id}`;
    }

    if (method !== "GET" && data) {
      requestConfig.body = JSON.stringify(data);
    }

    const response = await fetch(`${url}/${endpoint}`, requestConfig);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error(`Error ${method}ing data`, error);
    throw error;
  }
}
