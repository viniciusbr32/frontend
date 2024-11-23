"use client";
import { RefreshCcw } from "lucide-react";
import styles from "./styles.module.scss";
import type { OrderProps } from "@/lib/order.type";
import { ModalOrder } from "../modal";
import { use } from "react";
import { OrderContext } from "@/app/providers/order";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
	orders: OrderProps[];
}

export function Orders({ orders }: Props) {
	const router = useRouter();

	const { isOpen, onRequestClose, onRequestOpen } = use(OrderContext);

	async function handleDetailOrder(order_id: string) {
		await onRequestOpen(order_id);
	}

	function handleRefresh() {
		router.refresh();
		toast.success("Pedidos atualizados com sucesso");
	}

	return (
		<>
			<main className={styles.container}>
				<section className={styles.containerHeader}>
					<h1>Ultimos pedidos</h1>
					<button type="submit" onClick={handleRefresh}>
						<RefreshCcw size={24} color="#3fffa3" />
					</button>
				</section>

				<section className={styles.listOrders}>
					{orders.length === 0 && (
						<span className={styles.emptyItem}>Nenhum pedido aberto</span>
					)}

					{orders.map((order) => (
						<button
							key={order.id}
							onClick={() => handleDetailOrder(order.id)}
							className={styles.orderItem}
							type="submit"
						>
							<div className={styles.tag} />
							<span>Mesa {order.table}</span>
						</button>
					))}
				</section>
			</main>
			{isOpen && <ModalOrder />}
		</>
	);
}
