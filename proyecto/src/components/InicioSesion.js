import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InicioSesion.css';

const InicioSesion = () => {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [contrasena, setContrasena] = useState('');

    const manejarEnvio = (e) => {
        e.preventDefault();
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if (usuario && usuario.email === email && usuario.contrasena === contrasena) {
            alert('Inicio de sesión exitoso.');
            navigate('/lista-viajes'); // Cambiar aquí a la ruta correcta
        } else {
            alert('Email o contraseña incorrectos.');
        }
    };

    return (
        <div className="login-container">
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={manejarEnvio}>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
            <i className="fa fa-user icon"></i>
          </div>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="contraseña" 
              value={contrasena} 
              onChange={(e) => setContrasena(e.target.value)} 
              required
            />
            <i className="fa fa-lock icon"></i>
          </div>
          
          <button type="submit" className="login-button">Iniciar Sesión</button>
          <p>No tienes una cuenta? <a href="/Registro">Regístrate</a></p>
        </form>
      </div>
    </div>
    );
};

export default InicioSesion;
