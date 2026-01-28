const BASE_URL = "https://e-commerce-d771.onrender.com";

export async function http(
  url,
  {
    method = "GET",
    body,
    headers = {},
    auth = true // allow skipping token when needed
  } = {}
) {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(auth && token && { Authorization: `Bearer ${token}` }),
        ...headers
      },
      ...(body && { body: JSON.stringify(body) })
    });

    // Handle empty responses (204, etc.)
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
      // Centralized auth failure handling
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        // optional: window.location.href = "/login";
      }

      throw new Error(data?.message || "API Error");
    }

    return data;
  } catch (error) {
    console.error("HTTP Error:", error.message);
    throw error; // let caller decide UI behavior
  }
}
