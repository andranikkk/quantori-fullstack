import axios from "axios";

export const getToken = () => localStorage.getItem("token");
export const getRefreshToken = () => localStorage.getItem("refreshToken");

export const fetchCurrentUser = async () => {
  try {
    const response = await axios.get("http://localhost:3001/profile", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Failed to fetch current user:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const refreshAuthToken = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3001/profile",
      {
        refreshToken: getRefreshToken(),
        expiresInMins: 30,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { token, refreshToken } = response.data;
    localStorage.setItem("token", token);
    localStorage.setItem("refreshToken", refreshToken);
    return response.data;
  } catch (error) {
    console.error(
      "Failed to refresh auth token:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
