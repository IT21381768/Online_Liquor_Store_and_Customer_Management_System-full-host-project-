import React, { useState, Component } from 'react'
import './form.css'
import axios from 'axios';


export default class Verification extends Component {


    render() {
        return (
            <div className='ver'>
                <div className='ver1'>
                    <h4>Are you 21 years old or older?</h4>
                    <a href='https://www.youtube.com/watch?v=XqZsoesa55w&t=10s'><button className='btnV'>No, I am not</button></a>
                    <a href='/home'><button className='btnV'>Yes, I am</button></a>
                </div>
            </div>
        )
    }

}