import React from "react";
import Table from "react-bootstrap/Table";
import { UserList } from "../List/UserList";

export class UserFetch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: [],
			userlist: [],
			isLoaded: false,
		};
	}

	componentDidMount() {
		fetch("http://localhost:8081/api/v1/users/currentuser", {
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
				<Table striped bordered hover variant="dark" color="red">
					<thead>
						<tr>
							<th>Användarnamn</th>
							<th>Namn</th>
							<th>Email</th>
						</tr>
					</thead>
					<tbody>
						<tr key={this.state.items.id}>
							<UserList row={this.state.items}></UserList>
						</tr>
					</tbody>
				</Table>
			);
		}
	}
}
