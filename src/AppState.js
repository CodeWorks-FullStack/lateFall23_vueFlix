import { reactive } from 'vue'
import { Movie } from './models/Movie.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

/** @type {Movie[]} */
  movies: [],

  /** @type {Movie} */
  activeMovie: null,

  currentPage: 1,
  totalPages: 1,
  searchedTerm: ''
})
