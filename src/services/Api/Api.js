export default class Api {
    url = 'https://api.themoviedb.org';

    urlForImg = 'https://image.tmdb.org/t/p/original';

    api_key = 'dc6a91030f196c7ac8aced1095b014e9';

    async sendGetRequest(url) {
        return fetch(url).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(`Status not 200 is ${res.status}`);
        });
    }

    async sendPostRequest(url, data) {
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

    getImg = async (posterPath) => {
        const url = `${this.urlForImg}${posterPath}`;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Status not 200 is ${res.status}`);
        }
        return res.blob();
    };

    getGuestId = async () => {
        const url = `${this.url}/3/authentication/guest_session/new?api_key=${this.api_key}`;
        const res = await this.sendGetRequest(url);
        if (res.success) return res.guest_session_id;
        throw new Error('Something wrong witn start guest session');
    };

    postRatedMovie = async (guestId, movieId, data) => {
        const url = `${this.url}/3/movie/${movieId}/rating?api_key=${this.api_key}&guest_session_id=${guestId}`;
        const res = await this.sendPostRequest(url, data);
        return res;
    };

    getRatedMovies = async (guestId) => {
        const url = `${this.url}/3/guest_session/${guestId}/rated/movies?api_key=${this.api_key}&language=en-US&sort_by=created_at.asc`;
        return this.sendGetRequest(url);
    };

    getMovies = async (query, page = 1) => {
        const url = `${this.url}/3/search/movie?api_key=${this.api_key}&query=${query}&page=${page}`;
        return this.sendGetRequest(url);
    };

    getGenres = async () => {
        const url = `${this.url}/3/genre/movie/list?api_key=${this.api_key}&language=en-US`;
        return this.sendGetRequest(url);
    };
}
