import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

export default function Navbarr(props) {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">
        <img
          width="30"
          height="30"
          alt="React Bootstrap logo"
          src={require("../img/logo.png")}
          className="d-inline-block align-top"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
          {props.currentUser && (
            <button className="btn btn-danger" onClick={props.onSignOut}>
              Sign Out
            </button>
          )}
        </Form>
        ´
      </Navbar.Collapse>
    </Navbar>
  );
}
