import React from "react";

export class AddressList extends React.Component {
	render() {
		return (
			<>
				<td>{this.props.row.adress}</td>
				<td>{this.props.row.city}</td>
				<td>{this.props.row.country}</td>
				<td>{this.props.row.zipcode}</td>
			</>
		);
	}
}
