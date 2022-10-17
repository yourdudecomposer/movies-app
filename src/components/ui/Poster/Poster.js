import React from 'react';
import PropTypes from 'prop-types';

import noImgtxt from '../../../assets/img/noImg-txt.png';

export default function Poster({ posterPath }) {
    const fallbackImage = (e) => {
        e.target.src = noImgtxt;
    };

    return (
        <img
            className="poster"
            src={`https://image.tmdb.org/t/p/original${posterPath}`}
            alt="poster"
            onError={fallbackImage}
        />
    );
}

Poster.defaultProps = {
    posterPath: '',
};
Poster.propTypes = {
    posterPath: PropTypes.string,
};
