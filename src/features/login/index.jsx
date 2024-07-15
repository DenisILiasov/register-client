import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import style from './login.module.css'
import axios from 'axios';
import { url } from '../../constant';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [error, setError] = useState();
  const {register, handleSubmit, formState: {errors}} = useForm();
  const navigate = useNavigate();

  const Login = async (data) => {
    await axios.post(`${url}login`, {
      email: data.email,
      password: data.password
    }).then(r => {
      navigate('/profile')
    }).catch(err => {
      setError(err.response.data.message)
    })
  }
  return (
  <form  className={style.form} onSubmit={handleSubmit(Login)}>
    <input {...register('email', {
      required: 'Обязательное поле',
      // Валидация Email
      pattern: {
        value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
        message: 'Некоректный email'
      }
    })} type="text" placeholder='Email'/>

    {errors && <span>{errors.email?.message}</span>}

    <input {...register('password', {
          required: 'Обязательное поле',
        })} type="text" placeholder='Пароль'/>

        {errors && <span>{errors.password?.message}</span>}
    <button type='submit'>Войти</button>
    {error && <span>{error}</span>}
  </form>
  )
}
