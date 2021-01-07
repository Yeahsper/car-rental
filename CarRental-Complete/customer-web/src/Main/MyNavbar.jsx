import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
class MyNavbar extends Component {
	state = {};
	render() {
		return (
			<Navbar sticky="bottom" bg="dark" variant="dark">
				<Navbar.Brand href="#Home">Hem</Navbar.Brand>
				<Navbar.Brand href="#Cars">Bilar</Navbar.Brand>
				<Navbar.Brand href="#Profile">Min Profil</Navbar.Brand>

				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-end"></Navbar.Collapse>
			</Navbar>
		);
	}
}

export default MyNavbar;
