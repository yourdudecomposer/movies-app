import './App.css';
import React from 'react';
import { Alert, Tabs } from 'antd';
import debounce from 'lodash/debounce';

import Pagination from '../Pagination/Pagination';
import Spin from '../Spin/Spin';
import Input from '../Input/Input';
import Card from '../Card/Card';
import Api from '../Api/Api';
import NoResult from '../NoResult/NoResult';
import NoRated from '../NoRated/NoRated';

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
        isFocus: true,
        isError: false,
        guestId: '',
        ratedMovies: null,
        hasRated: false,
    };

    api = new Api();

    debouncedSearch = debounce((req, page = 1) => {
        if (req) this.putMoviesToState(req, page);
    }, 1000);

    componentDidMount() {
        this.api.makeGuestSession().then((guestId) =>
            this.setState({
                guestId,
            })
        );
    }

    componentDidCatch() {
        this.setState({
            isError: true,
        });
    }

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
                        isFocus: false,
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
        setTimeout(() => {
            this.setState({
                page,
            });
            const { query } = this.state;
            this.setState({
                isSpin: true,
                isNoResult: false,
                isLoaded: false,
            });
            this.search(query, page);
        }, 300);
    };

    onChange = (e) => {
        this.clearAll(e);
        this.setState(
            {
                isFocus: true,
                query: e.target.value,
            },
            () => {
                const { query } = this.state;
                this.debouncedSearch(query);
            }
        );
    };

    onChangeTab = (key) => {
        if (key === '2') {
            const { guestId } = this.state;
            this.api
                .getRatedMovies(guestId)
                .then((res) => res.results)
                .then((res) =>
                    this.setState({
                        ratedMovies: res,
                    })
                );
        }
    };

    onChangeRate = (rate, movieId) => {
        this.setState({
            hasRated: true,
        });
        const data = {
            value: rate,
        };
        const { guestId } = this.state;
        this.api.postRatedMovie(guestId, movieId, data);
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
            isFocus,
            isError,
            guestId,
            ratedMovies,
            hasRated,
        } = this.state;

        if (isError) {
            return (
                <Alert
                    message="SOMETHING GO WRONG!!!"
                    description="("
                    type="error"
                    showIcon
                />
            );
        }
        const cards =
            isLoaded && !error && !isSpin
                ? movies.map((movie) => (
                      <Card
                          key={movie.id}
                          title={movie.title}
                          posterPath={movie.poster_path}
                          releaseDate={movie.release_date}
                          overview={movie.overview}
                          vote={movie.vote_average}
                          movieId={movie.id}
                          onChangeRate={this.onChangeRate}
                      />
                  ))
                : null;
        const ratedCards =
            ratedMovies !== null &&
            ratedMovies.map((movie) => (
                <Card
                    key={movie.id}
                    title={movie.title}
                    posterPath={movie.poster_path}
                    releaseDate={movie.release_date}
                    overview={movie.overview}
                    vote={movie.vote_average}
                    guestId={guestId}
                    movieId={movie.id}
                    rating={movie.rating}
                />
            ));

        const spin = isSpin ? <Spin key="spin" /> : null;

        const alert = error ? (
            <Alert
                key="alert"
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
                    key="pages"
                    changePage={this.changePage}
                    current={page}
                    total={totalPages * 10}
                />
            ) : null;

        const noResult = isNoResult ? <NoResult key="no Results" /> : null;
        return (
            <div className="App font-face-inter">
                <div className="container">
                    <Tabs
                        className="tabs"
                        defaultActiveKey="1"
                        onChange={this.onChangeTab}
                        items={[
                            {
                                label: `Search`,
                                key: '1',
                                children: [
                                    <Input
                                        key="input"
                                        isFocus={isFocus}
                                        query={query}
                                        onChange={this.onChange}
                                    />,
                                    spin,
                                    alert,
                                    noResult,
                                    cards ? (
                                        <div
                                            key="cards"
                                            className="card-container"
                                        >
                                            {cards}
                                        </div>
                                    ) : null,
                                    pagination,
                                ],
                            },
                            {
                                label: `Rated`,
                                key: '2',
                                children: [
                                    hasRated && ratedCards.length === 0 ? (
                                        <Spin key="spin" />
                                    ) : null,
                                    !hasRated ? (
                                        <NoRated key="no rated" />
                                    ) : null,
                                    alert,
                                    ratedCards.length > 0 ? (
                                        <div
                                            key="ratedCards"
                                            className="card-container"
                                        >
                                            {ratedCards}
                                        </div>
                                    ) : null,
                                ],
                            },
                        ]}
                    />
                </div>
            </div>
        );
    }
}

export default App;
