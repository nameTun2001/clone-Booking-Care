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
// const handleLoginApit = async (userEmail, userPassword) => {
//   return axios
// }

export {handleLoginApi};