import React, { Component } from "react";
import { CarFetch } from "../Fetch/CarFetch";
import MyNavbar from "./MyNavbar";
import MyProfile from "./MyProfile";
import Homepage from "./Homepage";

const navigationOptions = {
	Home: "Home",
	Profile: "Profile",
	Cars: "Cars",
	Logout: "Logout",
};

class Main extends Component {
	constructor() {
		super();

		this.state = {
			currentNavigation: null,
			created: "2021-01-00 01:13",
			startDate: "",
			endDate: "",
			carId: 2,
			userId: 1,
		};
	}

	componentDidMount() {
		this.initializeEvent();
	}

	render() {
		return (
			<>
				<MyNavbar></MyNavbar>

				<div>
					{this.state.currentNavigation === navigationOptions.Home ? (
						<>
							<Homepage></Homepage>
						</>
					) : (
						<></>
					)}
					{this.state.currentNavigation === navigationOptions.Cars ? (
						<>
							<CarFetch></CarFetch>
						</>
					) : (
						<></>
					)}
					{this.state.currentNavigation === navigationOptions.Profile ? (
						<>
							<MyProfile></MyProfile>
						</>
					) : (
						<></>
					)}
					{this.state.currentNavigation === navigationOptions.Logout ? (
						<>{this.setHash(navigationOptions.Home)}</>
					) : (
						<></>
					)}
				</div>
			</>
		);
	}

	initializeEvent() {
		window.addEventListener("hashchange", () => {
			let currentHash = window.location.hash;
			let hashToUpdate = currentHash.substring(1);
			let option = navigationOptions[hashToUpdate];
			if (option != null) {
				this.setState({
					currentNavigation: option,
				});
			}
		});
	}

	setHash(goToNavigation) {
		window.location.hash = goToNavigation;
	}
}

export default Main;
