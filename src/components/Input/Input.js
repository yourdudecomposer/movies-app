import { Input } from 'antd';
import './Input.css';
import React from 'react';
import PropTypes from 'prop-types';

export default function Search(props) {
    const { search } = props;

    const onChange = (e) => {
        if (e.target.value !== '') search(e.target.value);
    };

    return (
        <Input
            defaultValue="oops"
            onChange={(e) => onChange(e)}
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
