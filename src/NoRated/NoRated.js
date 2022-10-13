import React from 'react';

import './NoRated.css';
import sad from '../img/sad.png';

export default function NoRated() {
    return (
        <div className="no-rated-container">
            <img className="no-rated-img" src={sad} alt="" />
            <p className="no-rated-text">You didn`t rate anything..</p>
        </div>
    );
}
