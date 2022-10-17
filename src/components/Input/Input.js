import { Input } from 'antd';
import './Input.css';
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Search(props) {
    const { onChange, isFocus } = props;
    const inputRef = useRef();
    useEffect(() => {
        if (isFocus) inputRef.current.focus();
        else if (!isFocus && window.innerWidth < 481) inputRef.current.blur();
    });

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
    isFocus: PropTypes.bool,
};

Search.defaultProps = {
    onChange: () => {},
    isFocus: true,
};
