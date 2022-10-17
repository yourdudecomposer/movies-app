import React from 'react';
import './Vote.css';
import PropTypes from 'prop-types';

function Vote(props) {
    const { vote } = props;
    const before3 = '#E90000';
    const before5 = '#E97E00';
    const before7 = '#E9D100';
    const up7 = '#66E900';
    const color = (() => {
        switch (true) {
            case vote < 3:
                return before3;
            case vote < 5:
                return before5;
            case vote < 7:
                return before7;
            default:
                return up7;
        }
    })();
    const borderColor = {
        border: `solid ${color}`,
    };
    return (
        <div style={borderColor} className="vote">
            {vote.toFixed(1)}
        </div>
    );
}
export default Vote;

Vote.defaultProps = {
    vote: -1,
};
Vote.propTypes = {
    vote: PropTypes.number,
};
