import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ListaViajes = () => {
    const navigate = useNavigate();
    const viajes = JSON.parse(localStorage.getItem('viajes')) || [];

    return (
        <div className="container my-5">
            <div className="card shadow-lg p-4"> {/* Fondo blanco para la tarjeta */}
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Lista de Viajes</h3>
                    <div className="d-flex justify-content-center mb-3">
                        <button 
                            className="btn btn-warning btn-lg me-2" 
                            onClick={() => navigate('/creacion-viaje')}
                        >
                            Crear Nueva Ruta
                        </button>
                        <button 
                            className="btn btn-info btn-lg" 
                            onClick={() => navigate('/unirse-viaje')}
                        >
                            Unirse a un Viaje
                        </button>
                    </div>

                    <ul className="list-group">
                        {viajes.length > 0 ? (
                            viajes.map((viaje, index) => (
                                <li 
                                    key={index} 
                                    className="list-group-item d-flex align-items-start p-3 mb-2 shadow-sm rounded"
                                >
                                    <i className="bi bi-geo-alt-fill me-3 text-primary" style={{ fontSize: '2em' }}></i>
                                    <div className="ms-2">
                                        <h5 className="mb-1">{viaje.nombreViaje}</h5>
                                        <p className="mb-2 text-muted">{viaje.descripcion || 'Sin descripción disponible'}</p>
                                        <small className="text-secondary">{new Date(viaje.fecha).toLocaleDateString()}</small>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="list-group-item text-center p-4">No hay viajes creados.</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ListaViajes;
