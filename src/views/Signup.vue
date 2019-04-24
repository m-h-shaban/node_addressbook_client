<template>
  <div class="sign-up">

    <div class="row mt-5">
      <div class="col-md-6 m-auto">
        <div class="card card-body">
          <h1 class="text-center mb-3">
            <i class="fas fa-user-plus"></i>Register<br>
          </h1>
          <form>

            <div class="form-group">
              <!-- <label for="name">Name</label> -->
              <input
                type="text"
                id="user_name"
                name="user_name"
                class="form-control"
                placeholder="User Name"
                v-model="user_name"
              >
              <p class="error" v-if="errors.user_name">{{ errors.user_name.message }}</p>
            </div>

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

            <button @click="signup" type="button" class="btn btn-primary btn-block">Sign up</button>
            <h3 v-if="message" class="success text-center mb-3">
              {{ message }}
            </h3>
            <h3 v-if="errors.error" class="error text-center mb-3">
              {{ errors.error }}
            </h3>

          </form>
          <br>
          <br>
          <span>
            Already have account?
            <router-link to="login">Login</router-link>
          </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "signup",
  data() {
    return {
      email: "",
      user_name: "",
      password: "",
      errors: {},
      message: ''
    };
  },
  methods: {
    signup: function() {
      this.errors = {};
      this.message = '';
      axios
        .post("http://localhost:5000/api/v1/users/register", {
          user_name: this.user_name,
          password: this.password,
          email: this.email
        })
        .then(response => {
          this.message = response.data.message;
          setTimeout(() => {
            this.$router.replace("login");
          }, 3000);
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

</style>

