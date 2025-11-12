import axios from "../axios";
// const handleLoginApi =(email, password) =>{
//     return axios.post('/api/login', {email, password});
// };
const handleLoginApi = (userEmail, userPassword) => {
  return axios
    .post("/api/login", {
      email: userEmail,
      password: userPassword,
    });
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
};
export {handleLoginApi};