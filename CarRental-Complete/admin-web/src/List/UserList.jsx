import React from "react";
export class UserList extends React.Component {
	render() {
		return (
			<>
				{" "}
				<td>{this.props.row.username}</td>
				<td>{this.props.row.name}</td>
				<td>{this.props.row.email}</td>
				<td>{this.props.row.phoneNumber}</td>
				<td>{this.props.row.numberOfOrders}</td>
			</>
		);
	}
}
