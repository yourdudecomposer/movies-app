import React from 'react';
import './Vote.css';
import PropTypes from 'prop-types';

function App(props) {
    const { vote } = props;
    const before3 = '#E90000';
    const before5 = '#E97E00';
    const before7 = '#E9D100';
    const up7 = '#66E900';
    const color = (() => {
        if (vote < 3) return before3;
        if (vote < 5) return before5;
        if (vote < 7) return before7;
        return up7;
    })();
    const borderColor = {
        border: `solid ${color}`,
    };
    return (
        <div style={borderColor} className="vote">
            {vote}
        </div>
    );
}
export default App;

App.defaultProps = {
    vote: -1,
};
App.propTypes = {
    vote: PropTypes.number,
};
