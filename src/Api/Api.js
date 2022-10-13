export default class Api {
    url = 'https://api.themoviedb.org';

    api_key = 'dc6a91030f196c7ac8aced1095b014e9';

    makeGuestSession = async () =>
        fetch(
            `${this.url}/3/authentication/guest_session/new?api_key=${this.api_key}`
        )
            .then((res) => {
                if (res.ok) return res.json();
                throw new Error(`Status not 200 is ${res.status}`);
            })
            .then((res) => {
                if (!res.success)
                    throw new Error('Something wrong witn start guest session');
                return res.guest_session_id;
            });

    postRatedMovie = async (guestId, movieId, data) => {
        fetch(
            `${this.url}/3/movie/${movieId}/rating?api_key=${this.api_key}&guest_session_id=${guestId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            }
        ).then((res) => {
            if (res.ok) return res.json();
            throw new Error(`Something wrong witn send rate`);
        });
    };

    getRatedMovies = async (guestId) =>
        fetch(
            `${this.url}/3/guest_session/${guestId}/rated/movies?api_key=${this.api_key}&language=en-US&sort_by=created_at.asc`
        ).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(`Something wrong with getRatedMovies`);
        });

    getMovies = async (query, page) =>
        fetch(
            `${this.url}/3/search/movie?api_key=${this.api_key}&query=${query}&page=${page}`
        ).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(`Status not 200 is ${res.status}`);
        });

    getGenres = async () =>
        fetch(
            `${this.url}/3/genre/movie/list?api_key=${this.api_key}&language=en-US`
        ).then((res) => res.json());
}
