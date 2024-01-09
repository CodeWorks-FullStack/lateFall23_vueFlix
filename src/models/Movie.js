

export class Movie{
  constructor(data){
    this.id = data.id
    this.title = data.original_title || data.title
    this.overview = data.overview
    this.releaseDate = new Date(data.release_date)
    this.popularity = data.popularity
    this.score = data.vote_average
    this.poster = 'https://image.tmdb.org/t/p/original' + data.poster_path
    this.backdrop = 'https://image.tmdb.org/t/p/original' + data.backdrop_path

    // note properties on get movie details
    this.budget = data.budget
    this.tagline = data.tagline
    this.revenue = data.revenue
    this.runtime = data.runtime
  }
}

/**{
    "adult": false,
    "backdrop_path": "/r9oTasGQofvkQY5vlUXglneF64Z.jpg",
    "genre_ids": [
        28,
        35
    ],
    "id": 1029575,
    "original_language": "en",
    "original_title": "The Family Plan",
    "overview": "Dan Morgan is many things: a devoted husband, a loving father, a celebrated car salesman. He's also a former assassin. And when his past catches up to his present, he's forced to take his unsuspecting family on a road trip unlike any other.",
    "popularity": 3089.182,
    "poster_path": "/a6syn9qcU4a54Lmi3JoIr1XvhFU.jpg",
    "release_date": "2023-12-14",
    "title": "The Family Plan",
    "video": false,
    "vote_average": 7.4,
    "vote_count": 632
} */
