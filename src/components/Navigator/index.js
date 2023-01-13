import React from "react";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

export default function Navigator() {
    return (
        <Navbar collapseOnSelect expand="lg" variant="primary" className="navbar-dark bg-primary">
            <Container>
                <NavLink className="navbar-brand" to="/">BackOffice</NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink className="nav-link" to="/pessoas">Pessoas</NavLink>
                        <NavLink className="nav-link" to="/departamentos">Departamentos</NavLink>
                    </Nav>
                    <Nav>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
};