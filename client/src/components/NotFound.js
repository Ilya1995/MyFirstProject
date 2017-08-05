import React from 'react'
import { Link } from 'react-router'

const NotFound = () => {
    return (
        <div className='row'>
            <div className='col-md-12'>
                Страница не найдена. Вернуться на <Link to='/'>главную</Link>?
            </div>
        </div>
    )
};

export default NotFound;