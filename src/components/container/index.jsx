import React from 'react';
import style from './container.module.css';

export const Container = ({children}) => {
  return (
    <div className={style.container}>
        <div className={style.content}>
            {children}
        </div>
    </div>
  )
}
