import './App.css';
import React from 'react';
import { Alert } from 'antd';

import Pagination from '../Pagination/Pagination';
import Spin from '../Spin/Spin';
import Input from '../Input/Input';
import Card from '../Card/Card';
import Api from '../Api/Api';

class App extends React.Component {
    state = {
        isSpin: false,
        isLoaded: false,
        movies: null,
        error: null,
        page: null,
        totalPages: null,
    };

    api = new Api();

    search = (req) => {
        if (req) this.putMoviesToState(req);
        else {
            this.setState({
                isLoaded: false,
                isSpin: false,
            });
        }
    };

    putMoviesToState = (req) => {
        this.api
            .getMovies(req)
            .then((result) => {
                const movies = result.results;

                if (movies) {
                    return this.setState({
                        isLoaded: true,
                        movies,
                        page: result.page,
                        totalPages: result.total_pages,
                    });
                }
                throw new Error(`movies is ${movies}`);
            })
            .catch((err) => {
                if (err.message === 'Failed to fetch') {
                    this.setState({
                        isLoaded: true,
                        error: {
                            name: 'Whooops',
                            message: 'We can`t connect each other',
                        },
                    });
                } else
                    this.setState({
                        isLoaded: true,
                        error: {
                            name: err.name,
                            message: err.message,
                        },
                    });
            });
    };

    render() {
        const { isLoaded, movies, error, page, isSpin, totalPages } =
            this.state;
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
        const spin = !isLoaded && !error && isSpin ? <Spin /> : null;
        const alert = error ? (
            <Alert
                message={error.name}
                description={error.message}
                type="error"
                showIcon
                closable
            />
        ) : null;
        const pagination =
            isLoaded && totalPages > 1 ? (
                <Pagination current={page} total={totalPages * 10} />
            ) : null;
        return (
            <div className="App font-face-inter">
                <div className="container">
                    <Input search={this.search} />
                    {spin}
                    {alert}
                    {cards ? (
                        <div className="card-container">{cards}</div>
                    ) : null}
                    {pagination}
                </div>
            </div>
        );
    }
}

export default App;
