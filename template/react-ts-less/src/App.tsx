import RRLogo from './assets/favicon.ico';
import './index.less'
function App() {
  return (
    <div className="box">
      <div className="pic">
        <a
          href="https://redrock.team/"
          target="_blank"
          rel="noreferrer"
          className="w-16 h-16"
        >
          <img src={RRLogo} className="" alt="RedRockerLogo" />
        </a>
      </div>
      <p className='font'>点击图标，了解更多</p>
    </div>
  );
}

export default App;