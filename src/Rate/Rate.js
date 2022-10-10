import { Rate } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

import './Rate.css';

import Api from '../Api/Api';

function App({ guestId, movieId }) {
    const api = new Api();

    const onChange = (rate) => {
        const data = {
            value: rate,
        };
        api.postRatedMovie(guestId, movieId, data);
    };
    return <Rate onChange={onChange} className="rate" allowHalf count={10} />;
}

export default App;

App.defaultProps = {
    guestId: '',
    movieId: NaN,
};
App.propTypes = {
    guestId: PropTypes.string,
    movieId: PropTypes.number,
};
