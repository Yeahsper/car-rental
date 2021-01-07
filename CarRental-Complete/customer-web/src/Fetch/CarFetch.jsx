import React from "react";
import { CarList } from "../List/CarList";
import Table from "react-bootstrap/Table";

export class CarFetch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			url: "http://localhost:8081/api/v1/availablecars",
			items: [],
			isLoaded: false,
			sortType: "asc",
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

	render() {
		if (!this.state.isLoaded) {
			return <div>Loading...</div>;
		} else {
			return (
				<Table striped border hover>
					<thead>
						<tr>
							{/* <th>id</th> */}
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
							<th width="5%">Datum</th>
							<th width="1%"></th>
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
			);
		}
	}
}
