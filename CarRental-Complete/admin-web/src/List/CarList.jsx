import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { UpdateCar } from "../Post/UpdateCar";
import { DeleteCar } from "../Post/DeleteCar";

export class CarList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			updateIsOpen: false,
			deleteIsOpen: false,
			created: "",
			fromDate: "",
			endDate: "",
			carId: 0,
			userId: 0,
			buttonVariant: "primary",
			buttonDisabled: "",
			bodyForPost: {},
			formName: "",
			formModel: "",
			formType: "",
			formPrice: "",
		};
	}

	showModalUpdate = () => {
		this.setState({
			updateIsOpen: true,
		});
	};

	hideModalUpdate = () => {
		this.setState({
			updateIsOpen: false,
		});
	};

	showModalDelete = () => {
		this.setState({
			deleteIsOpen: true,
		});
	};

	hideModalDelete = () => {
		this.setState({
			deleteIsOpen: false,
		});
	};

	reloadPage() {
		setTimeout(() => {
			window.location.hash = "Home";
		}, 180);
		setTimeout(() => {
			window.location.hash = "Cars";
		}, 210);
	}

	onFormSubmitUpdateCar = () => {
		this.setState({
			bodyForPost: {
				id: this.props.row.id,
				name: this.state.formName,
				model: this.state.formModel,
				price: this.state.formPrice,
				cartype: this.state.formType,
				active: true,
				available: true,
			},
		});

		setTimeout(() => {
			UpdateCar(this.state.bodyForPost);
		}, 100);
		this.reloadPage();
	};

	deleteCar = () => {
		DeleteCar(this.props.row.id);
		this.reloadPage();
	};

	render() {
		return (
			<>
				<>
					<Modal show={this.state.updateIsOpen} onHide={this.hideModalUpdate}>
						<Modal.Header closeButton>
							<Modal.Title>Uppdatera</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form>
								<Form.Group controlId="formName">
									<Form.Label>Märke</Form.Label>
									<Form.Control
										name="name"
										type="text"
										placeholder={this.props.row.name}
										onChange={(e) =>
											this.setState({
												formName: e.target.value,
											})
										}
									/>
									<Form.Text className="text-muted"></Form.Text>
								</Form.Group>

								<Form.Group controlId="formModel">
									<Form.Label>Modell</Form.Label>
									<Form.Control
										name="model"
										type="text"
										placeholder={this.props.row.model}
										onChange={(e) =>
											this.setState({
												formModel: e.target.value,
											})
										}
									/>
								</Form.Group>

								<Form.Group controlId="formType">
									<Form.Label>Typ</Form.Label>
									<Form.Control
										name="cartype"
										type="text"
										placeholder={this.props.row.cartype}
										onChange={(e) =>
											this.setState({
												formType: e.target.value,
											})
										}
									/>
								</Form.Group>

								<Form.Group controlId="formPrice">
									<Form.Label>Pris</Form.Label>
									<Form.Control
										name="price"
										type="text"
										placeholder={this.props.row.price}
										onChange={(e) =>
											this.setState({
												formPrice: e.target.value,
											})
										}
									/>
								</Form.Group>

								<Button
									variant="primary"
									onClick={() => {
										this.onFormSubmitUpdateCar();
									}}
								>
									Submit
								</Button>
							</Form>
						</Modal.Body>
					</Modal>
					<Modal show={this.state.deleteIsOpen} onHide={this.hideModalDelete}>
						<Modal.Header closeButton>
							<Modal.Title>Uppdatera</Modal.Title>
						</Modal.Header>

						{this.props.row.available === true ? (
							<>
								<Modal.Body>
									Är du säker att du vill inaktivera bilen?
								</Modal.Body>
								<Modal.Footer>
									{" "}
									<Button
										variant="primary"
										onClick={() => {
											this.deleteCar();
										}}
									>
										Ja
									</Button>{" "}
									<Button
										variant="primary"
										onClick={() => {
											this.hideModalDelete();
										}}
									>
										Nej
									</Button>
								</Modal.Footer>
							</>
						) : (
							<>
								{" "}
								<Modal.Body>
									Bilen är redan uthyrd. Byt ut kundens bil mot en annan bil av
									samma typ?
								</Modal.Body>
								<Modal.Footer>
									{" "}
									<Button
										variant="primary"
										onClick={() => {
											this.deleteCar();
										}}
									>
										Ja
									</Button>{" "}
									<Button
										variant="primary"
										onClick={() => {
											this.hideModalDelete();
										}}
									>
										Nej
									</Button>
								</Modal.Footer>
							</>
						)}
					</Modal>
					<td>{this.props.row.id}</td>
					<td>{this.props.row.name}</td>
					<td>{this.props.row.model}</td>
					<td>{this.props.row.cartype}</td>
					<td>{this.props.row.price}</td>
					<td>{this.props.row.active + ""}</td>
					<td>{this.props.row.available + ""}</td>
					<Button
						variant="primary"
						type="submit"
						onClick={() => {
							this.showModalUpdate();
						}}
					>
						Uppdatera
					</Button>{" "}
					<Button
						variant="danger"
						type="submit"
						onClick={() => {
							this.showModalDelete();
						}}
					>
						Radera
					</Button>{" "}
				</>
			</>
		);
	}
}
