import './App.css';
import Footer from './component/Layout/Footer';
import Head from './component/Layout/Head';
import MenuAcc from './component/Layout/MenuAccount';
import MenuLeft from './component/Layout/MenuLeft';
import { useLocation } from 'react-router-dom';
 
function App({ children }) {
  let params = useLocation();
  console.log(params);
  return (
    <>
      <Head />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              {params['pathname'].includes("account") ? <MenuAcc/> : <MenuLeft/>}
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
