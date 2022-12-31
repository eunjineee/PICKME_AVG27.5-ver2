<template>
  <div>
    <SearchMovie/>
    <div>
      <div class="mainitem-blank-height"></div>
      <div v-if="isLogin">
        <!-- {{movie_randomUser_data}} -->
        <span style="display:flex">
          <h3 class="h3-m">{{movie_randomUser_data[0].nickname}}님의 PICK</h3>
          <button class="btn btn-outline-danger btn-sm mx-3" @click="random_pick">랜덤 돌려돌려</button>
        </span>
        <div v-if="movie_randomUser_data[0].pickmovies.length > 0">
          <div class="mainitem">
            <MovieCardListItem2
              v-for="movie in movie_randomUser_data[0].pickmovies"
              :key="movie.id"
              :movie="movie"
            />
          </div>
        </div>
        <div v-else>
          <h5 class="h3-m">{{movie_randomUser_data[0].nickname}}님의 PICKLIST가 없습니다. 랜덤 버튼을 눌러보세요!</h5>
        </div>
      </div>
      <div v-if="!isLogin">
        <h3>랜덤추천 - 로그인 후 PICK LIST를 둘러보세요!</h3>
        <div class="mainitem">
          <MovieCardListItem2
          v-for="movie in movie_random_pick_data"
          :key="movie.id"
          :movie="movie"
          />
        </div>
      </div>
    </div>
    <div class="mt-5 "></div>
    <div class="mainitem" style="width:2000px;">
      <div>
        <div>
          <h3 v-if="!isLogin" class="h3-m">{{ user_mbti }} 추천 영화</h3>
          <h3 v-if="isLogin" class="h3-m">{{ user_mbti }}인 {{user_nickname}}님 추천 영화</h3>
          <div class="scroll">
            <MovieCardListItem
              v-for="movie in movie_mbti_data"
              :key="movie.id"
              :movie="movie"
            />
          </div>
        </div>
      </div>
      <div>
        <div style="padding-left:200px;">
          <h3 v-if="!isLogin" class="h3-m">{{ user_age }}세 추천 영화</h3>
          <h3 v-if="isLogin" class="h3-m">{{ user_age }}세 {{ user_nickname }}님 추천 영화</h3>
          <div class="scroll">
            <MovieCardListItem
              v-for="movie in movie_age_data"
              :key="movie.id"
              :movie="movie"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="mainitem-blank-height"></div>

    <div>
      <div class="mainitem-blank-height"></div>
      <h3 class="h3-m">현재 상영작</h3>
      <div class="mainitem">
        <MovieCardListItem2
          v-for="movie in movie_latest_data"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </div>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js"></script>
<script>
import _ from 'lodash'
import MovieCardListItem from '@/components/movies/MovieCardListItem'
import MovieCardListItem2 from '@/components/movies/MovieCardListItem2'
import SearchMovie from '@/components/movies/SearchMovie'


export default {
  name: 'MovieView',
  components: {
    MovieCardListItem,
    MovieCardListItem2,
    SearchMovie,
  },
  data() {
    return {
      movie_latest_data: [],
      movie_mbti_data: [],
      movie_age_data: [],
      movie_randomUser_data: [],
      movie_random_pick_data: []
    }
  },
  created() {
    this.movie_latest
    this.mbti
    this.age
    this.movie_age
    this.random_user
    this.random_userpick
    this.movie_random_pick
  },
  computed: {
    user_mbti(){
      return this.$store.state.user.mbti
    },
    user_nickname(){
      return this.$store.state.user.nickname
    },
    user_age(){
      return this.$store.state.user.age
    },
    movies() {
      return this.$store.state.movies
    },
    username() {
      return this.$store.state.username
    },
    movie_latest() {
      this.movie_latest_data = _.sampleSize(this.$store.state.movie_latest,8)
    },
    isLogin() {
      return this.$store.getters.isLogin
    },
    movie_age() {
      this.movie_age_data = _.sampleSize(this.$store.state.movie_age,8)
    },
    mbti() {
      const mbti = this.$store.state.user.mbti
      if (mbti === 'INFJ' || mbti === 'ISTP' || mbti === 'ENFP') {
        this.movie_mbti_data = _.sampleSize(this.$store.state.movie_latest,8)
      } else if (mbti === 'ESFP' || mbti === 'ESFJ') {
        this.movie_mbti_data = _.sampleSize(this.$store.state.movies,8)
      } else {
        this.$store.dispatch('getMovieMbti', mbti)
        this.movie_mbti_data = _.sampleSize(this.$store.state.movie_mbti,8)
        }
      },
    age() {
      const age = this.$store.state.user.age
      this.$store.dispatch('getMovieage', age)
    },
    random_user() {
      this.$store.dispatch('randomUser')
    },
    random_userpick(){
      this.movie_randomUser_data = _.sampleSize(this.$store.state.users, 1)
    },
    movie_random_pick(){
      this.movie_random_pick_data = _.sampleSize(this.$store.state.movies, 8)
    }
  },
  methods: {
    random_pick(){
      this.movie_randomUser_data = []
      this.movie_randomUser_data = _.sampleSize(this.$store.state.users, 1)
    },
  }
}

</script>

<style>
#movie-nav {
  justify-content: flex-end;
  align-content: center;
  height: 80px;
}
.mainitem {
  display: flex;
  flex-direction:row nowrap;
  justify-content:flex-start;
  height:200px;
  width:100%
}

.mainitem-blank-size {
  width: 200px;
}

.mainitem-blank-height {
  height: 80px;
}

.scroll {
  overflow: auto;
  display: inline-block;
  white-space: nowrap;
  height:270px;
}

.scroll::-webkit-scrollbar {
  display: none;
}

.h3-m {
  margin-bottom: 10px;
}
</style>