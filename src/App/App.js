import './App.css';
import React from 'react';
import { Alert } from 'antd';
import debounce from 'lodash/debounce';

import Pagination from '../Pagination/Pagination';
import Spin from '../Spin/Spin';
import Input from '../Input/Input';
import Card from '../Card/Card';
import Api from '../Api/Api';
import NoResult from '../NoResult/NoResult';

class App extends React.Component {
    state = {
        isSpin: false,
        isLoaded: false,
        isNoResult: false,
        movies: null,
        error: null,
        page: null,
        totalPages: null,
    };

    api = new Api();

    debouncedSearch = debounce(this.search, 1000);

    search = (req) => {
        this.setState({
            isSpin: true,
        });
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
                if (movies.length > 0) {
                    return this.setState({
                        isSpin: false,
                        isLoaded: true,
                        movies,
                        page: result.page,
                        totalPages: result.total_pages,
                    });
                }
                if (movies.length === 0) {
                    return this.setState({
                        isSpin: false,
                        isLoaded: false,
                        isNoResult: true,
                    });
                }
                throw new Error(`movies is ${movies}`);
            })
            .catch((err) => {
                if (err.message === 'Failed to fetch') {
                    this.setState({
                        isLoaded: true,
                        error: {
                            isSpin: false,
                            name: 'Whooops',
                            message: 'We can`t connect each other',
                        },
                    });
                } else
                    this.setState({
                        isLoaded: true,
                        error: {
                            isSpin: false,
                            name: err.name,
                            message: err.message,
                        },
                    });
            });
    };

    render() {
        const {
            isLoaded,
            movies,
            error,
            page,
            isSpin,
            isNoResult,
            totalPages,
        } = this.state;
        const cards =
            isLoaded && !error && !isSpin
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

        const spin = isSpin ? <Spin /> : null;

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

        const noResult = isNoResult ? <NoResult /> : null;
        return (
            <div className="App font-face-inter">
                <div className="container">
                    <Input search={this.debouncedSearch} />
                    {spin}
                    {alert}
                    {noResult}
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
