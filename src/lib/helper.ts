import type { OrderItemProps } from "@/app/providers/order";

export function calculatePriceOrder(orders: OrderItemProps[]) {
	return orders.reduce((total, item) => {
		const itemTotal = Number.parseFloat(item.product.price) * item.amount;

		return total + itemTotal;
	}, 0);
}
