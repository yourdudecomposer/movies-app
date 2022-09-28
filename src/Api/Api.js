export default class Api {
    url = 'https://api.themoviedb.org/3/search/movie';

    api_key = 'dc6a91030f196c7ac8aced1095b014e9';

    searchMovie = async (query) => {
        const res = await fetch(
            `${this.url}?api_key=${this.api_key}&query=${query}`
        );
        if (!res.ok) {
            throw new Error(
                `Could not found fetch ${query}, received ${res.status}`
            );
        }
        return res.json();
    };

    getResults = async (query) => {
        const res = await this.searchMovie(query);
        return res.results;
    };
}
