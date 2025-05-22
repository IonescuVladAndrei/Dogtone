import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import PageNotFound from "./pages/PageNotFound";
import SignUpPage from "./pages/SignUpPage";
import GlobalStyles from "./styles/GlobalStyles";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryDevtools initialIsOpen={false} />
			{/* React Query debugging */}

			<GlobalStyles />
			{/*	CSS Styles */}

			<BrowserRouter>
				<Routes>
					<Route index element={<Navigate replace to="homepage" />} />
					<Route path="homepage" element={<HomePage />} />

					<Route path="sign-up" element={<SignUpPage />} />
					<Route path="log-in" element={<LogInPage />} />

					<Route path="*" element={<PageNotFound />} />
				</Routes>
			</BrowserRouter>

			<Toaster
				position="top-center"
				gutter={12}
				containerStyle={{ margin: "8px" }}
				toastOptions={{
					success: {
						duration: 1500,
					},
					error: {
						duration: 3000,
					},
					style: {
						fontSize: "16px",
						maxWidth: "550px",
						padding: "16px 24px",
						backgroundColor: "var(--color-grey-0)",
						color: "var(--color-grey-700)",
						border: "1px solid var(--color-brand-100)",
					},
				}}
			/>
		</QueryClientProvider>
	);
}

export default App;
