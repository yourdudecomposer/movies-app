import './Card.css';
import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

export default function Card(props) {
    const trimText = (text) => {
        if (text.length < 174) return text;
        const subString = text.slice(0, 174);
        return `${subString.slice(0, subString.lastIndexOf(' '))}...`;
    };
    const { title, posterPath, releaseDate, overview } = props;

    const outputDate = format(new Date(releaseDate), 'MMMM d, yyy');
    return (
        <div className="card">
            <img
                className="poster"
                src={`https://image.tmdb.org/t/p/original${posterPath}`}
                alt="poster"
            />
            <div className="about">
                <h2 className="movie-title">{title}</h2>
                <p className="movie-date">{outputDate}</p>
                <div className="genre-info">
                    <div className="genre-info__item">Action</div>
                    <div className="genre-info__item">Drama</div>
                </div>
                <p className="movie-description">{trimText(overview)}</p>
            </div>
        </div>
    );
}

Card.defaultProps = {
    title: 'Title',
    posterPath: PropTypes.string,
    releaseDate: '-8640000000000000',
    overview:
        ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas eveniet officiis dolore explicabo? Tempora neque sit ratione accusantium doloremque, odit repellendus voluptate? Laborum provident vel numquam. Sed quis a explicabo.',
};
Card.propTypes = {
    title: PropTypes.string,
    posterPath: PropTypes.string,
    releaseDate: PropTypes.string,
    overview: PropTypes.string,
};
