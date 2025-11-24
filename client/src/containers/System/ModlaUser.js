import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Col, Row, InputGroup } from "react-bootstrap";
import "./ModlaUser.scss";

function ModlaUser({ show, onClose, createNewUser }) {
  const initialUserData = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    gender: "1",
    roleId: "1",
  };

  const [userData, setUserData] = useState(initialUserData);

  const handleOnChangeInput = (event, data) => {
    setUserData({
      ...userData,
      [data]: event.target.value,
    });
  };

  const checkValidateInput = () => {
    for (const key in userData) {
      if (!userData[key]) {
        alert("Missing required parameter: " + key);
        return false;
      }
    }
    return true;
  };

  const handleSaveUser = () => {
    let isValid = checkValidateInput();
    if (isValid) {
      // Call prop function from parent component
      createNewUser(userData);
    }
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton className="custom-button-close">
        <Modal.Title>Create a new user</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {/* <Form> */}
          {/* firstname/lastname */}
          <Row className="custom-form-row">
            <Col>
              <Form.Group controlId="validationCustom01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  // isValid={touched.firstName && !errors.firstName}
                  isInvalid
                  required
                  type="text"
                  placeholder="Enter first name"
                  value={userData.firstName}
                  onChange={(event) => handleOnChangeInput(event, "firstName")}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          {/* email/password */}
          <Row className=" custom-form-row">
            <Col>
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={userData.email}
                  onChange={(event) => handleOnChangeInput(event, "email")}
                  // isInvalid={!!errors.email}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row className=" custom-form-row">
            <Col>
              <Form.Group
                className="mb-3"
                controlId="formGroupEmail"
                htmlFor="password"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  id="password"
                  value={userData.password}
                  onChange={(event) => handleOnChangeInput(event, "password")}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Text className="text-muted">
                  Your password must be 8-20 characters long, contain letters
                  and numbers, and must not contain spaces, special characters,
                  or emoji.
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
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
          <Row className="custom-form-row">
            <Col>
              <Form.Group controlId="validationCustom04">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" placeholder="Number" required />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid phone number.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
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
          </Row>

          <Button type="submit">Submit form</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModlaUser;
// import React from "react";
// import { Button, Modal, Form, Col, Row } from "react-bootstrap";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import "./ModlaUser.scss";

// // Định nghĩa schema validation với Zod
// const userSchema = z.object({
//   email: z
//     .string()
//     .min(1, "Email không được để trống")
//     .email("Email không hợp lệ"),
//   password: z
//     .string()
//     .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
//     .max(20, "Mật khẩu không quá 20 ký tự")
//     .regex(
//       /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
//       "Mật khẩu phải chứa chữ và số, không có ký tự đặc biệt"
//     ),
//   firstName: z
//     .string()
//     .min(1, "Tên không được để trống")
//     .min(2, "Tên phải có ít nhất 2 ký tự"),
//   lastName: z
//     .string()
//     .min(1, "Họ không được để trống")
//     .min(2, "Họ phải có ít nhất 2 ký tự"),
//   address: z.string().min(1, "Địa chỉ không được để trống"),
//   phoneNumber: z
//     .string()
//     .min(1, "Số điện thoại không được để trống")
//     .regex(/^[0-9]{10,11}$/, "Số điện thoại phải có 10-11 chữ số"),
//   gender: z.string().min(1, "Vui lòng chọn giới tính"),
//   roleId: z.string().min(1, "Vui lòng chọn vai trò"),
//   agreeTerms: z
//     .boolean()
//     .refine((val) => val === true, "Bạn phải đồng ý với điều khoản"),
// });

// function ModlaUser({ show, onClose, createNewUser }) {
//   const {
//     register,
//     handleSubmit,
//     control,
//     reset,
//     formState: { errors, isSubmitting, touchedFields },
//   } = useForm({
//     resolver: zodResolver(userSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//       firstName: "",
//       lastName: "",
//       address: "",
//       phoneNumber: "",
//       gender: "1",
//       roleId: "1",
//       agreeTerms: false,
//     },
//     mode: "onChange", // Validate khi thay đổi input
//   });

//   // Xử lý khi submit form
//   const onSubmit = async (data) => {
//     try {
//       // Loại bỏ agreeTerms trước khi gửi lên server
//       const { agreeTerms, ...userData } = data;

//       // Gọi hàm create user từ parent
//       await createNewUser(userData);

//       // Reset form sau khi thành công
//       reset();
//       onClose();
//     } catch (error) {
//       console.error("Error creating user:", error);
//       alert("Có lỗi xảy ra khi tạo người dùng");
//     }
//   };

//   // Reset form khi đóng modal
//   const handleClose = () => {
//     reset();
//     onClose();
//   };

//   return (
//     <Modal show={show} onHide={handleClose} centered size="lg">
//       <Modal.Header closeButton className="custom-button-close">
//         <Modal.Title>Create a new user</Modal.Title>
//       </Modal.Header>

//       <Modal.Body>
//         <Form onSubmit={handleSubmit(onSubmit)}>
//           {/* First name / Last name */}
//           <Row className="custom-form-row">
//             <Col>
//               <Form.Group controlId="firstName">
//                 <Form.Label>First name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter first name"
//                   {...register("firstName")}
//                   isValid={touchedFields.firstName && !errors.firstName}
//                   isInvalid={!!errors.firstName}
//                 />
//                 <Form.Control.Feedback type="valid">
//                   Looks good!
//                 </Form.Control.Feedback>
//                 <Form.Control.Feedback type="invalid">
//                   {errors.firstName?.message}
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </Col>
//             <Col>
//               <Form.Group controlId="lastName">
//                 <Form.Label>Last name</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter last name"
//                   {...register("lastName")}
//                   isValid={touchedFields.lastName && !errors.lastName}
//                   isInvalid={!!errors.lastName}
//                 />
//                 <Form.Control.Feedback type="valid">
//                   Looks good!
//                 </Form.Control.Feedback>
//                 <Form.Control.Feedback type="invalid">
//                   {errors.lastName?.message}
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </Col>
//           </Row>

//           {/* Email */}
//           <Row className="custom-form-row">
//             <Col>
//               <Form.Group controlId="email">
//                 <Form.Label>Email address</Form.Label>
//                 <Form.Control
//                   type="email"
//                   placeholder="Enter email"
//                   {...register("email")}
//                   isValid={touchedFields.email && !errors.email}
//                   isInvalid={!!errors.email}
//                 />
//                 <Form.Control.Feedback type="valid">
//                   Looks good!
//                 </Form.Control.Feedback>
//                 <Form.Control.Feedback type="invalid">
//                   {errors.email?.message}
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </Col>
//           </Row>

//           {/* Password */}
//           <Row className="custom-form-row">
//             <Col>
//               <Form.Group controlId="password">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   placeholder="Enter password"
//                   {...register("password")}
//                   isValid={touchedFields.password && !errors.password}
//                   isInvalid={!!errors.password}
//                 />
//                 <Form.Control.Feedback type="valid">
//                   Looks good!
//                 </Form.Control.Feedback>
//                 <Form.Control.Feedback type="invalid">
//                   {errors.password?.message}
//                 </Form.Control.Feedback>
//                 <Form.Text className="text-muted">
//                   Your password must be 8-20 characters long, contain letters
//                   and numbers, and must not contain spaces, special characters,
//                   or emoji.
//                 </Form.Text>
//               </Form.Group>
//             </Col>
//           </Row>

//           {/* Address */}
//           <Row className="custom-form-row">
//             <Col>
//               <Form.Group controlId="address">
//                 <Form.Label>Address</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter address"
//                   {...register("address")}
//                   isValid={touchedFields.address && !errors.address}
//                   isInvalid={!!errors.address}
//                 />
//                 <Form.Control.Feedback type="valid">
//                   Looks good!
//                 </Form.Control.Feedback>
//                 <Form.Control.Feedback type="invalid">
//                   {errors.address?.message}
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </Col>
//           </Row>

//           {/* Gender / Role */}
//           <Row className="custom-form-row">
//             <Col>
//               <Form.Group controlId="gender">
//                 <Form.Label>Gender</Form.Label>
//                 <Form.Select
//                   {...register("gender")}
//                   isInvalid={!!errors.gender}
//                 >
//                   <option value="1">Men</option>
//                   <option value="2">Woman</option>
//                 </Form.Select>
//                 <Form.Control.Feedback type="invalid">
//                   {errors.gender?.message}
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </Col>
//             <Col>
//               <Form.Group controlId="roleId">
//                 <Form.Label>Role</Form.Label>
//                 <Form.Select
//                   {...register("roleId")}
//                   isInvalid={!!errors.roleId}
//                 >
//                   <option value="1">Admin</option>
//                   <option value="2">User</option>
//                 </Form.Select>
//                 <Form.Control.Feedback type="invalid">
//                   {errors.roleId?.message}
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </Col>
//           </Row>

//           {/* Phone Number */}
//           <Row className="custom-form-row">
//             <Col>
//               <Form.Group controlId="phoneNumber">
//                 <Form.Label>Phone Number</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="Enter phone number"
//                   {...register("phoneNumber")}
//                   isValid={touchedFields.phoneNumber && !errors.phoneNumber}
//                   isInvalid={!!errors.phoneNumber}
//                 />
//                 <Form.Control.Feedback type="valid">
//                   Looks good!
//                 </Form.Control.Feedback>
//                 <Form.Control.Feedback type="invalid">
//                   {errors.phoneNumber?.message}
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </Col>
//           </Row>

//           {/* Terms & Conditions */}
//           <Row>
//             <Col>
//               <Form.Group className="custom-form-row-last-check">
//                 <Form.Check
//                   type="checkbox"
//                   label="Agree to terms and conditions"
//                   {...register("agreeTerms")}
//                   isInvalid={!!errors.agreeTerms}
//                   feedback={errors.agreeTerms?.message}
//                   feedbackType="invalid"
//                 />
//               </Form.Group>
//             </Col>
//           </Row>

//           <Button
//             type="submit"
//             variant="primary"
//             disabled={isSubmitting}
//             className="mt-3"
//           >
//             {isSubmitting ? "Submitting..." : "Submit form"}
//           </Button>
//         </Form>
//       </Modal.Body>

//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Close
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

// export default ModlaUser;