<template>
  <div class="login">

    <div class="row mt-5">
      <div class="col-md-6 m-auto">
        <div class="card card-body">
          <h1 class="text-center mb-3">
            <i class="fas fa-user-plus"></i>Sign in<br>
          </h1>
          <form>
            <div class="form-group">
              <!-- <label for="name">Name</label> -->
              <input
                type="email"
                id="email"
                name="email"
                class="form-control"
                placeholder="Email"
                v-model="email"
              >
              <p class="error" v-if="errors.email">{{ errors.email.message }}</p>
            </div>

            <div class="form-group">
              <!-- <label for="name">Name</label> -->
              <input
                type="password"
                id="password"
                name="password"
                class="form-control"
                placeholder="password"
                v-model="password"
              >
              <p class="error" v-if="errors.password">{{ errors.password.message }}</p>
            </div>

            <button @click="login" type="button" class="btn btn-primary btn-block">Login</button>
            <h3 v-if="message" class="success text-center mb-3">
              {{ message }}
            </h3>
            <h3 v-if="errors.error" class="error text-center mb-3">
              {{ errors.error }}
            </h3>

          </form>
          <br>
          <div id="gSignInWrapper">
            <span class="label">Sign in with:</span>
            <div id="customBtn" class="customGPlusSignIn">
              <span class="icon"></span>
              <span class="buttonText">Google</span>
            </div>
          </div>
          <br>
          <p>
            If you don't have account?
            <router-link to="sign-up">Sign up</router-link>
          </p>
        </div>
      </div>
    </div>
<!-- 
    <h3>Sign in</h3>

    <p class="error" v-if="errors.error">{{ errors.error }}</p>
    <p class="success" v-if="message">{{ message }}</p>
    <input type="email" v-model="email" placeholder="Email">
    <br>
    <p class="error" v-if="errors.email">{{ errors.email.message }}</p>
    <input type="password" v-model="password" placeholder="Password">
    <br>
    <p class="error" v-if="errors.password">{{ errors.password.message }}</p>

    <button @click="login">Login</button>
    <br>
    <div id="gSignInWrapper">
      <span class="label">Sign in with:</span>
      <div id="customBtn" class="customGPlusSignIn">
        <span class="icon"></span>
        <span class="buttonText">Google</span>
      </div>
    </div>

    <p>
      If you don't have account?
      <router-link to="sign-up">Sign up</router-link>
    </p> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      email: "m.h.shaban128@gmail.com",
      password: "12345678",
      errors: {},
      message: "",
      auth2: {}
    };
  },
  created() {},
  mounted() {
    let ckeditor = document.createElement("script");
    ckeditor.setAttribute(
      "src",
      "https://apis.google.com/js/platform.js?onload=onLoadCallback"
    );
    document.head.appendChild(ckeditor);
    gapi.load("auth2", () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id:
          "188370687326-np8oanogjql8s8anp3mg46jqn02nabll.apps.googleusercontent.com",
        cookiepolicy: "single_host_origin",
        scope: "profile email"
      });
      this.attachSignin(document.getElementById("customBtn"));
    });
  },
  methods: {
    redirectToHome: function() {
      setTimeout(() => {
        this.$router.replace("home");
      }, 1500);
    },
    attachSignin: function(element) {
      this.auth2.attachClickHandler(
        element,
        {},
        googleUser => {
          console.log("Google Auth Response: ", googleUser);
          var id_token = googleUser.getAuthResponse().id_token;
          console.log(id_token);
          axios
            .post("http://localhost:5000/api/v1/users/login/gmail", {
              id_token: id_token
            })
            .then(response => {
              console.log(response.data.message);
              console.log(response.data.user);
              this.redirectToHome();
            })
            .catch(error => {
              console.log(error);
            });
        },
        function(error) {
          console.log(error);
        }
      );
    },
    login: function() {
      this.errors = {};
      this.message = "";
      axios
        .post("http://localhost:5000/api/v1/users/login/email", {
          password: this.password,
          email: this.email
        })
        .then(response => {
          this.message = response.data.message;
          this.redirectToHome();
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
.success {
  color: green;
}

#customBtn {
  display: inline-block;
  background: white;
  color: #444;
  width: 190px;
  border-radius: 5px;
  border: thin solid #888;
  box-shadow: 1px 1px 1px grey;
  white-space: nowrap;
}
#customBtn:hover {
  cursor: pointer;
}
span.label {
  font-family: serif;
  font-weight: normal;
}
span.icon {
  background: url("https://google-developers.appspot.com/identity/sign-in/g-normal.png")
    transparent 5px 50% no-repeat;
  display: inline-block;
  vertical-align: middle;
  width: 42px;
  height: 42px;
}
span.buttonText {
  display: inline-block;
  vertical-align: middle;
  padding-left: 42px;
  padding-right: 42px;
  font-size: 14px;
  font-weight: bold;
  /* Use the Roboto font that is loaded in the <head> */
  font-family: "Roboto", sans-serif;
}

</style>