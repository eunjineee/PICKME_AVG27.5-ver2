<template>
  <div>
    <div class="signup-card">
      <div style="text-align:center">
        <img src="@/assets/PICME3.png" alt="">
      </div>
      <div class="signup-card-div">
        <b-form @submit.prevent="signUp" @reset="onReset">
          <div class="signup-card-div-input mt-1">
            <b-form-group id="input-group-1" label="Your ID: " label-for="input-1">
              <b-form-input
                id="input-1"
                v-model="payload.username"
                type="text"
                :state="validation1"
                placeholder="Enter your ID"
                required
              ></b-form-input>
              <b-form-invalid-feedback :state="validation1">
                ID는 5~12글자여야 합니다.
              </b-form-invalid-feedback>
              <b-form-valid-feedback :state="validation1">
                <br>
              </b-form-valid-feedback>
            </b-form-group>
      
            <b-form-group id="input-group-2" label="Your Name: " label-for="input-2">
              <b-form-input
                id="input-2"
                v-model="payload.nickname"
                type="text"
                :state="validation2"
                placeholder="Enter your nickname"
                required
              ></b-form-input>
              <b-form-invalid-feedback :state="validation2">
                이름은 2~13글자여야 합니다.
              </b-form-invalid-feedback>
              <b-form-valid-feedback :state="validation2">
                <br>
              </b-form-valid-feedback>
            </b-form-group>
      
            <b-form-group id="input-group-3" label="Password: " label-for="input-3">
              <b-form-input
                id="input-3"
                type="password"
                placeholder="Enter your Password"
                :state="validation3"
                v-model="payload.password1"
                required
              ></b-form-input>
              <b-form-invalid-feedback :state="validation3">
                비밀번호는 4~12자리 이내로 입력해주세요
              </b-form-invalid-feedback>
              <b-form-valid-feedback :state="validation3">
                <br>
              </b-form-valid-feedback>
            </b-form-group>
      
            <b-form-group id="input-group-4" label="Password Check: " label-for="input-4">
              <b-form-input
                id="input-4"
                type="password"
                v-model="payload.password2"
                :state="validation4"
                placeholder="Enter your Password Again"
                required
                description="password를 다시 입력해주세요."
              ></b-form-input>
              <b-form-invalid-feedback :state="validation4">
                비밀번호가 위와 일치하지 않습니다.
              </b-form-invalid-feedback>
              <b-form-valid-feedback :state="validation4">
                <br>
              </b-form-valid-feedback>
            </b-form-group>
            <b-form-group id="input-group-6" label="Age: " label-for="input-6">
              <b-form-input
              id="input-6"
              type="number"
              placeholder="20" 
              min="0"
              :state="validation5" 
              max="130"
              v-model="payload.age"
              required
              ></b-form-input>
            </b-form-group>
  
            <b-form-group id="input-group-5" label="MBTI: " label-for="input-5">
              <b-form-select
                id="input-5"
                v-model="payload.mbti"
                :options="options"
                required
              ></b-form-select>
            </b-form-group>
            <b-form-group>
              <img :src="preview" alt="img가 없습니다.">
              <label for="img"> Profile IMG:  </label>
              <br>
              <input type="file" onchange="previewFile()" ref="doc" id="img" @change="findImg"> 
            </b-form-group>
            <div class="m-3"></div>
            <div>
              <b-button style="width:90%" type="submit" variant="primary">SIGN UP</b-button>
              <b-button style="width:10%%" type="reset" variant="danger">Reset</b-button>
            </div>
          </div>
        </b-form>
        <SignupModal v-if="showModal" @close="showModal = false" :errMessage="errMessage">
          <h3 class="modal-header-h3" slot="header">
            알림!
          </h3>
          <div slot="body">{{errMessage}}</div>
        </SignupModal>
      </div>
    </div>
  </div>
</template>

<script>
import SignupModal from "@/components/profiles/SignupModal.vue"
export default {
  name: 'SignUpView',
  components: {
    SignupModal,
  },
  data() {
    return {
      payload: {
        username: '',
        password1: '',
        password2: '',
        profile_img: '',
        nickname: '',
        age: 0,
        mbti: null,
      },
      options: [{ text: 'Select One', value: null }, 'ESTJ','ESFJ','ENTJ','ENFJ','ESTP','ESFP','ENTP','ENFP','ISTJ','ISFJ','INTJ','INFJ','ISTP','ISFP','INTP','INFP'],   
      showModal: false,
      errMessage: '',
      preview: '',
    }
  },
  computed: {
    validation1() {
      return this.payload.username.length > 4 && this.payload.username.length <13
    },
    validation2() {
      return this.payload.nickname.length > 1 && this.payload.nickname.length <13
    },
    validation3() {
      return this.payload.password1.length > 3 && this.payload.nickname.length <12
    },
    validation4() {
      return this.payload.password1 === this.payload.password2 && this.payload.password2.length > 3
    },
    validation5() {
      return this.payload.age > 0 && this.payload.age<=130
    },
  },
  methods: {
    findImg(event) {
      let payload = this.payload;
      let reader = new FileReader()
      reader.onload = function(event) {
        payload.profile_img = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0])
      this.preview = payload.profile_img
    },
    signUp() {
      const pw = this.payload.password1
      const num = pw.search(/[0-9]/g);
      const eng = pw.search(/[a-z]/ig);
      const spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);
      // console.log(this.payload)
      const payload = this.payload
      if (this.validation1 === false) {
        this.errMessage="ID를 작성해주세요"
        this.showModal=true
      } else if(this.validation2 === false) {
        this.errMessage="이름을 작성해주세요"
        this.showModal=true
      } else if(this.validation3 === false) {
        this.errMessage="비밀번호를 작성해주세요"
        this.showModal=true
      } else if(pw.search(/\s/) != -1) {
        this.errMessage="비밀번호는 공백 없이 입력해주세요"
        this.showModal=true
      } else if(num <0 || eng <0 || spe <0) {
        this.errMessage="비밀번호는 영문,숫자,특수문자를 혼합하여 입력해주세요"
        this.showModal=true
      } else if(this.validation4 === false) {
        this.errMessage="비밀번호가 일치하지 않습니다"
        this.showModal=true
      } else if(this.validation5 === false) {
        this.errMessage="나이를 기입해주세요"
        this.showModal=true
      } else if(this.payload.mbti === null) {
        this.errMessage="mbti를 선택해주세요"
        this.showModal=true
      } else if(this.payload.profile_img === '') {
        this.errMessage="사진을 넣어주세요"
        this.showModal=true
      } else {
        this.$store.dispatch('signUp', payload)
      }
    },
    onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.payload.username = ''
        this.payload.password1 = ''
        this.payload.password2 = ''
        this.payload.profile_img = ''
        this.payload.nickname = ''
        this.payload.age = 0
        this.payload.mbti =null
        // Trick to reset/clear native browser form validation state
    }
  }
}
</script>
<style>
.signup-card {
  margin: 0 auto;
  margin-top: 100px;
  height: 100vh;
}
.signup-card-div {
  padding: 25px;
  margin: 0 auto;
  min-height: auto;
  min-width: 700px;
  height: 510px;
  width: 900px;
  background-color: #D9D9D9;
  border-radius: 10px;
}
.signup-card-div-input {
  margin: 0 auto;
  min-height: 300px;
  min-width: 600px;
  height: 350px;
  width: 850px;
}

.modal-header-h3 {
  margin-top:0;
  color: #42b983;
}
</style>