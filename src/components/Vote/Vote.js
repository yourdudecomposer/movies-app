import React from 'react';
import './Vote.css';
import PropTypes from 'prop-types';

function Vote(props) {
    const { vote } = props;

    const colors = {
        before3: '#E90000',
        before5: '#E97E00',
        before7: '#E9D100',
        up7: '#66E900',
    };

    const getColor = (num) => {
        const { before3, before5, before7, up7 } = colors;
        switch (true) {
            case num < 3:
                return before3;
            case num < 5:
                return before5;
            case num < 7:
                return before7;
            default:
                return up7;
        }
    };

    const color = getColor(vote);
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
