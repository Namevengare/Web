import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registro from './components/Registro';
import InicioSesion from './components/InicioSesion';
import ListaViajes from './components/ListaViajes';
import CreacionViaje from './components/CreacionViaje';
import DetallesGasto from './components/DetallesGasto';
import Balances from './components/Balances';
import UnirseViaje from './components/UnirseViaje';
import VerDetalles from './components/VerDetalles';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';


const App = () => {

    const yourBalancesArray = []; 

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Registro />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/iniciar-sesion" element={<InicioSesion />} />
                <Route path="/lista-viajes" element={<ListaViajes />} />
                <Route path="/unirse-viaje" element={<UnirseViaje />} />
                <Route path="/creacion-viaje" element={<CreacionViaje />} />
                <Route path="/ver-detalles" element={<VerDetalles />} />
                <Route path="/detalles-gasto" element={<DetallesGasto />} />
                <Route path="/balances" element={<Balances balances={yourBalancesArray} />} />
            </Routes>
        </Router>
    );
};

export default App;
