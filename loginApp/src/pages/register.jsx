import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register({ onLogin }) {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();
  const contra = watch("contrasena");

  const onSubmited = async (data) => {
    console.log("Datos del formulario:", data);

    try {
      await axios.post("http://localhost/loginApi/register", {
        nombre: data.nombre,
        correo: data.correo,
        contrasena: data.contrasena
      });

      // Usamos el nombre del formulario para pasar al Dashboard
      onLogin(data.nombre);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Error al registrar usuario");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-8">
          <h1 className="text-center text-primary my-5">Formulario de Registro</h1>
        </div>
        <div className="col-sm-8">
          <form onSubmit={handleSubmit(onSubmited)} className="bg-info-subtle p-3 rounded">
            
            <div className="mb-3">
              <label className="form-label">Nombre de Usuario</label>
              <input type="text" className="form-control" {...register("nombre", { required: true })} />
              {errors.nombre && <p className="text-danger">Debes escribir un nombre de usuario</p>}
            </div>

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

            <div className="mb-3">
              <label className="form-label">Confirmar Password</label>
              <input
                type="password"
                className="form-control"
                {...register("confirmar_contrasena", {
                  required: "Por favor confirma tu contraseña",
                  validate: value => value === contra || "Las contraseñas no coinciden"
                })}
              />
              {errors.confirmar_contrasena && <p className="text-danger">{errors.confirmar_contrasena.message}</p>}
            </div>

            <button type="submit" className="btn btn-primary">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
