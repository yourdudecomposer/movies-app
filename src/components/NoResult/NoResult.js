import React from 'react';

import './NoResult.css';
import sad from '../../assets/img/sad.png';

export default function NoResult() {
    return (
        <div className="no-result-container">
            <img className="no-result-img" src={sad} alt="" />
            <p className="no-result-text">Sorry, we can`t find anything..</p>
        </div>
    );
}
