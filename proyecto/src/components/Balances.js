import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Balances = ({ participantes = [] }) => {
    const [resultado, setResultado] = useState('');
    const [balances, setBalances] = useState(participantes.reduce((acc, participante) => {
        acc[participante] = 0;
        return acc;
    }, {}));
    const navigate = useNavigate();

    const equilibrarGastos = () => {
        const usuario = 'Nombre del Usuario';
        const usuarioBalance = balances[usuario];

        if (usuarioBalance !== undefined) {
            if (usuarioBalance > 0) {
                setResultado(`Le deben a ${usuario}: $${usuarioBalance}`);
            } else if (usuarioBalance < 0) {
                setResultado(`${usuario} debe: $${Math.abs(usuarioBalance)}`);
            } else {
                setResultado(`${usuario} está equilibrado.`);
            }
        } else {
            setResultado(`No se encontró el balance de ${usuario}.`);
        }
    };

    const manejarCambioBalance = (participante, nuevoBalance) => {
        setBalances((prevBalances) => ({
            ...prevBalances,
            [participante]: nuevoBalance
        }));
    };

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="card-title text-center mb-4"><i className="bi bi-calculator me-2"></i>Balances de Participantes</h5>
                    {Object.keys(balances).length === 0 ? (
                        <p className="text-muted text-center">No hay balances para mostrar.</p>
                    ) : (
                        <ul className="list-group">
                            {Object.entries(balances).map(([participante, saldo]) => (
                                <li key={participante} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span><i className="bi bi-person-circle me-2"></i>{participante}</span>
                                    <input
                                        type="number"
                                        value={saldo}
                                        onChange={(e) => manejarCambioBalance(participante, parseFloat(e.target.value) || 0)}
                                        className="form-control w-25"
                                    />
                                    <span className={`badge ${saldo >= 0 ? 'bg-success' : 'bg-danger'}`}>
                                        {saldo >= 0 ? 'A Favor' : 'En Contra'} (${Math.abs(saldo)})
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="text-center mt-4">
                        <button className="btn btn-warning me-2" onClick={equilibrarGastos}>
                            <i className="bi bi-balance-scale"></i> Equilibrar Gastos
                        </button>
                        <button className="btn btn-primary" onClick={() => navigate('/ver-detalles')}>
                            <i className="bi bi-list-check"></i> Ver Detalles
                        </button>
                    </div>
                    {resultado && <p className="text-center mt-3"><strong>{resultado}</strong></p>}
                </div>
            </div>
        </div>
    );
};

export default Balances;
