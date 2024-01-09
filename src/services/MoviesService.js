import { AppState } from "../AppState.js";
import { Movie } from "../models/Movie.js";
import { movieApi } from "./AxiosService.js";



class MoviesService{

  //NOTE gets 20 movies from the api (the api determines which 20)
  async discoverMovies(){
    console.log('🧑‍🏭🎞️');
    const response = await movieApi.get('discover/movie')
    console.log('📡🧑‍🏭🎞️', response.data);
    // NOTE the object we get back is an object with many items of importance on them
    // saving all of them into different spots in our appstate is in our best interest, not just the movies but the data about the pages too, so we can change pages later
    AppState.movies = response.data.results.map(movie => new Movie(movie)) // save movies
    AppState.currentPage = response.data.page // save our current page
    AppState.totalPages = response.data.total_pages
  }

  //NOTE gets one movie from the api, based on the id we send it. This typically has even more information about the movie on it
  async getActiveMovie(movieId){
    const response = await movieApi.get(`movie/${movieId}`)
    console.log('📡🎬', response.data);
    AppState.activeMovie = new Movie(response.data)
  }

  //NOTE gets back 20 movies based on the query (the api handles matching with the query)
  async searchMovies(searchTerm){
    const response = await movieApi(`search/movie?query=${searchTerm}`)
    console.log('📡🔍', response.data);
    AppState.searchedTerm = searchTerm
    // even our search endpoint comes back paginated, so saving the page data here to is best
    AppState.movies = response.data.results.map(movie => new Movie(movie))
    AppState.currentPage = response.data.page
    AppState.totalPages = response.data.total_pages
  }
  async clearSearch(){
    AppState.searchedTerm = ''
    await this.discoverMovies()
  }

  // NOTE change page used to take in just a number abut now, it takes in a url. This allows this function to be more flexible
  // now url can be 'discover/movie?page=2' or 'search/movie?page=2&query=lego
async changePage(url){
  const response = await movieApi.get(url)
  // async changePage(pageNumber){
  //   const response = await movieApi.get(`discover/movie?page=${pageNumber}`)
    console.log('📄📡', response.data)
    // each time we change page, the page data could change too so save this aswell
    AppState.movies = response.data.results.map(movie => new Movie(movie)) // save movies
    AppState.currentPage = response.data.page // save our current page
    AppState.totalPages = response.data.total_pages
  }


}

export const moviesService = new MoviesService()
