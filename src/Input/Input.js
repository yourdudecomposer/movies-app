import { Input } from 'antd';
import './Input.css';
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Search(props) {
    const { onChange } = props;
    const inputRef = useRef();
    useEffect(() => {
        inputRef.current.focus();
    }, []);
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
};

Search.defaultProps = {
    onChange: () => {},
};
