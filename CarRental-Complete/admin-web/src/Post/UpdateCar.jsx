export function UpdateCar(jsonbody) {
	fetch("http://localhost:8081/api/v1/updatecar", {
		method: "put",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(jsonbody),
	});
}

export default UpdateCar();
