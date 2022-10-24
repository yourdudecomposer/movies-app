import React from 'react';
import './Genres.css';
import PropTypes from 'prop-types';

import MyContext from '../../context/MyContext/MyContext';

export default function Genres({ genres }) {
    return (
        <MyContext.Consumer>
            {(value) => {
                const genresList = [];
                // const genresList= value.genres
                //     .filter(element => genres.includes(element.id))
                //     .map(e => <li
                //         key={e.id}
                //         className="genre-info__item"
                //     >
                //         {e.name}
                //     </li>);
                genres.forEach((el) => {
                    value.genres.forEach((em) => {
                        if (el === em.id) {
                            genresList.push(
                                <li
                                    key={Math.random()}
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
    genres: [],
};
Genres.propTypes = {
    genres: PropTypes.arrayOf(PropTypes.number),
};
