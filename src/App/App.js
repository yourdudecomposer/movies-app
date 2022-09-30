import './App.css';
import React from 'react';
import { Spin, Alert } from 'antd';

import Card from '../Card/Card';
import Api from '../Api/Api';

class App extends React.Component {
    search = 'd';

    state = {
        isLoaded: false,
        movies: null,
        error: null,
    };

    api = new Api();

    componentDidMount() {
        this.putMoviesToState();
    }

    putMoviesToState = () => {
        this.api
            .getMovies(this.search)
            .then((result) => {
                const movies = result.results;
                if (movies) {
                    return this.setState({
                        isLoaded: true,
                        movies,
                    });
                }
                throw new Error(`movies is ${movies}`);
            })
            .catch((err) => {
                if (err.message === 'Failed to fetch') {
                    this.setState({
                        isLoaded: false,
                        error: {
                            name: 'Whooops',
                            message: 'We can`t connect each other',
                        },
                    });
                } else
                    this.setState({
                        isLoaded: false,
                        error: {
                            name: err.name,
                            message: err.message,
                        },
                    });
            });
    };

    render() {
        const { isLoaded, movies, error } = this.state;
        const cards =
            isLoaded && !error
                ? movies.map((movie) => (
                      <Card
                          key={movie.id}
                          title={movie.title}
                          posterPath={movie.poster_path}
                          releaseDate={movie.release_date}
                          overview={movie.overview}
                      />
                  ))
                : null;
        const spin = !isLoaded && !error ? <Spin /> : null;
        const alert = error ? (
            <Alert
                message={error.name}
                description={error.message}
                type="error"
                showIcon
                closable
            />
        ) : null;
        return (
            <div className="App font-face-inter">
                <div className="container">
                    {spin ? <div className="spin-container">{spin}</div> : null}
                    {alert}
                    {cards ? (
                        <div className="card-container">{cards}</div>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default App;
