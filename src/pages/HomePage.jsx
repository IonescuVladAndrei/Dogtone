import styled from "styled-components";
import { AppProvider } from "../features/app-context/AppContext";
import FilterList from "../features/filter-list/FilterList";
import Header from "../features/Header/Header";
import ImageOriginList from "../features/image-origin-list/ImageOriginList";
import OriginalImage from "../features/original-image/OriginalImage";
import Processing from "../features/processing/Processing";
import Footer from "../ui/Footer";
import MainHeading from "../ui/MainHeading";

const AppLayout = styled.div`
	height: 100dvh;
`;

const MainContainer = styled.main`
	background-color: var(--color-brand-25);
	padding: 0rem 3rem 20rem;
	min-height: calc(100dvh - 5rem - 16rem);
	/* 100dvh - Header - Footer */

	@media (max-width: 900px) {
		padding: 3rem 1rem 20rem;
	}
`;

const ChildContainer = styled.div`
	max-width: 140rem;
	margin: 0 auto;
	margin-top: 6rem;
	display: grid;
	grid-template-columns: 1fr 1fr;
	row-gap: 2rem;

	@media (max-width: 1480px) {
		grid-template-columns: 1fr;

		& > :nth-child(1) {
			order: 1;
		}

		& > :nth-child(2) {
			order: 3;
		}

		& > :nth-child(3) {
			order: 2;
		}

		& > :nth-child(4) {
			order: 4;
		}
	}
`;

function HomePage() {
	return (
		<AppProvider>
			<AppLayout>
				<Header />
				<MainContainer>
					<MainHeading />
					<ChildContainer>
						<ImageOriginList />
						<FilterList />
						<OriginalImage />
						<Processing />
					</ChildContainer>
				</MainContainer>
				<Footer />
			</AppLayout>
		</AppProvider>
	);
}

export default HomePage;
