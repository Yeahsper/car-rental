export function AddCar(jsonbody) {
	fetch("http://localhost:8081/api/v1/addcar", {
		method: "post",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(jsonbody),
	});
}

export default AddCar();
