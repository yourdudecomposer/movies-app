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
        query: '',
        movies: null,
        error: null,
        page: null,
        totalPages: null,
    };

    api = new Api();

    debouncedSearch = debounce((req, page = 1) => {
        if (req) this.putMoviesToState(req, page);
    }, 1000);

    search = (req, page = 1) => {
        if (req) this.putMoviesToState(req, page);
    };

    putMoviesToState = (req, page) => {
        this.api
            .getMovies(req, page)
            .then((result) => {
                const movies = result.results;
                if (movies.length > 0) {
                    return this.setState({
                        isSpin: false,
                        isNoResult: false,
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
                        isSpin: false,
                        error: {
                            name: 'Whooops',
                            message: 'We can`t connect each other',
                        },
                    });
                } else
                    this.setState({
                        isLoaded: true,
                        isSpin: false,
                        error: {
                            name: err.name,
                            message: err.message,
                        },
                    });
            });
    };

    clearAll = (e) => {
        if (e.target.value === '')
            this.setState({
                isLoaded: false,
                isSpin: false,
                isNoResult: false,
                error: null,
            });
        else
            this.setState({
                isSpin: true,
                isNoResult: false,
                isLoaded: false,
            });
    };

    changePage = (page) => {
        this.setState({
            page,
        });
        const { query } = this.state;
        this.search(query, page);
    };

    onChange = (e) => {
        this.clearAll(e);
        this.setState(
            {
                query: e.target.value,
            },
            () => {
                const { query } = this.state;
                this.debouncedSearch(query);
            }
        );
    };

    render() {
        const {
            isLoaded,
            movies,
            error,
            page,
            query,
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
                <Pagination
                    changePage={this.changePage}
                    current={page}
                    total={totalPages * 10}
                />
            ) : null;

        const noResult = isNoResult ? <NoResult /> : null;
        return (
            <div className="App font-face-inter">
                <div className="container">
                    <Input
                        isLoaded={isLoaded}
                        query={query}
                        onChange={this.onChange}
                    />
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
