import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmited = async (data) => {
    console.log("Datos de login:", data);
    try {
      const respuesta = await axios.post("http://localhost/loginApi/login", {
        correo: data.correo,
        contrasena: data.contrasena
      });

      // Si el backend devuelve el nombre, úsalo; si no, fallback a email
      onLogin(respuesta.data.nombre || data.correo);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-8">
          <h1 className="text-center text-primary my-5">Formulario de Ingreso</h1>
        </div>
        <div className="col-sm-8">
          <form onSubmit={handleSubmit(onSubmited)} className="bg-info-subtle p-3 rounded">
            
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input type="email" className="form-control" {...register("correo", { required: true })} />
              {errors.correo && <p className="text-danger">Debes escribir un correo</p>}
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" className="form-control" {...register("contrasena", { required: true })} />
              {errors.contrasena && <p className="text-danger">La contraseña es obligatoria</p>}
            </div>

            <button type="submit" className="btn btn-primary">Ingresar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
