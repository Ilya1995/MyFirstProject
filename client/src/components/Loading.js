import React, { Component } from 'react'

export default class Loading extends Component {
    render() {
        return (
            <div className='overlay'>
                <div className='preloader'>
                    <img src='./src/styles/images/kot.gif' alt='image' width='200px' height='200px;'/>
                </div>
            </div>
        )
    }
}