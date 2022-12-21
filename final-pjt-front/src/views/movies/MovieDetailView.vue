<template>
  <div style="margin-left: 20px">
    <div>
      <div class="upper">
        <!-- <div class="videotrailer"> -->
        <YoutubeCard :movie_title="movie_title" />
        <!-- </div> -->
        <!-- <img class="upper-img img-center" :src="imgUrl" alt="..." /> -->
      </div>
      <img class="poster" :src="imgUrl" alt="..." />

      <div class="fontbox">
        <h1>{{ movie?.title }}</h1>
        <h2>개봉 날짜 : {{ movie?.release_date }}</h2>
        <h3>평점 : {{ movie?.vote_average }}</h3>
        <p class="summary-text">{{ movie?.overview }}</p>
      </div>
    </div>
    <div class="detailcontainer">
      <div class="button-box" style="">
        <div style="margin-top: 30px; margin-left: 20px">
          <span v-if="!pick" @click="choosepick"
            ><span class="button btnPush btnBlueGreen">PICK</span></span
          >
          <span v-if="pick" @click="choosepick"
            ><span class="button btnPush btnBlueGreen">UNPICK</span></span
          >
        </div>
        <div style="margin-top: 30px">
          <span v-if="!wish" @click="choosewish"
            ><span class="button btnPush btnBlueGreen">WISH</span></span
          >
          <span v-if="wish" @click="choosewish"
            ><span class="button btnPush btnBlueGreen">UNWISH</span></span
          >
        </div>
      </div>

      <div></div>
    </div>

    <!-- <div class="videotrailer">
        <YoutubeCard :movie_title="movie_title" />
      </div> -->
    <br />
    <ReviewList class="reviewsize" :movieId="movie.id"></ReviewList>
    <br />
  </div>
</template>

<script>
import axios from "axios";
const API_URL = "http://127.0.0.1:8000";

import ReviewList from "@/components/movies/ReviewList";
import YoutubeCard from "@/components/movies/YoutubeCard";

export default {
  name: "MovieDetailView",
  components: {
    ReviewList,
    YoutubeCard,
  },
  data() {
    return {
      movie: null,
      movie_title: null,
      wish: false,
      pick: false,
    };
  },
  computed: {
    movies() {
      return this.$store.state.movies;
    },
    imgUrl() {
      return `https://image.tmdb.org/t/p/w500/${this.movie.poster_path}`;
    },
    token() {
      return this.$store.state.token;
    },
  },
  created() {
    this.getmovielatest();
    this.getMovieById(this.$route.params.id);
    this.getWishStatus(this.$route.params.id);
    this.getPickStatus(this.$route.params.id);
  },
  methods: {
    getMovieById(id) {
      console.log(id);
      for (const movie of this.movies) {
        if (movie.id === Number(id)) {
          this.movie = movie;
          this.movie_title = movie.title;
          console.log(this.movie);
          break;
        }
      }
    },
    getmovielatest() {
      // const movie_length = this.$store.movie_latest
      this.$store.dispatch("getMovieLatest");
    },
    getWishStatus(id) {
      axios({
        method: "get",
        url: `${API_URL}/movies/${id}/wishmovies/`,
        headers: {
          Authorization: `Token ${this.token}`,
        },
      }).then((res) => {
        this.wish = res.data;
      });
    },
    getPickStatus(id) {
      axios({
        method: "get",
        url: `${API_URL}/movies/${id}/pickmovies/`,
        headers: {
          Authorization: `Token ${this.token}`,
        },
      }).then((res) => {
        this.pick = res.data;
      });
    },
    choosewish() {
      const id = this.$route.params.id;
      axios({
        method: "post",
        url: `${API_URL}/movies/${id}/wishmovies/`,
        headers: {
          Authorization: `Token ${this.token}`,
        },
      }).then((res) => {
        this.wish = res.data;
      });
    },
    choosepick() {
      const id = this.$route.params.id;
      axios({
        method: "post",
        url: `${API_URL}/movies/${id}/pickmovies/`,
        headers: {
          Authorization: `Token ${this.token}`,
        },
      }).then((res) => {
        this.pick = res.data;
      });
    },
  },
};
</script>

<style>
.upper {
  /* background-color: darkgray; */
  margin-top: -55px;
  width: 95%;
  /* height: 300px; */
  /* font-size: 200px; */
  z-index: 0;
  opacity: 0.5;
  pointer-events: none;
}

/* .upper-img {
  width: 95%;
  height: 750px;
  opacity: 0.3;
  overflow: hidden;
  z-index: 1;
} */

.poster {
  margin-top: -400px;
  /* margin-bottom: 50px; */
  margin-left: 74%;
  /* z-index: 50 !important; */
  width: 20%;
  /* height: 450px; */
  border-right: 2px solid;
  border-bottom: 2px solid;
  border-radius: 4px;
  /* opacity: 1 !important; */
  position: relative;
  /* border-image: linear-gradient(45deg, red, orange, yellow, green, blue) 10; */
  /* flex-direction: row-reverse; */
}

.fontbox {
  /* width: 800px; */
  height: 200px;
  margin-top: -320px;
  margin-left: 30px;
  position: relative;
  /* z-index: 2; */
  color: antiquewhite;
}

.detailcontainer {
  width: 95%;
  margin-top: 50px;
  /* padding-top: 50px; */
  margin-bottom: 20px;
}

.GradientBorder {
  position: relative;
  width: 100%;
  padding: 10px;
  margin-top: 50px;
  border: 2px solid;
  border-radius: 4px;
  /* border-image: linear-gradient(45deg, red, orange, yellow, green, blue) 10; */
  /* font-size: 16px; */
  /* color: #fff; */
  /* text-align: start; */
  /* letter-spacing: 5px; */
  /* background: #020117; */
}

.videotrailer {
  /* width: 90%; */
}

.summary-text {
  width: 60%;
  /* white-space: nowrap; */
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 2.5em;
}

.button-box {
  display: flex;
}

/* .bgposter {
  display: block;
  position: absolute;
} */

/* .bg-overlay {
  display: block;
  position: absolute;
  top: 0;
  min-height: 150vh;
  content: " ";
  z-index: 3;
  backface-visibility: hidden;
  background: black;
  background: linear-gradient(77deg, rgba(0, 0, 0, 0.6), transparent 85%);
  opacity: 1;
} */

.reviewsize {
  width: 95%;
}
</style>