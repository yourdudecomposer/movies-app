export default class Api {
    url = 'https://api.themoviedb.org';

    api_key = 'dc6a91030f196c7ac8aced1095b014e9';

    static async sendGetRequest(url) {
        return fetch(url).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(`Status not 200 is ${res.status}`);
        });
    }

    static async sendPostRequest(url, data) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(`Status not 200 is ${res.status}`);
        });
    }

    getGuestId = async () => {
        const url = `${this.url}/3/authentication/guest_session/new?api_key=${this.api_key}`;
        const res = await Api.sendGetRequest(url);
        if (res.success) return res.guest_session_id;
        throw new Error('Something wrong witn start guest session');
    };

    postRatedMovie = async (guestId, movieId, data) => {
        const url = `${this.url}/3/movie/${movieId}/rating?api_key=${this.api_key}&guest_session_id=${guestId}`;
        const res = await Api.sendPostRequest(url, data);
        return res;
    };

    getRatedMovies = async (guestId) => {
        const url = `${this.url}/3/guest_session/${guestId}/rated/movies?api_key=${this.api_key}&language=en-US&sort_by=created_at.asc`;
        return Api.sendGetRequest(url);
    };

    getMovies = async (query, page) => {
        const url = `${this.url}/3/search/movie?api_key=${this.api_key}&query=${query}&page=${page}`;
        return Api.sendGetRequest(url);
    };

    getGenres = async () => {
        const url = `${this.url}/3/genre/movie/list?api_key=${this.api_key}&language=en-US`;
        return Api.sendGetRequest(url);
    };
}
