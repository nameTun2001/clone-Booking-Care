

import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { connect } from "react-redux";
import {
  getAllUser,
  createNewUserApi,
  deleteUserApi,
  editUserApi,
} from "../../services/userService";
import { Button } from "react-bootstrap";
import "./UserManager.scss";
import ModlaUser from "./ModlaUser";
import ModlaEditUser from "./ModlaEditUser";
import { set } from "lodash";

function UserManage() {
  const [arrUsers, setArrUsers] = useState([]);
  const [show_modal_edit_user, setShowModalEditUser] = useState(false);
  const [userEdit, setUserEdit] = useState({});
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [errCode, setErrCode] = useState(-1); // Khởi tạo với giá trị trung gian
  const prevMessageRef = useRef("");

  useEffect(() => {
    async function fetchUsers() {
      let response = await getAllUser("ALL");
      if (response && response.data.errCode === 0) {
        setArrUsers(response.data.user);
      }
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    if (message && message !== prevMessageRef.current) {
      alert(message);
      prevMessageRef.current = message;
    }
  }, [message]);

  const handleAddNewUser = () => {
    setErrCode(-1); // Reset errCode mỗi khi mở modal
    setShow(true);
  };

  const createNewUser = async (data) => {
    try {
      let response = await createNewUserApi(data);
      console.log("response từ server trả về:", response);

      // Luôn cập nhật errCode và message từ response
      setErrCode(response.data.errCode);
      setMessage(response.data.errMessage);

      if (response && response.data.errCode === 0) {
        let allUsersResponse = await getAllUser("ALL");
        setArrUsers(allUsersResponse.data.user);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteUser = async (data) => {
    let response = await deleteUserApi(data);
    setMessage(response.data.errMessage);
    let allUsersResponse = await getAllUser("ALL");
    setArrUsers(allUsersResponse.data.user);
  };

  const handleEditUser = (data) => {
    setShowModalEditUser(true);
    setUserEdit(data);
    setErrCode(-1); // Reset errCode mỗi khi mở modal
  };

  const editUser = async (data) => {
    console.log("data:", data);
    
    try {
      // Kiểm tra xem có trường nào bị bỏ trống không (trừ password), có thể trống hoặc NULL
      for (const key in data) {
        if (key !== "password" && data[key]!== undefined && data[key] === "") {
          setMessage("Missing required parameter: " + key);
          setErrCode(1); // Đặt một mã lỗi chung cho lỗi client
          return;
        }
      }

      let response = await editUserApi(data);
      console.log("response từ server trả về:", response);
      setErrCode(response.data.errCode);
      setMessage(response.data.errMessage);

      if (response && response.data.errCode === 0) {
        let allUsersResponse = await getAllUser("ALL");
        setArrUsers(allUsersResponse.data.user);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="px-5 position-relative ">
      <ModlaUser
        show={show}
        onClose={() => setShow(false)}
        createNewUser={createNewUser}
        message={message}
        errCode={errCode}
      />
      <ModlaEditUser
        show={show_modal_edit_user}
        onClose={() => setShowModalEditUser(false)}
        userEdit={userEdit}
        editUser={editUser}
        message={message}
        errCode={errCode}
      />
      <Button
        className="primary m-3 custom-btn-add-user "
        onClick={handleAddNewUser}
      >
        <i class="fa-solid fa-plus pe-3"></i>
        Add new user
      </Button>

      <table className="table table-striped table-hover table-bordered border-primary mt-5 text-center">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>

            <th scope="col">Gender</th>
            <th scope="col">Phone Number</th>

            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
          {arrUsers &&
            arrUsers.map((item) => (
              <tr key={item.id}>
                <td className="text-center align-middle">
                  {item.id}
                </td>
                <td className="align-middle ">{item.firstName}</td>
                <td className="align-middle">{item.lastName}</td>
                <td className="align-middle">{item.email}</td>
                <td className="align-middle">{item.address}</td>
                <td className="align-middle">
                  {item.gender ? "Male" : "Female"}
                </td>
                <td className="align-middle">{item.phoneNumber}</td>
                <td className="custom-btn-delete-edit">
                  {/* btn edit */}
                  <button
                    type="button"
                    className="me-2 px-4 custom-btn-edit-user"
                    onClick={() => handleEditUser(item)}
                  >
                    <i className="fa-solid fa-pen-clip"></i>
                  </button>

                  {/* btn delete */}
                  {/* <button
                    type="button"
                    className="px-4 custom-btn-delete-user"
                    onClick={() => handleDeleteUser(item)}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </button> */}

                  <button
                    // type="button"
                    className="px-4 custom-btn-delete-user"
                    onClick={() => handleDeleteUser(item)}
                  >
                    <svg viewBox="0 0 448 512" className="svgIcon">
                      <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
