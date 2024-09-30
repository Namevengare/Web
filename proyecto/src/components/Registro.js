import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Registro.css';

const Registro = () => {
    const [email, setEmail] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');

    const manejarEnvio = (e) => {
        e.preventDefault();
        if (contrasena.length >= 6) {
            localStorage.setItem('usuario', JSON.stringify({ email, contrasena }));
            alert('Registro exitoso.');
        } else {
            alert('La contraseña debe tener al menos 6 caracteres.');
        }
    };

    return (
        <div className="background">
      <div className="form-container">
        <form className="register-form" onSubmit={manejarEnvio}>
          <h2>Regístrate</h2>
          <div className="input-group">
            <input
              type="text"
              id="username"
              placeholder="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
            <i className="fas fa-user"></i>
          </div>
          <div className="input-group">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className="fas fa-envelope"></i>
          </div>
          <div className="input-group">
            <input
              type="password"
              id="password"
              placeholder="contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
            <i className="fas fa-lock"></i>
          </div>
          <button type="submit">Registrarme</button>
          <p>Ya tienes una cuenta? <Link to="/iniciar-sesion">Inicia sesión</Link></p>
        </form>
      </div>
    </div>
    );
};

export default Registro;
