import { Input } from 'antd';
import './Input.css';
import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function Search(props) {
    const { clearAll, debouncedSearch, isFocus } = props;

    const [query, setQuery] = useState('list');

    const onChange = (e) => {
        setQuery(e.target.value);
        clearAll(e);
        debouncedSearch(query);
    };

    const inputRef = useRef();
    useEffect(() => {
        if (isFocus) inputRef.current.focus();
        else if (!isFocus && window.innerWidth < 481) inputRef.current.blur();
    });

    useEffect(() => {
        debouncedSearch(query);
    }, []);

    return (
        <Input
            ref={inputRef}
            onChange={(e) => onChange(e)}
            className="input"
            placeholder="Try typing..."
            value={query}
        />
    );
}

Search.propTypes = {
    debouncedSearch: PropTypes.func,
    clearAll: PropTypes.func,
    isFocus: PropTypes.bool,
};

Search.defaultProps = {
    clearAll: () => {},
    debouncedSearch: () => {},
    isFocus: true,
};
