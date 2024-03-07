import { DataClientCreate } from "@/interfaces/DataClient";

const url = "http://localhost:3000/clients";

export async function getApiData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data", error);
    throw error;
  }
}

export async function createClient(data: DataClientCreate) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error creating client", error);
    throw error;
  }
}