import './Card.css';
import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import noImg from '../img/noImg.png';
import noImgtxt from '../img/noImg-txt.png';
import Rate from '../Rate/Rate';
import Vote from '../Vote/Vote';

export default function Card(props) {
    const trimText = (text, symbols) => {
        if (text.length < symbols) return text;
        const subString = text.slice(0, symbols);
        return `${subString.slice(0, subString.lastIndexOf(' '))}...`;
    };
    const fallbackImage = (e) => {
        e.target.src = noImg;
        e.target.src = noImgtxt;
    };
    const { title, posterPath, releaseDate, overview, vote, guestId, movieId } =
        props;
    const outputDate = (() => {
        if (releaseDate) return format(new Date(releaseDate), 'MMMM d, yyy');
        return 'no data';
    })();
    const { innerWidth } = window;
    return (
        <div className="card">
            <img
                className="poster"
                src={`https://image.tmdb.org/t/p/original${posterPath}`}
                alt="poster"
                onError={fallbackImage}
            />
            <div className="about">
                <h2 className="movie-title">{title}</h2>
                <Vote vote={vote} />
                <p className="movie-date">{outputDate}</p>
                <div className="genre-info">
                    <div className="genre-info__item">Action</div>
                    <div className="genre-info__item">Drama</div>
                </div>
                <p className="movie-description">
                    {innerWidth > 979
                        ? trimText(overview, 150)
                        : trimText(overview, 100)}
                </p>
                <Rate guestId={guestId} movieId={movieId} />
            </div>
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
    guestId: '',
    movieId: NaN,
};
Card.propTypes = {
    title: PropTypes.string,
    posterPath: PropTypes.string,
    releaseDate: PropTypes.string,
    overview: PropTypes.string,
    vote: PropTypes.number,
    guestId: PropTypes.string,
    movieId: PropTypes.number,
};
