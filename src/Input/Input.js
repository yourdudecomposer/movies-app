import { Input } from 'antd';
import './Input.css';
import React from 'react';
import PropTypes from 'prop-types';

export default class Search extends React.Component {
    state = {
        value: '',
    };

    onChange = (e) => {
        const { search } = this.props;
        const { value } = this.state;

        this.setState(
            {
                value: e.target.value,
            },
            () => search(value)
        );
    };

    render() {
        const { value } = this.state;
        return (
            <div className="input-container">
                <Input
                    onChange={this.onChange}
                    value={value}
                    className="input"
                    placeholder="Try typing..."
                />
            </div>
        );
    }
}

Search.propTypes = {
    search: PropTypes.func,
};

Search.defaultProps = {
    search: () => {},
};
