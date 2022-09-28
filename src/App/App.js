import './App.css';
import React from 'react';

import Card from '../Card/Card';
import Api from '../Api/Api';

class App extends React.Component {
    state = {
        isLoaded: false,
        movies: null,
    };

    api = new Api();

    componentDidMount() {
        this.putMoviesToState();
    }

    putMoviesToState = () => {
        this.api.getResults('return').then((movies) => {
            this.setState({
                isLoaded: true,
                movies,
            });
        });
    };

    render() {
        const { isLoaded, movies } = this.state;
        let cards;
        if (!isLoaded) {
            cards = null;
        } else {
            cards = movies.map((movie) => (
                <Card
                    key={movie.id}
                    title={movie.title}
                    posterPath={movie.poster_path}
                    releaseDate={movie.release_date}
                    overview={movie.overview}
                />
            ));
        }
        return (
            <div className="App font-face-inter">
                <div className="container">{cards}</div>
            </div>
        );
    }
}

export default App;
