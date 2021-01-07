import React from "react";
import Button from "react-bootstrap/Button";
import Datetime from "react-datetime";
import moment from "moment";
import OrderCar from "../Post/OrderCar";
import Modal from "react-bootstrap/Modal";

var yesterday = moment().subtract(1, "day");
var CurrentDate = moment().format("YYYY-MM-DD HH:mm:ss");
var validTodayOrLater = function (current) {
	return current.isAfter(yesterday);
};

export class CarList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			created: "",
			fromDate: "",
			endDate: "",
			carId: 0,
			userId: 0,
			buttonVariant: "primary",
			buttonDisabled: "",
			bodyForPost: {},
		};
	}

	changeStartDate = (event) => {
		this.setState({
			fromDate: event.format("YYYY-MM-DD 07:00"),
		});
	};

	changeEndDate = (event) => {
		this.setState({
			endDate: event.format("YYYY-MM-DD 19:00"),
		});
	};

	setOrderJsonState = () => {
		this.setState({
			bodyForPost: {
				created: CurrentDate,
				fromDate: this.state.fromDate,
				endDate: this.state.endDate,
				active: true,
				car: {
					id: this.props.row.id,
				},
			},
		});
	};

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

	showOrderButton = (isDisabled) => {
		if (isDisabled) {
			return (
				<td>
					{" "}
					<Button
						disabled="true"
						variant="secondary"
						type="submit"
						onClick={() => {}}
					>
						Boka
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
						onClick={async () => {
							await this.setOrderJsonState();
							await OrderCar(this.state.bodyForPost);
							this.setState({
								buttonVariant: "secondary",
								buttonDisabled: "true",
							});
							this.showModal();
							console.log(this.state.bodyForPost);
						}}
					>
						Boka
					</Button>{" "}
				</td>
			);
		}
	};

	render() {
		return (
			<>
				{this.props.row.available === true ? (
					<>
						<Modal show={this.state.isOpen} onHide={this.hideModal}>
							<Modal.Header closeButton>
								<Modal.Title>Godkänt!</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								{
									"Bilen är bokad och finns att hämtas på Ankeborgsvägen 10 den "
								}
								{this.state.fromDate}
							</Modal.Body>
							<Modal.Footer>
								<Button variant="primary" onClick={this.hideModal}>
									Ok, stäng.
								</Button>
							</Modal.Footer>
						</Modal>
						{/* <td>{this.props.row.id}</td> */}
						<td>{this.props.row.name}</td>
						<td>{this.props.row.model}</td>
						<td>{this.props.row.cartype}</td>
						<td>{this.props.row.price}</td>
						<Datetime
							isValidDate={validTodayOrLater}
							dateFormat="YYYY-MM-DD"
							timeFormat={false}
							value={"Från"}
							onChange={this.changeStartDate}
							closeOnSelect={true}
						/>
						<Datetime
							isValidDate={validTodayOrLater}
							dateFormat="YYYY-MM-DD"
							timeFormat={false}
							value={"Till"}
							onChange={this.changeEndDate}
							closeOnSelect={true}
						/>
						{this.state.startDate !== "" &&
						this.state.endDate !== "" &&
						this.props.row.available !== false
							? this.showOrderButton(false)
							: this.showOrderButton(true)}
					</>
				) : null}
			</>
		);
	}
}
