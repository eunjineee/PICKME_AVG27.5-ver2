<template>
  <div>
    <b-form-input
      size="sm"
      class="mr-sm-2"
      v-model="inputData"
      placeholder="영화를 검색해보세요"
      v-on:keyup.enter="searchMovie"
    ></b-form-input>
    <b-button size="sm" class="my-2 my-sm-0" type="submit" @click="searchMovie"
      >Search</b-button
    >
    <div v-if="issearch">
      <div class="mainitem-blank-height"></div>
      <h3 class="h3-m">검색 결과</h3>
      <div class="mainitem">
        <MovieCardListItem2
          v-for="movie in movie_search"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </div>
  </div>
</template>
  
  <script src="https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js"></script>
  <script>
import _ from "lodash";
import MovieCardListItem2 from "@/components/movies/MovieCardListItem2";

export default {
  name: "SearchMovie",
  components: {
    MovieCardListItem2,
  },
  created() {
    issearch = false;
  },
  data() {
    return {
      inputData: null,
      issearch: false,
    };
  },
  computed: {
    movie_search() {
      return this.$store.state.search_movie;
    },
  },
  methods: {
    searchMovie() {
      const content = this.inputData;
      if (content != null) {
        this.$store.dispatch("SearchMovie", content);
        this.inputData = "";
        this.issearch = true;
      }
    },
  },
};
</script>
  
  <style>
</style>