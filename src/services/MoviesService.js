import { AppState } from "../AppState.js";
import { Movie } from "../models/Movie.js";
import { movieApi } from "./AxiosService.js";



class MoviesService{

  async discoverMovies(){
    console.log('🧑‍🏭🎞️');
    const response = await movieApi.get('discover/movie')
    console.log('📡🧑‍🏭🎞️', response.data);
    AppState.movies = response.data.results.map(movie => new Movie(movie)) // save movies
    AppState.currentPage = response.data.page // save our current page
    AppState.totalPages = response.data.total_pages
  }

  async getActiveMovie(movieId){
    const response = await movieApi.get(`movie/${movieId}`)
    console.log('📡🎬', response.data);
    AppState.activeMovie = new Movie(response.data)
  }

  async searchMovies(searchTerm){
    const response = await movieApi(`search/movie?query=${searchTerm}`)
    console.log('📡🔍', response.data);
    AppState.searchedTerm = searchTerm
    AppState.movies = response.data.results.map(movie => new Movie(movie))
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.total_pages
  }
  async clearSearch(){
    AppState.searchedTerm = ''
    await this.discoverMovies()
  }

async changePage(url){
  const response = await movieApi.get(url)
  // async changePage(pageNumber){
  //   const response = await movieApi.get(`discover/movie?page=${pageNumber}`)
    console.log('📄📡', response.data)
    AppState.movies = response.data.results.map(movie => new Movie(movie)) // save movies
    AppState.currentPage = response.data.page // save our current page
    AppState.totalPages = response.data.total_pages
  }


}

export const moviesService = new MoviesService()
