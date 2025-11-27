import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Form, Col, Row, InputGroup } from "react-bootstrap";
// import "./ModlaEditUser.scss";
import { set } from "lodash";

function ModlaEditUser({
  show,
  onClose,
  errCode,
  userEdit,
  editUser,
}) {
  const [userData, setUserData] = useState({});
  const [validated, setValidated] = useState(false);
  const initialUserDataRef = useRef({});


  // Đóng modal sau 1 giây để người dùng thấy thông báo thành công
  useEffect(() => {
    if (errCode === 0) {
      const timer = setTimeout(() => {
        onClose();
        setValidated(false);
      }, 1000);
      return () => clearTimeout(timer); // Cleanup timer khi component unmount
    }
  }, [errCode, onClose]);

  useEffect(() => {
    if (userEdit) {
      setUserData(userEdit);
      initialUserDataRef.current = userEdit; // Lưu trạng thái ban đầu
    }
  }, [userEdit]);

  const handleOnChangeInput = (event, data) => {
    setUserData({
      ...userData,
      [data]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);
    editUser(userData);
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton className="custom-button-close">
        <Modal.Title>Edit user</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {/* firstname/lastname */}
          <Row className="custom-form-row">
            <Col>
              <Form.Group controlId="validationCustom01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter first name"
                  value={userData.firstName}
                  onChange={(event) => handleOnChangeInput(event, "firstName")}
                />
                <Form.Control.Feedback type="valid">
                  Looks good!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Pls enter first name!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="validationCustom02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter last name"
                  value={userData.lastName}
                  onChange={(event) => handleOnChangeInput(event, "lastName")}
                />
                <Form.Control.Feedback type="valid">
                  Looks good!
                </Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Pls enter last name!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          {/* email */}
          <Row className=" custom-form-row">
            <Col>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  // required
                  disabled={true}
                  type="email"
                  //   placeholder="Enter email"
                  value={userData.email}
                  //   onChange={(event) => handleOnChangeInput(event, "email")}
                  //   isInvalid={errCode !== 0 && errCode !== -1 && !!message}
                />
                {/* <Form.Control.Feedback type="invalid">
                  {message ? message : "Pls enter your email!"}
                </Form.Control.Feedback> */}
              </Form.Group>
            </Col>
          </Row>
          {/* password */}
          <Row className=" custom-form-row">
            <Col>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  disabled={true}
                  type="text"
                  //   placeholder="Enter password"
                  value="Your can not chance your password!"
                  //   onChange={(event) => handleOnChangeInput(event, "password")}
                />

                {/* <Form.Text className="text-muted">
                  Your can not chance your password
                </Form.Text> */}
              </Form.Group>
            </Col>
          </Row>
          {/* address */}
          <Row className=" custom-form-row">
            <Col>
              <Form.Group className="mb-3" controlId="formGroupAdress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter address"
                  value={userData.address}
                  onChange={(event) => handleOnChangeInput(event, "address")}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          {/* gender/role */}
          <Row className="custom-form-row">
            <Col>
              <Form.Group controlId="validationCustom03">
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  aria-label="Gender"
                  value={userData.gender}
                  onChange={(event) => handleOnChangeInput(event, "gender")}
                >
                  <option value="1">Men</option>
                  <option value="2">Woman</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="validationCustom03">
                <Form.Label>RoleID</Form.Label>
                <Form.Select
                  aria-label="Role"
                  value={userData.roleId}
                  onChange={(event) => handleOnChangeInput(event, "roleId")}
                >
                  <option value="1">Admin</option>
                  <option value="2">User</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          {/* phone number */}
          <Row className="custom-form-row">
            <Col>
              <Form.Group controlId="validationCustom04">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Number"
                  value={userData.phoneNumber}
                  onChange={(event) =>
                    handleOnChangeInput(event, "phoneNumber")
                  }
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid phone number.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          {/* terms & conditions */}
          {/* <Row>
            <Col>
              <Form.Group>
                <Form.Check
                  required
                  label="Agree to terms and conditions"
                  feedback="You must agree before submitting."
                  feedbackType="invalid"
                  className="custom-form-row-last-check"
                />
              </Form.Group>
            </Col>
          </Row> */}

          <Button type="submit" variant="primary custom-btn-submit">
            Save changes
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModlaEditUser;
