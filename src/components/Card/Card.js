import './Card.css';
import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import Rate from '../Rate/Rate';
import Vote from '../Vote/Vote';
import Genres from '../Genres/Genres';
import Poster from '../ui/Poster/Poster';

export default function Card(props) {
    const trimText = (text, symbols) => {
        if (text.length < symbols) return text;
        const subString = text.slice(0, symbols);
        return `${subString.slice(0, subString.lastIndexOf(' '))}...`;
    };

    const {
        title,
        posterPath,
        releaseDate,
        overview,
        vote,
        onChangeRate,
        rating,
        movieId,
        genres,
    } = props;

    const outputDate = (() => {
        if (releaseDate) return format(new Date(releaseDate), 'MMMM d, yyy');
        return 'no data';
    })();
    const { innerWidth } = window;
    return (
        <div className="card">
            <Poster posterPath={posterPath} />
            <section className="about">
                <h2 className="movie-title">{title}</h2>
                <Vote vote={vote} />
                <p className="movie-date">{outputDate}</p>
                <Genres id={movieId} genres={genres} />
                <p className="movie-description">
                    {innerWidth > 979
                        ? trimText(overview, 150)
                        : trimText(overview, 100)}
                </p>
                <Rate
                    rating={rating}
                    onChangeRate={onChangeRate}
                    movieId={movieId}
                />
            </section>
        </div>
    );
}

Card.defaultProps = {
    title: 'Title',
    posterPath: '',
    releaseDate: '',
    overview:
        ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas eveniet officiis dolore explicabo? Tempora neque sit ratione accusantium doloremque, odit repellendus voluptate? Laborum provident vel numquam. Sed quis a explicabo.',
    vote: -1,
    movieId: NaN,
    rating: NaN,
    onChangeRate: () => {},
    genres: [],
};
Card.propTypes = {
    title: PropTypes.string,
    posterPath: PropTypes.string,
    releaseDate: PropTypes.string,
    overview: PropTypes.string,
    vote: PropTypes.number,
    movieId: PropTypes.number,
    rating: PropTypes.number,
    onChangeRate: PropTypes.func,
    genres: PropTypes.arrayOf(PropTypes.number),
};
