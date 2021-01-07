import React, { Component } from "react";
import { OrderList } from "../List/OrderList";
import Table from "react-bootstrap/Table";

export class OrderFetch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			isLoaded: false,
		};
	}

	componentDidMount() {
		fetch("http://localhost:8081/api/v1/myorders", { credentials: "include" })
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
				<Table striped bordered hover size="dark">
					<thead>
						<tr>
							<th>Ordernummer</th>
							<th>Märke</th>
							<th>Modell</th>
							<th>SEK / dag</th>
							<th>Aktiv</th>
							<th>Skapad</th>
							<th>Från</th>
							<th>Till</th>
						</tr>
					</thead>
					<tbody>
						{this.state.items.map((order) => {
							return (
								<tr key={order.id}>
									<OrderList row={order}></OrderList>
								</tr>
							);
						})}
					</tbody>
				</Table>
			);
		}
	}
}
