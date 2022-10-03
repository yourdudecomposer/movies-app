export default class Api {
    url = 'https://api.themoviedb.org/3/search/movie';

    api_key = 'dc6a91030f196c7ac8aced1095b014e9';

    getMovies = async (query, page) =>
        fetch(
            `${this.url}?api_key=${this.api_key}&query=${query}&page=${page}`
        ).then((res) => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(`Status not 200 is ${res.status}`);
        });
}
