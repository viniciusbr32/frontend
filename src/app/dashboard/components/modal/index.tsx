import { X } from "lucide-react";
import styles from "./styles.module.scss";
import { use } from "react";
import { OrderContext } from "@/app/providers/order";
import { calculatePriceOrder } from "@/lib/helper";

export function ModalOrder() {
	const { order, onRequestClose, finishOrder } = use(OrderContext);

	async function handleFinishOrder() {
		await finishOrder(order[0].order.id);
	}

	return (
		<dialog className={styles.dialogContainer}>
			<section className={styles.dialogContent}>
				<button
					type="submit"
					onClick={onRequestClose}
					className={styles.dialogBack}
				>
					<X size={40} color="#ff3f4b" />
				</button>

				<article className={styles.container}>
					<h2>Detalhes do pedido</h2>
					<span className={styles.table}>Mesa {order[0].order.table}</span>
					{order.map((item) => (
						<section key={item.id} className={styles.containerItem}>
							<span>
								Qtd: {item.amount} - <b>{item.product.name}</b> - R${" "}
								{Number.parseFloat(item.product.price) * item.amount}
							</span>
							<span className={styles.description}>
								{item.product.description}
							</span>
						</section>
					))}

					<h3 className={styles.total}>
						Valor Total : R$ {calculatePriceOrder(order)}{" "}
					</h3>

					<button
						className={styles.buttonOrder}
						type="submit"
						onClick={handleFinishOrder}
					>
						Concluir pedido
					</button>
				</article>
			</section>
		</dialog>
	);
}
