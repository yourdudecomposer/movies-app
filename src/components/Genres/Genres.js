import React from 'react';
import './Genres.css';
import PropTypes from 'prop-types';

import MyContext from '../../context/MyContext/MyContext';

export default function Genres({ currentGenres }) {
    return (
        <MyContext.Consumer>
            {(value) => {
                const allGenres = value.genres;
                const renderedGenres = currentGenres.map((el) => {
                    let res;
                    for (let i = 0; i < allGenres.length; i++) {
                        if (allGenres[i].id === el) {
                            res = allGenres[i].name;
                            break;
                        }
                    }
                    return (
                        <li key={el} className="genre-info__item">
                            {res}
                        </li>
                    );
                });
                return <ul className="genre-info">{renderedGenres}</ul>;
            }}
        </MyContext.Consumer>
    );
}

Genres.defaultProps = {
    currentGenres: [],
};
Genres.propTypes = {
    currentGenres: PropTypes.arrayOf(PropTypes.number),
};
