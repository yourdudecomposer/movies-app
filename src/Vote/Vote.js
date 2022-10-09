import React from 'react';
import './Vote.css';
import PropTypes from 'prop-types';

function App(props) {
    const { vote } = props;
    return <div className="vote">{vote}</div>;
}
export default App;

App.defaultProps = {
    vote: -1,
};
App.propTypes = {
    vote: PropTypes.number,
};
