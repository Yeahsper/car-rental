export function OrderCar(orderAsJson) {
	fetch("http://localhost:8081/api/v1/ordercar", {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(orderAsJson),
	});
}

export default OrderCar;
