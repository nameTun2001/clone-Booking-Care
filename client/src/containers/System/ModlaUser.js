// import React, { Component, useState } from "react";
// import { Button, Modal, Form, Col, Row, InputGroup} from "react-bootstrap";
// // import CloseButton from "react-bootstrap/CloseButton";
// import "./ModlaUser.scss";
// function ModlaUser  (){

//     const [validated, setValidated] = useState(false);

//     const handleSubmit = (event) => {
//       const form = event.currentTarget;
//       if (form.checkValidity() === false) {
//         event.preventDefault();
//         event.stopPropagation();
//       }

//       setValidated(true);
//     };
//     const { show, onClose } = this.props;
//   render() {

//     return (
//       <Modal show={show} onHide={onClose} centered>
//         <Modal.Header closeButton className="custom-button-close">
//           <Modal.Title>Add User</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <Form noValidate validated={validated} onSubmit={handleSubmit}>
//             <Row className="mb-3">
//               <Form.Group as={Col} md="4" controlId="validationCustom01">
//                 <Form.Label>First name</Form.Label>
//                 <Form.Control
//                   required
//                   type="text"
//                   placeholder="First name"
//                   defaultValue="Mark"
//                 />
//                 <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//               </Form.Group>
//               <Form.Group as={Col} md="4" controlId="validationCustom02">
//                 <Form.Label>Last name</Form.Label>
//                 <Form.Control
//                   required
//                   type="text"
//                   placeholder="Last name"
//                   defaultValue="Otto"
//                 />
//                 <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
//               </Form.Group>
//               <Form.Group as={Col} md="4" controlId="validationCustomUsername">
//                 <Form.Label>Username</Form.Label>
//                 <InputGroup hasValidation>
//                   <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
//                   <Form.Control
//                     type="text"
//                     placeholder="Username"
//                     aria-describedby="inputGroupPrepend"
//                     required
//                   />
//                   <Form.Control.Feedback type="invalid">
//                     Please choose a username.
//                   </Form.Control.Feedback>
//                 </InputGroup>
//               </Form.Group>
//             </Row>
//             <Row className="mb-3">
//               <Form.Group as={Col} md="6" controlId="validationCustom03">
//                 <Form.Label>City</Form.Label>
//                 <Form.Control type="text" placeholder="City" required />
//                 <Form.Control.Feedback type="invalid">
//                   Please provide a valid city.
//                 </Form.Control.Feedback>
//               </Form.Group>
//               <Form.Group as={Col} md="3" controlId="validationCustom04">
//                 <Form.Label>State</Form.Label>
//                 <Form.Control type="text" placeholder="State" required />
//                 <Form.Control.Feedback type="invalid">
//                   Please provide a valid state.
//                 </Form.Control.Feedback>
//               </Form.Group>
//               <Form.Group as={Col} md="3" controlId="validationCustom05">
//                 <Form.Label>Zip</Form.Label>
//                 <Form.Control type="text" placeholder="Zip" required />
//                 <Form.Control.Feedback type="invalid">
//                   Please provide a valid zip.
//                 </Form.Control.Feedback>
//               </Form.Group>
//             </Row>
//             <Form.Group className="mb-3">
//               <Form.Check
//                 required
//                 label="Agree to terms and conditions"
//                 feedback="You must agree before submitting."
//                 feedbackType="invalid"
//               />
//             </Form.Group>
//             <Button type="submit">Submit form</Button>
//           </Form>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="secondary" onClick={onClose}>
//             Close
//           </Button>
//           <Button variant="primary">Save changes</Button>
//         </Modal.Footer>
//       </Modal>
//     );
//   }
// ``````````

// export default ModlaUser;

import React, { useState } from "react";
import { Button, Modal, Form, Col, Row, InputGroup } from "react-bootstrap";
import "./ModlaUser.scss";

function ModlaUser({ show, onClose }) {
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
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton className="custom-button-close">
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      ``
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="First name"
                defaultValue="Mark"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last name"
                defaultValue="Otto"
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="City" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid city.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom04">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" placeholder="State" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="3" controlId="validationCustom05">
              <Form.Label>Zip</Form.Label>
              <Form.Control type="text" placeholder="Zip" required />
              <Form.Control.Feedback type="invalid">
                Please provide a valid zip.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Check
              required
              label="Agree to terms and conditions"
              feedback="You must agree before submitting."
              feedbackType="invalid"
            />
          </Form.Group>

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
