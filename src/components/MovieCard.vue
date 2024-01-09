<template>
  <div class="movie-card selectable" role="button" data-bs-toggle="modal" data-bs-target="#movie-details-modal" @click="selectActiveMovie()">
    <img :src="movieProp.poster" :alt="movieProp.title">
    <div class="fw-bold">{{ movieProp.title }}</div>
    <div>⭐ {{movieProp.score}}</div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import { Movie } from '../models/Movie.js';
import Pop from '../utils/Pop.js';
import { moviesService } from '../services/MoviesService.js';
export default {
  // NOTE take in movie info
  props: {movieProp: {required: true, type: Movie}},
  // NOTE to use props inside your setup, setup must take props in as an parameter
  setup(props){
  return {
    async selectActiveMovie(){
      try {
        await moviesService.getActiveMovie(props.movieProp.id) // access the props value for id
      } catch (error) {
        Pop.error(error)
      }
    }
   }
  }
};
</script>


<style lang="scss" scoped>

.movie-card{
  border: 1px solid var(--bs-primary);
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  img{
    width: 100%;
  }
}

</style>
