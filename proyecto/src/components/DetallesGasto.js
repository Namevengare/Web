import React from 'react';
import { useLocation } from 'react-router-dom';

const DetallesGasto = () => {
    const location = useLocation();
    const { gasto } = location.state || {};
    const gastos = JSON.parse(localStorage.getItem('gastos')) || [];
    
    const gastosPorFecha = gastos.reduce((acc, gasto) => {
        const fecha = new Date(gasto.fecha).toLocaleDateString();
        if (!acc[fecha]) {
            acc[fecha] = [];
        }
        acc[fecha].push(gasto);
        return acc;
    }, {});

    const fechasOrdenadas = Object.keys(gastosPorFecha).sort((a, b) => new Date(b) - new Date(a));

    return (
        <div className="container mt-4">
            <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="card-title text-center mb-4">Detalles del Gasto</h5>

                    {gasto && (
                        <div className="mb-4 p-3 rounded shadow-sm bg-light">
                            <h6><i className="bi bi-cash-stack me-2"></i>Último Gasto Registrado</h6>
                            <p><strong>Título:</strong> {gasto.titulo}</p>
                            <p><strong>Monto:</strong> ${gasto.monto.toFixed(2)}</p>
                            <p><strong>Pagador:</strong> {gasto.pagador}</p>
                            <p><strong>Participantes:</strong> {gasto.participantes.join(', ')}</p>
                            <p><strong>Fecha:</strong> {new Date(gasto.fecha).toLocaleDateString()}</p>
                        </div>
                    )}

                    <h5 className="mt-4"><i className="bi bi-calendar3 me-2"></i>Gastos Registrados por Fecha</h5>
                    {fechasOrdenadas.length === 0 ? (
                        <p className="text-muted">No hay gastos registrados.</p>
                    ) : (
                        fechasOrdenadas.map(fecha => (
                            <div key={fecha} className="mb-4">
                                <h6 className="text-primary"><i className="bi bi-calendar-event me-2"></i>{fecha}</h6>
                                <ul className="list-group">
                                    {gastosPorFecha[fecha].map((gasto, index) => (
                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                            <span>
                                                <strong>{gasto.titulo}</strong> - ${gasto.monto.toFixed(2)}
                                                <br />
                                                <small className="text-muted">Pagado por: {gasto.pagador}</small>
                                            </span>
                                            <i className="bi bi-person-circle"></i>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetallesGasto;
