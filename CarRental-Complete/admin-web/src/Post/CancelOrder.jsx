export function CancelOrder(orderid) {
	fetch("http://localhost:8081/api/v1/updateorder", {
		method: "put",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			id: orderid,
		}),
	});
}

export default CancelOrder;
