import RRLogo from './assets/favicon.ico';

function App() {
  return (
    <div className=" w-[100vw] h-[100vh] flex items-center justify-center flex-col">
      <div className=" flex-row flex">
        <a
          href="https://redrock.team/"
          target="_blank"
          rel="noreferrer"
          className="w-16 h-16"
        >
          <img src={RRLogo} className=" w-12 h-12" alt="RedRockerLogo" />
        </a>
      </div>
      <p>点击图标，了解更多</p>
    </div>
  );
}

export default App;