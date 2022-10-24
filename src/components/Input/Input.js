import { Input } from 'antd';
import './Input.css';
import React from 'react';
import PropTypes from 'prop-types';

export default function Search(props) {
    const { search } = props;

    const startSearch = (e) => {
        if (e.target.value !== '') search(e.target.value);
    };

    return (
        <Input
            onChange={startSearch}
            className="input"
            placeholder="Try typing..."
        />
    );
}

Search.propTypes = {
    search: PropTypes.func,
};

Search.defaultProps = {
    search: () => {},
};
