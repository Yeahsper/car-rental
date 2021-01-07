import React, { Component } from "react";
import { OrderFetch } from "../Fetch/OrderFetch";
import { UserFetch } from "../Fetch/UserFetch";
import { AddressFetch } from "../Fetch/AddressFetch";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
class MyProfile extends Component {
	state = {};

	render() {
		return (
			<>
				<Accordion defaultActiveKey="0">
					<Card>
						<Accordion.Toggle as={Card.Header} eventKey="0">
							<b>Ordrar</b>
						</Accordion.Toggle>
						<Accordion.Collapse eventKey="0">
							<Card.Body>
								<OrderFetch></OrderFetch>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
					<Card>
						<Accordion.Toggle as={Card.Header} eventKey="1">
							<b>Användare</b>
						</Accordion.Toggle>
						<Accordion.Collapse eventKey="1">
							<Card.Body>
								<UserFetch></UserFetch>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
					<Card>
						<Accordion.Toggle as={Card.Header} eventKey="2">
							<b>Address</b>
						</Accordion.Toggle>
						<Accordion.Collapse eventKey="2">
							<Card.Body>
								<AddressFetch></AddressFetch>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
			</>
		);
	}
}

export default MyProfile;
