import {useState} from 'react'
import { Container } from '../../components/container'
import style from './auth.module.css';
import { Login } from '../../features/login';
import { Register } from '../../features/register';

export const Auth = () => {
    const [togle, setCard] = useState('login');

    return (
        <Container>
            <div className={style.content}>
                <div className={style.header}>
                    <h2 onClick={() => setCard('login')}>Вход</h2>
                    <h2 onClick={() => setCard('register')}>Регистрация</h2>
                </div>  
                <div>
                    {togle === 'login' ? <Login setCard={setCard}/> : <Register setCard={setCard}/>}
                </div>
            </div>
        </Container>
    )
}
