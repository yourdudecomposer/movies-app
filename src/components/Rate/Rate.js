import { Rate as AntdRate } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

import './Rate.css';

export default class Rate extends React.Component {
    state = {
        value: null,
    };

    componentDidMount() {
        const { rating } = this.props;
        this.setState({ value: rating });
    }

    onChangeRate = (rate) => {
        const { onChangeRate, movieId } = this.props;
        this.setState({ value: rate });
        onChangeRate(rate, movieId);
    };

    render() {
        const { value } = this.state;

        return (
            <AntdRate
                onChange={this.onChangeRate}
                className="rate"
                allowHalf
                count={10}
                value={value}
            />
        );
    }
}

Rate.defaultProps = {
    movieId: NaN,
    rating: NaN,
    onChangeRate: () => {},
};
Rate.propTypes = {
    movieId: PropTypes.number,
    onChangeRate: PropTypes.func,
    rating: PropTypes.number,
};
