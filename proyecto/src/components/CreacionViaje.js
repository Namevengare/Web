import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreacionViaje = () => {
    const [nombreViaje, setNombreViaje] = useState('');
    const [monedaSeleccionada, setMonedaSeleccionada] = useState('COP');
    const [listaParticipantes, setListaParticipantes] = useState('');
    const [codigoViaje, setCodigoViaje] = useState('');
    const [fechaViaje, setFechaViaje] = useState('');
    const navigate = useNavigate();

    const esEmailValido = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const manejarEnvio = (e) => {
        e.preventDefault();

        const arregloParticipantes = listaParticipantes.split(',').slice(0, 20).map(participante => participante.trim());

        if (arregloParticipantes.length > 20) {
            alert('El número máximo de participantes es 20.');
            return;
        }

        for (const participante of arregloParticipantes) {
            if (!esEmailValido(participante)) {
                alert(`El correo electrónico "${participante}" no es válido.`);
                return;
            }
        }

        const nuevoViaje = {
            nombreViaje,
            moneda: monedaSeleccionada,
            participantes: arregloParticipantes,
            codigo: codigoViaje,
            fecha: fechaViaje,
        };

        const viajesPrevios = JSON.parse(localStorage.getItem('viajes')) || [];
        viajesPrevios.push(nuevoViaje);
        localStorage.setItem('viajes', JSON.stringify(viajesPrevios));

        alert(`Viaje creado con éxito. Código del viaje: ${codigoViaje}`);
        navigate('/ver-detalles', { state: { viaje: nuevoViaje } });
    };

    return (
        <div className="container my-5">
            <div className="card shadow-lg p-4">
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Crear Nuevo Viaje</h3>
                    <form onSubmit={manejarEnvio}>
                        <div className="mb-3">
                            <label htmlFor="nombreViaje" className="form-label">Nombre del Viaje:</label>
                            <input
                                id="nombreViaje"
                                type="text"
                                className="form-control"
                                value={nombreViaje}
                                onChange={(e) => setNombreViaje(e.target.value)}
                                placeholder="Ej. Viaje a Cancún"
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="moneda" className="form-label">Selecciona Moneda:</label>
                            <select
                                id="moneda"
                                className="form-select"
                                onChange={(e) => setMonedaSeleccionada(e.target.value)}
                                value={monedaSeleccionada}
                            >
                                <option value="COP">COP - Pesos Colombianos</option>
                                <option value="USD">USD - Dólares</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="participantes" className="form-label">Participantes (correos separados por comas):</label>
                            <input
                                id="participantes"
                                type="text"
                                className="form-control"
                                placeholder="Ej. email1@gmail.com, email2@gmail.com"
                                value={listaParticipantes}
                                onChange={(e) => setListaParticipantes(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="codigoViaje" className="form-label">Código del Viaje:</label>
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

                        <div className="mb-3">
                            <label htmlFor="fechaViaje" className="form-label">Fecha del Viaje:</label>
                            <input
                                id="fechaViaje"
                                type="date"
                                className="form-control"
                                value={fechaViaje}
                                onChange={(e) => setFechaViaje(e.target.value)}
                                required
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary btn-lg">Crear Viaje</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreacionViaje;
