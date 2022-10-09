import React from 'react';
import './Vote.css';

function App(props) {
    const { vote } = props;
    return <div className="vote">{vote}</div>;
}
export default App;
