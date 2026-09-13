import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import StatusPanel from './components/StatusPanel/StatusPanel';
import ToiletList from './components/ToiletList/ToiletList';
import MapView from './components/MapView/MapView';
import Footer from './components/Footer/Footer';
import { useToa } from './context/ToaContext';
import './App.css';

function App() {
  const { coords } = useToa();

  return (
    <div className="app">
      <Header />
      <Hero />
      <StatusPanel />

      {coords && (
        <section className="app__results">
          <ToiletList />
          <MapView />
        </section>
      )}

      <Footer />
    </div>
  );
}

export default App;
