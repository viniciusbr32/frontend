import { OrderProvider } from "../providers/order";
import { Header } from "./components/header";

export default function DashboardLayou({
	children,
}: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<OrderProvider>{children}</OrderProvider>
		</>
	);
}
