import RRLogo from "./assets/favicon.ico";

function App() {
	return (
		<div className=" flex h-[100vh] w-[100vw] flex-col items-center justify-center">
			<div className=" flex flex-row">
				<a
					href="https://redrock.team/"
					target="_blank"
					rel="noreferrer"
					className="h-16 w-16"
				>
					<img src={RRLogo} className=" h-12 w-12" alt="RedRockerLogo" />
				</a>
			</div>
			<p>点击图标，了解更多</p>
		</div>
	);
}

export default App;
