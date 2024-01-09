<template>
  <div class="search-bar row mt-2">

    <form @submit.prevent="searchMovies()">
      <div class="input-group">
        <!-- NOTE v-model is a TWO WAY data bound property, if the script changes it, the input will se the change, if the user types in the input, the ref value also changes -->
        <input v-model="searchTerm" class="form-control" name="search-term" id="search-movie-bar" type="text" maxlength="50" minlength="1" placeholder="search for movies...">
        <button class="btn btn-danger"><i class="mdi mdi-magnify"></i></button>
      </div>
    </form>
<div v-if="searched" class="mt-3">
  <span class="border border-primary p-2 rounded-pill"> {{ searched }} <i @click="clearSearch()" class="mdi mdi-close selectable rounded-circle" role="button"></i></span>
</div>

  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { moviesService } from '../services/MoviesService.js';
export default {
  setup(){
    const searchTerm = ref('')
  return {
    searchTerm,
    searched : computed(()=> AppState.searchedTerm),
    async searchMovies(){
      try {
        console.log(searchTerm.value);
        await moviesService.searchMovies(searchTerm.value)
        searchTerm.value = ''
      } catch (error) {
        Pop.error(error)
      }
    },
    async clearSearch(){
      try {
        await moviesService.clearSearch()
      } catch (error) {
        Pop.error(error)
      }
    }
   }
  }
};
</script>


<style lang="scss" scoped>

</style>
