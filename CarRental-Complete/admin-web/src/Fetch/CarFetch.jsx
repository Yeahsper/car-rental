import React from "react";
import { CarList } from "../List/CarList";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { AddCar } from "../Post/AddCar";

export class CarFetch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			updateIsOpen: false,
			url: "http://localhost:8081/api/v1/allcars",
			items: [],
			isLoaded: false,
			sortType: "asc",
			bodyForPost: {},
			formName: "",
			formModel: "",
			formType: "",
			formPrice: "",
		};
	}

	fetchCars() {
		fetch(this.state.url, {
			credentials: "include",
		})
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
				this.setState({
					isLoaded: true,
					items: json,
				});
				console.log(this.state.items);
			});
	}

	componentDidMount() {
		this.fetchCars();
	}

	sortByColumn = (column) => {
		if (this.state.sortType === "asc" && column === "name") {
			this.setState({
				items: this.state.items.sort((a, b) => (a.name > b.name ? -1 : 1)),
				sortType: "desc",
			});
		} else if (this.state.sortType === "desc" && column === "name") {
			this.setState({
				items: this.state.items.sort((a, b) => (a.name > b.name ? 1 : -1)),
				sortType: "asc",
			});
		}

		if (this.state.sortType === "asc" && column === "model") {
			this.setState({
				items: this.state.items.sort((a, b) => (a.model > b.model ? -1 : 1)),
				sortType: "desc",
			});
		} else if (this.state.sortType === "desc" && column === "model") {
			this.setState({
				items: this.state.items.sort((a, b) => (a.model > b.model ? 1 : -1)),
				sortType: "asc",
			});
		}

		if (this.state.sortType === "asc" && column === "price") {
			this.setState({
				items: this.state.items.sort((a, b) => (a.price > b.price ? -1 : 1)),
				sortType: "desc",
			});
		} else if (this.state.sortType === "desc" && column === "price") {
			this.setState({
				items: this.state.items.sort((a, b) => (a.price > b.price ? 1 : -1)),
				sortType: "asc",
			});
		}

		if (this.state.sortType === "asc" && column === "type") {
			this.setState({
				items: this.state.items.sort((a, b) =>
					a.cartype > b.cartype ? -1 : 1
				),
				sortType: "desc",
			});
		} else if (this.state.sortType === "desc" && column === "type") {
			this.setState({
				items: this.state.items.sort((a, b) =>
					a.cartype > b.cartype ? 1 : -1
				),
				sortType: "asc",
			});
		}
	};

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

	onFormSubmitUpdateCar = () => {
		this.setState({
			bodyForPost: {
				name: this.state.formName,
				model: this.state.formModel,
				price: this.state.formPrice,
				cartype: this.state.formType,
				active: true,
				available: true,
			},
		});

		setTimeout(() => {
			AddCar(this.state.bodyForPost);
		}, 100);
		this.reloadPage();
	};

	reloadPage() {
		setTimeout(() => {
			window.location.hash = "Home";
		}, 180);
		setTimeout(() => {
			window.location.hash = "Cars";
		}, 210);
	}

	render() {
		if (!this.state.isLoaded) {
			return <div>Loading...</div>;
		} else {
			return (
				<>
					<Modal show={this.state.updateIsOpen} onHide={this.hideModalUpdate}>
						<Modal.Header closeButton>
							<Modal.Title>Lägg till bil</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<Form>
								<Form.Group controlId="formName">
									<Form.Label>Märke</Form.Label>
									<Form.Control
										name="name"
										type="text"
										placeholder="Märke"
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
										placeholder="Modell"
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
										placeholder="Typ"
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
										placeholder="Price"
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
					<Table striped border hover>
						<thead>
							<tr>
								{/* <th>id</th> */}
								<th width="1%">ID</th>
								<th
									width="10%"
									onClick={() => {
										this.sortByColumn("name");
									}}
								>
									Märke
								</th>
								<th
									width="5%"
									onClick={() => {
										this.sortByColumn("model");
									}}
								>
									Modell
								</th>
								<th
									width="5%"
									onClick={() => {
										this.sortByColumn("type");
									}}
								>
									Typ
								</th>
								<th
									width="10%"
									onClick={() => {
										this.sortByColumn("price");
									}}
								>
									SEK / dag
								</th>

								<th width="10%">Aktiv</th>
								<th width="10%">På lager</th>
								<th width="5%"></th>
							</tr>
						</thead>
						<tbody>
							{this.state.items.map((car) => {
								return (
									<tr key={car.id}>
										<CarList row={car}></CarList>
									</tr>
								);
							})}
						</tbody>
					</Table>
					<Button
						variant="info"
						type="submit"
						onClick={() => {
							this.showModalUpdate();
						}}
					>
						Lägg till bil
					</Button>{" "}
				</>
			);
		}
	}
}
