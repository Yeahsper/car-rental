import React from "react";
import { AddressList } from "../List/AddressList";
import Table from "react-bootstrap/Table";

export class AddressFetch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			isLoaded: false,
		};
	}

	componentDidMount() {
		fetch("http://localhost:8081/api/v1/users/currentuser/address", {
			credentials: "include",
		})
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
				this.setState({
					isLoaded: true,
					items: json,
				});
			});
	}

	render() {
		if (!this.state.isLoaded) {
			return <div>Loading...</div>;
		} else {
			return (
				<Table striped bordered hover variant="dark">
					<thead>
						<tr>
							<th>Address</th>
							<th>Stad</th>
							<th>Land</th>
							<th>Postnummer</th>
						</tr>
					</thead>
					<tbody>
						<tr key={this.state.items.id}>
							<AddressList row={this.state.items}></AddressList>
						</tr>
					</tbody>
				</Table>
			);
		}
	}
}
