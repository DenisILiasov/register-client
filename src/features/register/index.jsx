import { useState } from 'react';
import style from './register.module.css';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { url } from '../../constant';

export const Register = ({setCard}) => {
    const [error, setError] = useState();
    const [passwordError, setPasswordError] = useState(true)

    const {register, handleSubmit, formState: {errors}, reset} = useForm()
    const Register = async (data) => {
      // Проверка одиноковы ли введеные пароли
      if(data.password !== data.resetPassword){
        setPasswordError(false);
        return;
      }else{
        setPasswordError(true)
      }
      
      await axios.post(`${url}register`, {
          name: data.name,
          email: data.email,
          password: data.password
        }).then(r => {
          setCard('login')
        }).catch(error => {
          setError(error.response.data.message)
        })
    }

    return (
      <form className={style.form} onSubmit={handleSubmit(Register)}>
        <input {...register('name', {
          required: 'Обязательное поле',
          maxLength: 20,
          minLength: 3
        })} type="text" placeholder='Имя'/>
        {/* Вывод ошибок под полем ввода */}

        {errors && <span>{errors.name?.message}</span>}

        {/* Проверка длины строки ввода имени */}
        {errors.name && errors.name.type === "maxLength" && (
        <span>Имя слишком длиное</span>
        )}

        {errors.name && errors.name.type === "minLength" && (
        <span>Имя слишком короткое</span>
        )}

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
          maxLength: 60,
          minLength: 6
        })} type="text" placeholder='Пароль'/>

        {errors && <span>{errors.password?.message}</span>}

         {/* Проверка длины строки ввода пароля */}
        {errors.password && errors.password.type === "maxLength" && (
        <span>Пароль слишком длиный</span>
        )}

         {errors.password && errors.password.type === "minLength" && (
        <span>Пароль слишком короткий</span>
        )}

        <input {...register('resetPassword', {
          required: 'Обязательное поле',
        })} type="text" placeholder='Пароль'/>

        {errors && <span>{errors.password?.message}</span>}

        {!passwordError && <span>Пароли должны совпадать</span>}

        <button type='submit'>Регистрация</button>
        {error && <span>{error}</span>}
      </form>
    )
}
