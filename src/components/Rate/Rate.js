import { Rate } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

import './Rate.css';

export default class App extends React.Component {
    state = {
        value: null,
    };

    componentDidMount() {
        const { rating } = this.props;
        this.setState({ value: rating });
    }

    render() {
        const { value } = this.state;
        const { onChangeRate, movieId } = this.props;

        return (
            <Rate
                onChange={(rate) => {
                    this.setState({ value: rate });
                    onChangeRate(rate, movieId);
                }}
                className="rate"
                allowHalf
                count={10}
                value={value}
            />
        );
    }
}

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
