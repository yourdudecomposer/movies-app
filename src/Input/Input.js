import { Input } from 'antd';
import './Input.css';
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Search(props) {
    const { onChange, isLoaded } = props;
    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
    }, []);
    if (isLoaded) inputRef.current.blur();
    return (
        <Input
            ref={inputRef}
            onChange={onChange}
            className="input"
            placeholder="Try typing..."
        />
    );
}

Search.propTypes = {
    onChange: PropTypes.func,
    isLoaded: PropTypes.bool,
};

Search.defaultProps = {
    onChange: () => {},
    isLoaded: false,
};
