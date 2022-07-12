import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<div className="text-white h-screen pt-40 md:px-40 bg-black ">
			<Component {...pageProps} />
		</div>
	);
}

export default MyApp;
