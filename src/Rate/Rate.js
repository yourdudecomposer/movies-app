import { Rate } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

import './Rate.css';

function App({ onChangeRate, movieId, rating }) {
    return rating ? (
        <Rate className="rate" value={rating} count={10} allowHalf />
    ) : (
        <Rate
            onChange={(rate) => onChangeRate(rate, movieId)}
            className="rate"
            allowHalf
            count={10}
        />
    );
}

export default App;

App.defaultProps = {
    movieId: NaN,
    rating: NaN,
    onChangeRate: () => {},
};
App.propTypes = {
    movieId: PropTypes.number,
    onChangeRate: PropTypes.func,
    rating: PropTypes.number,
};
