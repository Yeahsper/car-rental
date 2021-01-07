import React from "react";
import Button from "react-bootstrap/Button";
import CancelOrder from "../Post/CancelOrder";
import Modal from "react-bootstrap/Modal";
export class OrderList extends React.Component {
	constructor() {
		super();
		this.state = {
			isOpen: false,
			buttonVariant: "primary",
			buttonDisabled: "",
		};
	}

	showModal = () => {
		this.setState({
			isOpen: true,
		});
	};

	hideModal = () => {
		this.setState({
			isOpen: false,
		});
	};

	showButton = (isDisabled) => {
		if (isDisabled) {
			return (
				<td>
					{" "}
					<Button
						disabled="true"
						variant="secondary"
						type="submit"
						onClick={() => {
							console.log("topkek1");
						}}
					>
						Återlämnad
					</Button>{" "}
				</td>
			);
		} else {
			return (
				<td>
					{" "}
					<Button
						disabled={this.state.buttonDisabled}
						variant={this.state.buttonVariant}
						type="submit"
						onClick={() => {
							console.log("topkek2");
							console.log(this.props.row.id);
							CancelOrder(this.props.row.id);
							this.setState({
								buttonVariant: "secondary",
								buttonDisabled: "true",
							});
							this.showModal();
						}}
					>
						Återlämnad
					</Button>{" "}
				</td>
			);
		}
	};

	render() {
		return (
			<>
				<Modal show={this.state.isOpen} onHide={this.hideModal}>
					<Modal.Header closeButton>
						<Modal.Title>Godkänt!</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						{"Ordern för bilen " +
							this.props.row.car.name +
							" " +
							this.props.row.car.model +
							" är nu avbokad."}
						{this.state.fromDate}
					</Modal.Body>
					<Modal.Footer>
						<Button variant="primary" onClick={this.hideModal}>
							Ok, stäng.
						</Button>
					</Modal.Footer>
				</Modal>
				<td>{this.props.row.id}</td>
				<td>{this.props.row.car.name}</td>
				<td>{this.props.row.car.model}</td>
				<td>{this.props.row.car.price}</td>
				{this.props.row.active === true ? <td>Ja</td> : <td>Nej</td>}
				<td>{this.props.row.created}</td>
				<td>{this.props.row.fromDate}</td>
				<td>{this.props.row.endDate}</td>
				<td>{this.props.row.active}</td>
				{this.props.row.active !== false
					? this.showButton(false)
					: this.showButton(true)}
			</>
		);
	}
}
