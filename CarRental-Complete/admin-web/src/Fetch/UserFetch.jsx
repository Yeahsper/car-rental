import React from "react";
import Table from "react-bootstrap/Table";
import { UserList } from "../List/UserList";
export class UserFetch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sortType: "asc",
			items: [],
			filteredOrderArray: [],
			isLoaded: false,
		};
	}

	sortByColumn = (column) => {
		if (this.state.sortType === "asc" && column === "username") {
			this.setState({
				items: this.state.items.sort((a, b) =>
					a.username > b.username ? -1 : 1
				),
				sortType: "desc",
			});
		} else if (this.state.sortType === "desc" && column === "username") {
			this.setState({
				items: this.state.items.sort((a, b) =>
					a.username > b.username ? 1 : -1
				),
				sortType: "asc",
			});
		}

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

		if (this.state.sortType === "asc" && column === "email") {
			this.setState({
				items: this.state.items.sort((a, b) => (a.email > b.email ? -1 : 1)),
				sortType: "desc",
			});
		} else if (this.state.sortType === "desc" && column === "email") {
			this.setState({
				items: this.state.items.sort((a, b) => (a.email > b.email ? 1 : -1)),
				sortType: "asc",
			});
		}

		if (this.state.sortType === "asc" && column === "phoneNumber") {
			this.setState({
				items: this.state.items.sort((a, b) =>
					a.phoneNumber > b.phoneNumber ? -1 : 1
				),
				sortType: "desc",
			});
		} else if (this.state.sortType === "desc" && column === "phoneNumber") {
			this.setState({
				items: this.state.items.sort((a, b) =>
					a.phoneNumber > b.phoneNumber ? 1 : -1
				),
				sortType: "asc",
			});
		}

		if (this.state.sortType === "asc" && column === "amountOfOrders") {
			this.setState({
				items: this.state.items.sort((a, b) =>
					a.order.length > b.order.length ? -1 : 1
				),
				sortType: "desc",
			});
		} else if (this.state.sortType === "desc" && column === "amountOfOrders") {
			this.setState({
				items: this.state.items.sort((a, b) =>
					a.order.length > b.order.length ? 1 : -1
				),
				sortType: "asc",
			});
		}
	};

	componentDidMount() {
		fetch("http://localhost:8081/api/v1/customers", {
			credentials: "include",
		})
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
				this.setState({
					isLoaded: true,
					items: json,
					filteredOrderArray: json,
				});
				console.log("numberlength: " + this.numberLength);
			});
	}

	//Kommer ge varningar på "Expected '===' and instead saw '=='", men det fungerar inte med '==='
	filterOrderArray = () => {
		let nr = document.getElementById("numberInput").value;
		if (nr == 0 || nr === "") {
			this.setState({
				filteredOrderArray: this.state.items,
			});
		} else {
			this.setState({
				filteredOrderArray: this.state.filteredOrderArray.filter(
					(order) => order.numberOfOrders == nr
				),
			});
		}
	};

	render() {
		if (!this.state.isLoaded) {
			return <div>Loading...</div>;
		} else {
			return (
				<>
					<Table striped bordered hover variant="dark" color="red">
						<thead>
							<tr>
								<th
									onClick={() => {
										this.sortByColumn("username");
									}}
								>
									Användarnamn
								</th>
								<th
									onClick={() => {
										this.sortByColumn("name");
									}}
								>
									Namn
								</th>
								<th
									onClick={() => {
										this.sortByColumn("email");
									}}
								>
									Email
								</th>
								<th
									onClick={() => {
										this.sortByColumn("phoneNumber");
									}}
								>
									Telefon
								</th>
								<th>
									{" "}
									<input
										placeholder="Antal Ordrar"
										type="text"
										id="numberInput"
										onChange={this.filterOrderArray}
									></input>
								</th>
							</tr>
						</thead>
						<tbody>
							{this.state.filteredOrderArray.map((user) => {
								return (
									<>
										<tr key={user.id}>
											<UserList row={user}></UserList>
										</tr>
									</>
								);
							})}
						</tbody>
					</Table>
				</>
			);
		}
	}
}
