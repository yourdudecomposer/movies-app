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
        isLoading: true,
        movies: [],
        page: null,
        totalPages: null,
        isError: false,
        guestId: '',
        query: '',
        ratedMovies: [],
        genres: null,
    };

    api = new Api();

    componentDidMount() {
        (async () => {
            try {
                const res = await this.api.getGenres();
                this.setState({
                    genres: res,
                });
            } catch (error) {
                this.setState({
                    isLoading: false,
                    isError: true,
                });
            }
        })();

        (async () => {
            try {
                const guestId = await this.api.getGuestId();
                this.setState({
                    guestId,
                });
            } catch (error) {
                this.setState({
                    isLoading: false,
                    isError: true,
                });
            }
        })();
        this.search('list');
    }

    componentDidCatch() {
        this.setState({
            isError: true,
        });
    }

    search = async (req, page = 1) => {
        this.setState({
            isLoading: true,
            query: req,
        });
        try {
            const result = await this.api.getMovies(req, page);
            this.putResultToState(result);
        } catch (err) {
            this.setState({
                isLoading: false,
                isError: true,
            });
        }
    };

    putResultToState = (result) => {
        const movies = result.results;
        return this.setState({
            isLoading: false,
            movies,
            page: result.page,
            totalPages: result.total_pages,
        });
    };

    changePage = (page) => {
        setTimeout(() => {
            this.setState({
                page,
            });
            this.setState({
                isLoading: true,
            });
            const { query } = this.state;

            this.search(query, page);
        }, 300);
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
        const data = {
            value: rate,
        };
        const { guestId } = this.state;
        this.api.postRatedMovie(guestId, movieId, data);
    };

    render() {
        const {
            movies,
            page,
            isLoading,
            totalPages,
            isError,
            guestId,
            ratedMovies,
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
        const cards = !isLoading
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
            ratedMovies.length > 0
                ? ratedMovies.map((movie) => (
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
                  ))
                : null;

        const spin = isLoading ? <Spin key="spin" /> : null;

        const pagination =
            totalPages > 1 && !isLoading ? (
                <Pagination
                    key="pages"
                    changePage={this.changePage}
                    current={page}
                    total={totalPages * 10}
                />
            ) : null;

        const noResult =
            movies.length === 0 && !isLoading ? (
                <NoResult key="no Results" />
            ) : null;

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
                                            search={debounce(this.search, 1000)}
                                            key="input"
                                            clearAll={this.clearAll}
                                            putResultToState={
                                                this.putResultToState
                                            }
                                        />,
                                        spin,
                                        noResult,
                                        cards ? (
                                            <main
                                                key="cards"
                                                className="card-container"
                                            >
                                                {cards}
                                            </main>
                                        ) : null,
                                        pagination,
                                    ],
                                },
                                {
                                    label: `Rated`,
                                    key: '2',
                                    children: [
                                        ratedCards ? (
                                            <main
                                                key="ratedCards"
                                                className="card-container"
                                            >
                                                {ratedCards}
                                            </main>
                                        ) : (
                                            <NoRated key="no rated" />
                                        ),
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
