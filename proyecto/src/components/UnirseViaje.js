import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UnirseViaje = () => {
    const [codigoViaje, setCodigoViaje] = useState('');
    const navigate = useNavigate();

    const manejarUnion = (e) => {
        e.preventDefault();
        const viajes = JSON.parse(localStorage.getItem('viajes')) || [];
        const viajeExistente = viajes.find(viaje => viaje.codigo === codigoViaje);

        if (viajeExistente) {
            alert('¡Te has unido al viaje exitosamente!');
            navigate('/ver-detalles', { state: { viaje: viajeExistente } });
        } else {
            alert('Código de viaje no válido. Intenta nuevamente.');
        }
    };

    return (
        <div className="container my-5">
            <div className="card shadow-lg p-4">
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Unirse a un Viaje</h3>
                    <form onSubmit={manejarUnion}>
                        <div className="mb-3">
                            <label htmlFor="codigoViaje" className="form-label">Ingresa el código del viaje:</label>
                            <input
                                id="codigoViaje"
                                type="text"
                                className="form-control"
                                placeholder="Ej. TRIP1234"
                                value={codigoViaje}
                                onChange={(e) => setCodigoViaje(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary btn-lg">Unirse al Viaje</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UnirseViaje;
