import React from "react";

export class UserList extends React.Component {
	render() {
		return (
			<>
				{/* <td>{this.props.row.myUser.username}</td> */}
				<td>{this.props.row.myUser.name}</td>
				<td>{this.props.row.myUser.email}</td>
			</>
		);
	}
}
