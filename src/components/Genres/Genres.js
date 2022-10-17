import React from 'react';
import './Genres.css';
import PropTypes from 'prop-types';

import MyContext from '../../context/MyContext/MyContext';

export default function Genres({ genres, id }) {
    return (
        <MyContext.Consumer>
            {(value) => {
                const genresList = [];
                genres.forEach((el) => {
                    value.genres.forEach((em) => {
                        if (el === em.id) {
                            genresList.push(
                                <li
                                    key={id * Math.random()}
                                    className="genre-info__item"
                                >
                                    {em.name}
                                </li>
                            );
                        }
                    });
                });

                return <ul className="genre-info">{genresList}</ul>;
            }}
        </MyContext.Consumer>
    );
}

Genres.defaultProps = {
    id: NaN,
    genres: [],
};
Genres.propTypes = {
    id: PropTypes.number,
    genres: PropTypes.arrayOf(PropTypes.number),
};
