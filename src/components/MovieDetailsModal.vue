<template>
    <!-- Modal Body -->
    <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
    <div
      class="modal fade"
      id="movie-details-modal"
      tabindex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"

      role="dialog"
      aria-labelledby="modalTitleId"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl"
        role="document"
      >
        <div class="modal-content" v-if="activeMovie">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTitleId">
              {{ activeMovie.title }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body row">
            <div class="col-6">
              <img class="img-fluid" :src="activeMovie.poster" alt="">
            </div>
            <div class="col-6">
              <i>{{ activeMovie.tagline }}</i>
              <div class="text-secondary">⭐{{ activeMovie.score }}</div>
              <p>{{ activeMovie.overview }}</p>
              <div>🕰️{{ movieRunTime }} </div>
              <div :class="{'text-danger': profit < 0, 'text-success': profit > 0}" v-if="activeMovie.revenue && activeMovie.budget"><i class="mdi mdi-cash"></i>{{ profit }}</div>
            </div>



          </div>
        </div>
      </div>
    </div>

</template>


<script>
import { AppState } from '../AppState';
import { computed, ref, onMounted } from 'vue';
export default {
  setup(){
  return {
    activeMovie : computed(()=> AppState.activeMovie),
    movieRunTime: computed(()=> {
      let hours = Math.floor(AppState.activeMovie.runtime/60)
      let minutes = AppState.activeMovie.runtime % 60
      return `${hours}h ${minutes}m`
    }),
    profit: computed(()=> {
      let movie = AppState.activeMovie
      return movie.revenue - movie.budget
    })
   }
  }
};
</script>


<style lang="scss" scoped>

</style>
