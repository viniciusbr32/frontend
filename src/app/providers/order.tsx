"use client";

import { getCookieClient } from "@/lib/cookieClient";
import { api } from "@/services/api";
import { createContext, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type OrderContextData = {
	isOpen: boolean;
	onRequestOpen: (order_id: string) => Promise<void>;
	onRequestClose: () => void;
	order: OrderItemProps[];
	finishOrder: (order_id: string) => Promise<void>;
};

type OrderProviderProps = {
	children: ReactNode;
};

export interface OrderItemProps {
	id: string;
	amount: number;
	created_at: string;
	order_id: string;
	product_id: string;
	product: {
		id: string;
		name: string;
		price: string;
		description: string;
		banner: string;
		category_id: string;
	};
	order: {
		id: string;
		table: number;
		name: string;
		draft: boolean;
		status: boolean;
	};
}

export const OrderContext = createContext({} as OrderContextData);

export function OrderProvider({ children }: OrderProviderProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [order, setOrder] = useState<OrderItemProps[]>([]);
	const router = useRouter();

	async function onRequestOpen(order_id: string) {
		const token = getCookieClient();

		try {
			const response = await api.get("/orders/details", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				params: {
					order_id: order_id,
				},
			});
			console.log(response.data);
			setOrder(response.data);
			setIsOpen(true);
		} catch (error) {
			console.log(error);
		}
	}

	function onRequestClose() {
		setIsOpen(false);
	}

	async function finishOrder(order_id: string) {
		const token = getCookieClient();

		const data = {
			order_id: order_id,
		};

		try {
			await api.put("/order/finish", data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		} catch (err) {
			console.log(err);
			toast.error("Falha ao finalizar pedido");
			return;
		}

		toast.success("Pedido Finalizado com sucesso");
		setIsOpen(false);
		router.refresh();
	}

	return (
		<OrderContext.Provider
			value={{ isOpen, onRequestClose, onRequestOpen, order, finishOrder }}
		>
			{children}
		</OrderContext.Provider>
	);
}
