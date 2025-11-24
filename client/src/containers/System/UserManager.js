// import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
// import { connect } from "react-redux";
// import { getAllUser } from "../../services/userService";
// import { Button } from "react-bootstrap";
// import "./UserManager.scss";

// class UserManage extends Component {
//   constructor(prop) {
//     super(prop);
//     this.state = {
//       arrUsers: [],
//     };
//   }

//   async componentDidMount() {
//     let response = await getAllUser("ALL");
//     this.setState({
//       arrUsers: response.data.user,
//     });
//   }

//   render() {
//     let arrUsers = this.state.arrUsers;
//     return (
//       <div className="text-center">
//         <Button variant="primary m-3 custom-btn-add-user">Add new user</Button>
//         <table className="table table-striped table-hover table-bordered border-primary">
//           <thead>
//             <tr>
//               <th scope="col">ID</th>
//               <th scope="col">First Name</th>
//               <th scope="col">Last Name</th>
//               <th scope="col">Actions</th>
//               {/* <th scope="col">Address</th>
//               <th scope="col">Password</th>
//               <th scope="col">Actions</th> */}
//             </tr>
//           </thead>
//           <tbody>
//             {arrUsers &&
//               arrUsers.map((item, index) => {
//                 return (
//                   <tr key={item.id}>
//                     <td>{item.id}</td>
//                     <td>{item.firstName}</td>
//                     <td>{item.lastName}</td>
//                     <td>
//                       <button
//                         type="button"
//                         className=" me-2 px-4 custom-btn-edit-user"
//                       >
//                         <i className="fa-solid fa-pen-clip "></i>
//                       </button>
//                       <button
//                         type="button"
//                         className=" px-4 custom-btn-delete-user"
//                       >
//                         <i className="fa-solid fa-trash-can "></i>
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//           </tbody>
//         </table>
//         {/* <button type="button"> Create New User
//             {onclick}
//         </button> */}
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {};
// };

// const mapDispatchToProps = (dispatch) => {
//   return {};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(UserManage);

import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllUser } from "../../services/userService";
import { Button } from "react-bootstrap";
import "./UserManager.scss";
import ModlaUser from "./ModlaUser";
import { set } from "lodash";

function UserManage() {
  const [arrUsers, setArrUsers] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      let response = await getAllUser("ALL");
      setArrUsers(response.data.user);
    }
    fetchUsers();
  }, []);
  const handleAddNewUser = () => {
    setShow(true);
  };

  const createNewUser = (data) => {
    console.log("Check data from child: ", data);
    // Đây là nơi bạn sẽ gọi API để tạo người dùng mới
    // Ví dụ: await createNewUserApi(data);
  };

  return (
    <div className="px-5 position-relative ">
      <ModlaUser
        show={show}
        onClose={() => setShow(false)}
        createNewUser={createNewUser}
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
                <td className="text-center align-middle">{item.id}</td>
                <td className="align-middle ">{item.firstName}</td>
                <td className="align-middle">{item.lastName}</td>
                <td className="align-middle">{item.address}</td>
                <td className="align-middle">
                  {item.gender ? "Male" : "Female"}
                </td>
                <td className="align-middle">{item.phoneNumber}</td>
                <td>
                  <button
                    type="button"
                    className="me-2 px-4 custom-btn-edit-user"
                  >
                    <i className="fa-solid fa-pen-clip"></i>
                  </button>

                  <button type="button" className="px-4 custom-btn-delete-user">
                    <i className="fa-solid fa-trash-can"></i>
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
