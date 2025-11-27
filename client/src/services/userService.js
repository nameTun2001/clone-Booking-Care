import axios from "../axios";

const handleLoginApi = async (userEmail, userPassword) => {
  try {
    // axios instance đã return response.data qua interceptor
    const response = await axios.post("/api/login", {
      email: userEmail,
      password: userPassword,
    });
    console.log("Dữ liệu nhận được từ API:", response);
    return response;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
};
const getAllUser = async (inputId) => {
  try {
    const response = await axios.get(`/api/get-all-user?id=${inputId}`);
    return response;
  } catch (error) {
    throw error;
  }
};
const createNewUserApi = async (userData) => {
  console.log("check fetch data: ", userData);
  try {
    const response = await axios.post("/api/create-new-user", userData);
    return response;
  } catch (error) {
    throw error;
  }
};
const deleteUserApi = async (userData) => {
  console.log("check fetch data: ", userData);
  try {
    const response = await axios.delete("/api/delete-user", {
      data: { id: userData.id },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
const editUserApi = async (userData) => {
  console.log("check data: ", userData);
  try {
    const response = await axios.put("/api/update-user", userData);
    return response;
  } catch (error) {
    throw error;
  }
};
export {
  handleLoginApi,
  getAllUser,
  createNewUserApi,
  deleteUserApi,
  editUserApi,
};
