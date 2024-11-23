import { api } from "@/services/api";
import { Orders } from "./components/orders";
import { getCookieServer } from "@/lib/cookieServer";
import type { OrderProps } from "@/lib/order.type";

async function getOrders(): Promise<OrderProps[] | []> {
	const token = getCookieServer();

	try {
		const response = await api.get("/orders", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response.data || [];
	} catch (error) {
		console.log(error);
		return [];
	}
}

export default async function Dashboard() {
	const orders = await getOrders();

	return (
		<>
			<Orders orders={orders} />
		</>
	);
}
