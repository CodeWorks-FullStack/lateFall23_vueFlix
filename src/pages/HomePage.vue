<template>
<!-- Movies will go here{{  movies }} -->
  <div class="container">

    <SearchBar/>

    <!-- NOTE next and previous for  discover-->
    <section v-if="!searched" class="row justify-content-between align-items-baseline my-2">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage == 1" class="col-4 btn btn-info"><i class="mdi mdi-arrow-left"></i>previous</button>
      <div class="col-4 text-center text-secondary fw-bold">{{ currentPage }} <i class="mdi mdi-file-multiple"></i> {{ totalPages }}</div>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage == totalPages" class="col-4 btn btn-info">next<i class="mdi mdi-arrow-right"></i></button>
    </section>
    <!-- NOTE next and previous for our searches, they work similar but run slightly different functions -->
    <section v-else class="row justify-content-between align-items-baseline my-2">
      <button @click="changeSearchedPage(currentPage - 1)" :disabled="currentPage == 1" class="col-4 btn btn-warning"><i class="mdi mdi-arrow-left"></i>previous</button>
      <div class="col-4 text-center text-secondary fw-bold">{{ currentPage }} <i class="mdi mdi-file-multiple"></i> {{ totalPages }}</div>
      <button @click="changeSearchedPage(currentPage + 1)" :disabled="currentPage == totalPages" class="col-4 btn btn-warning">next<i class="mdi mdi-arrow-right"></i></button>
    </section>

    <section class="row my-2">

      <div v-for="movie in movies" class="col-3 mb-2">
          <!-- {{ movie.title }} -->
          <MovieCard :movieProp="movie"/>
      </div>

    </section>
    <!-- NOTE modal are hidden until opened but you STILL NEED to use the component somewhere -->
    <MovieDetailsModal/>
  </div>


</template>

<script>
import { computed, onMounted } from 'vue';
import { moviesService } from '../services/MoviesService.js';
import Pop from '../utils/Pop.js';
import {AppState} from '../AppState.js'
import MovieCard from '../components/MovieCard.vue'
import SearchBar from '../components/SearchBar.vue'
import MovieDetailsModal from '../components/MovieDetailsModal.vue';

export default {
  setup() {
    onMounted(()=>{
      // moviesService.discoverMovies() We want to wrap this in a try catch and we don't want that try catch in our onMounted
      // so we create a separate function and call that function from onmounted
      discoverMovies()
    })

    async function discoverMovies(){
      try {
        await moviesService.discoverMovies()
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      movies: computed(()=> AppState.movies),
      currentPage: computed(()=> AppState.currentPage),
      totalPages: computed(()=> AppState.totalPages),
      searched: computed(()=> AppState.searchedTerm),
      async changePage(pageNumber){
        try {
          // await moviesService.changePage(pageNumber)
          await moviesService.changePage(`discover/movie?page=${pageNumber}`)
        } catch (error) {
          Pop.error(error)
        }
      },
      async changeSearchedPage(pageNumber){
        try {
          console.log('changing search', pageNumber);
          // NOTE
          await moviesService.changePage(`search/movie?page=${pageNumber}&query=${AppState.searchedTerm}`)
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  },
  components: { MovieCard, SearchBar, MovieDetailsModal }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: clamp(500px, 50vw, 100%);

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
