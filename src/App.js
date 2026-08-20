import './App.css';
import Footer from './component/Layout/Footer';
import Head from './component/Layout/Head';
import MenuLeft from './component/Layout/MenuLeft';

function App({ children }) {
  return (
    <>
      <Head />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              <MenuLeft />
            </div>
            {children}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default App;
