import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const VerDetalles = () => {
    const [tituloGasto, setTituloGasto] = useState('');
    const [monto, setMonto] = useState('');
    const [pagador, setPagador] = useState('');
    const [participantes, setParticipantes] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const manejarEnvio = (e) => {
        e.preventDefault();
        
        const gasto = {
            titulo: tituloGasto,
            monto: parseFloat(monto),
            pagador,
            participantes: participantes.split(',').map(participante => participante.trim()),
            fecha: new Date().toISOString(),
        };
        
        const gastosPrevios = JSON.parse(localStorage.getItem('gastos')) || [];
        gastosPrevios.push(gasto);
        localStorage.setItem('gastos', JSON.stringify(gastosPrevios));
        
        alert('Gasto registrado con éxito.');
        
        setTituloGasto('');
        setMonto('');
        setPagador('');
        setParticipantes('');
    };

    const verDetalles = () => {
        const gastos = JSON.parse(localStorage.getItem('gastos')) || [];
        if (gastos.length === 0) {
            alert('No hay gastos registrados para mostrar.');
            return;
        }
        
        const ultimoGasto = gastos[gastos.length - 1];
        navigate('/detalles-gasto', { state: { gasto: ultimoGasto } });
    };

    return (
        <div className="container my-5">
            <div className="card shadow-lg p-4">
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Registrar Gasto</h3>
                    <form onSubmit={manejarEnvio}>
                        <div className="mb-3">
                            <label htmlFor="tituloGasto" className="form-label">Título del Gasto</label>
                            <input
                                type="text"
                                id="tituloGasto"
                                className="form-control"
                                placeholder="Ej. Cena en restaurante"
                                value={tituloGasto}
                                onChange={(e) => setTituloGasto(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="monto" className="form-label">Monto</label>
                            <input
                                type="number"
                                id="monto"
                                className="form-control"
                                placeholder="Ej. 50000"
                                value={monto}
                                onChange={(e) => setMonto(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pagador" className="form-label">Pagador</label>
                            <input
                                type="text"
                                id="pagador"
                                className="form-control"
                                placeholder="Nombre del pagador"
                                value={pagador}
                                onChange={(e) => setPagador(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="participantes" className="form-label">Participantes</label>
                            <input
                                type="text"
                                id="participantes"
                                className="form-control"
                                placeholder="Emails separados por comas"
                                value={participantes}
                                onChange={(e) => setParticipantes(e.target.value)}
                                required
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-success btn-lg">Registrar Gasto</button>
                        </div>
                    </form>

                    <div className="mt-4 d-flex justify-content-between">
                        <button className="btn btn-info me-2 btn-lg" onClick={verDetalles}>Ver Detalles</button>
                        <button className="btn btn-warning btn-lg" onClick={() => navigate('/balances')}>Ver Balances</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerDetalles;
