import './App.css';
import React from 'react';
import { Alert, Tabs } from 'antd';
import debounce from 'lodash/debounce';

import Pagination from '../Pagination/Pagination';
import Spin from '../ui/Spin/Spin';
import Input from '../Input/Input';
import Card from '../Card/Card';
import Api from '../../services/Api/Api';
import NoResult from '../NoResult/NoResult';
import NoRated from '../NoRated/NoRated';
import MyContext from '../../context/MyContext/MyContext';

class App extends React.Component {
    state = {
        isLoading: false,
        isNoResult: false,
        query: '',
        movies: null,
        error: null,
        page: null,
        totalPages: null,
        isFocus: true,
        isError: false,
        isLoaded: false,
        guestId: '',
        ratedMovies: null,
        hasRated: false,
        genres: null,
    };

    api = new Api();

    debouncedSearch = debounce((req, page = 1) => {
        if (req) this.putMoviesToState(req, page);
    }, 1000);

    componentDidMount() {
        (async () => {
            const res = await this.api.getGenres();
            this.setState({
                genres: res,
            });
        })();
        (async () => {
            const guestId = await this.api.getGuestId();
            this.setState({
                guestId,
            });
        })();

        this.onChange({ target: { value: 'oops' } });
    }

    componentDidCatch() {
        this.setState({
            isError: true,
        });
    }

    search = (req, page = 1) => {
        if (req) this.putMoviesToState(req, page);
    };

    putMoviesToState = async (req, page) => {
        try {
            const result = await this.api.getMovies(req, page);
            const movies = result.results;
            if (movies.length > 0) {
                return this.setState({
                    isFocus: false,
                    isLoading: false,
                    isNoResult: false,
                    isLoaded: true,
                    movies,
                    page: result.page,
                    totalPages: result.total_pages,
                });
            }
            if (movies.length === 0) {
                return this.setState({
                    isLoading: false,
                    isLoaded: false,
                    isNoResult: true,
                });
            }
            throw new Error(`movies is ${movies}`);
        } catch (err) {
            if (err.message === 'Failed to fetch') {
                this.setState({
                    isLoaded: true,
                    isLoading: false,
                    error: {
                        name: 'Whooops',
                        message: 'We can`t connect each other',
                    },
                });
            } else
                this.setState({
                    isLoaded: true,
                    isLoading: false,
                    error: {
                        name: err.name,
                        message: err.message,
                    },
                });
        }
        return null;
    };

    clearAll = (e) => {
        if (e.target.value === '')
            this.setState({
                isLoaded: false,
                isLoading: false,
                isNoResult: false,
                error: null,
            });
        else
            this.setState({
                isLoading: true,
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
                isLoading: true,
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

    onChangeTab = async (key) => {
        if (key === '2') {
            const { guestId } = this.state;
            const result = await this.api.getRatedMovies(guestId);
            this.setState({
                ratedMovies: result.results,
            });
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
            isLoading,
            isNoResult,
            totalPages,
            isFocus,
            isError,
            guestId,
            ratedMovies,
            hasRated,
            genres,
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
            isLoaded && !error && !isLoading
                ? movies.map((movie) => (
                      <Card
                          key={movie.id}
                          title={movie.title}
                          posterPath={movie.poster_path}
                          releaseDate={movie.release_date}
                          overview={movie.overview}
                          vote={movie.vote_average}
                          movieId={movie.id}
                          genres={movie.genre_ids}
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
                    genres={movie.genre_ids}
                    rating={movie.rating}
                    onChangeRate={this.onChangeRate}
                />
            ));

        const spin = isLoading ? <Spin key="spin" /> : null;

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
            <MyContext.Provider value={genres}>
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
            </MyContext.Provider>
        );
    }
}

export default App;
