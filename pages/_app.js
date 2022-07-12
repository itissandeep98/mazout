import { ToastContainer } from "react-toastify";
import LayoutWrapper from "../layout/LayoutWrapper";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<div className="text-white h-screen pt-40 md:px-40 bg-black ">
			<LayoutWrapper {...pageProps}>
				<Component {...pageProps} />
			</LayoutWrapper>
			<ToastContainer />
		</div>
	);
}

export default MyApp;
