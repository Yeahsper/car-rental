import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import "react-slideshow-image/dist/styles.css";
import logo_bil from "../Resources/Images/logo_bil.png";
import car_1 from "../Resources/Images/car_1.jpg";
import car_2 from "../Resources/Images/car_2.jpg";
import car_3 from "../Resources/Images/car_3.jpg";
import "../Homepage.css";
class Homepage extends Component {
	state = {};

	render() {
		return (
			<>
				<div className="homepage">
					<div>
						<img src={logo_bil} alt="Logo"></img>
					</div>
					<Carousel>
						<Carousel.Item interval={1000}>
							<img className="d-block w-100" src={car_1} alt="First slide" />
							<Carousel.Caption>
								<h3>Fartfyllda dagar</h3>
							</Carousel.Caption>
						</Carousel.Item>

						<Carousel.Item interval={1000}>
							<img className="d-block w-100" src={car_2} alt="Third slide" />
							<Carousel.Caption>
								<h3>Sommardagar</h3>
							</Carousel.Caption>
						</Carousel.Item>

						<Carousel.Item interval={1000}>
							<img className="d-block w-100" src={car_3} alt="Third slide" />
							<Carousel.Caption>
								<h3>Soliga dagar</h3>
							</Carousel.Caption>
						</Carousel.Item>
					</Carousel>
				</div>
			</>
		);
	}
}

export default Homepage;
