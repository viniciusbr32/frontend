import { api } from "@/services/api";
import { Button } from "../components/button";
import styles from "./styles.module.scss";
import { getCookieServer } from "@/lib/cookieServer";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default function () {
	async function handleRegisterCategory(formData: FormData) {
		"use server";
		const name = formData.get("name");
		if (!name) return;

		const data = {
			name,
		};

		const token = getCookieServer();

		await api
			.post("/category", data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.catch((err) => {
				console.log(err);
				return;
			});

		redirect("/dashboard");
	}

	return (
		<main className={styles.container}>
			<h1>Nova categoria</h1>

			<form className={styles.form} action={handleRegisterCategory}>
				<input
					type="text"
					name="name"
					required
					placeholder="Nome da categoria, ex: Pizzas"
					className={styles.input}
				/>
				<Button name="cadastrar" />
			</form>
		</main>
	);
}
