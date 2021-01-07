export function DeleteCar(carId) {
	fetch("http://localhost:8081/api/v1/deletecar", {
		method: "delete",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			id: carId,
		}),
	});
}

export default DeleteCar();
