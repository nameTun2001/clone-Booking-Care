import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllUser } from "../../services/userService";
class UserManage extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      arrUsers: [],
    };
  }

  async componentDidMount() {
    let response = await getAllUser("ALL");
    this.setState({
      arrUsers: response.data.user,
    });
  }

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="text-center">
        <table className="table table-striped table-hover table-bordered border-primary">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Actions</th>
              {/* <th scope="col">Address</th>
              <th scope="col">Password</th>
              <th scope="col">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {arrUsers &&
              arrUsers.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary me-2 px-4"
                      >
                        <i className="fa-solid fa-pen-clip "></i>
                      </button>
                      <button type="button" className="btn btn-danger px-4">
                        <i className="fa-solid fa-trash-can "></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
