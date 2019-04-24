<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <button @click="logout">Logout</button>

    <div class="row mt-5">
      <div class="col-md-6 m-auto">
        <div class="card card-body">
          <h1 class="text-center mb-3">
            <i class="fas fa-user-plus"></i> Edit Address Book<br>
          </h1>
          <form enctype="multipart/form-data">
            <div class="form-group">
              <!-- <label for="name">Name</label> -->
              <input
                type="name"
                id="name"
                name="name"
                class="form-control"
                placeholder="Enter Name"
                v-model="name"
              >
              <p class="error" v-if="errors.name">{{ errors.name.message }}</p>
            </div>
            <div class="form-group">
              <!-- <label for="name">Name</label> -->
              <input
                name="image"
                type="file" id="file" ref="file" 
                class="form-control"
              >
            </div>
            <div class="form-group">
              <!-- <label for="age">Age</label> -->
              <select id="age" v-model="age" name="age" class="form-control">
                <option v-for="i in range(10, 85)"
                v-bind:value="i"
                :selected="i == 'addressbook.age'">{{i}}</option>
              </select>
            </div>
            <div class="form-group">
              <!-- <label for="bio">Biography</label> -->
              <textarea type="bio"
                id="bio"
                name="bio"
                class="form-control"
                placeholder="Biography"
                v-model="bio"></textarea>
                <p class="error" v-if="errors.bio">{{ errors.bio.message }}</p>
            </div>
            <div class="form-group">
              <!-- <label for="country">Country</label> -->
              <input
                type="country"
                id="country"
                name="country"
                class="form-control"
                placeholder="Enter Country"
                v-model="country"
              >
            </div>
            <div class="form-group">
              <!-- <label for="city">City</label> -->
              <input
                type="city"
                id="city"
                name="city"
                class="form-control"
                placeholder="Enter city"
                v-model="city"
              >
            </div>
            <div class="form-group">
              <!-- <label for="address">Address</label> -->
              <input
                type="address"
                id="address"
                name="address"
                class="form-control"
                placeholder="Enter address"
                v-model="address"
              >
            </div>
            <div class="form-group">
              <!-- <label for="building_number">Building Number</label> -->
              <input
                type="building_number"
                id="building_number"
                name="building_number"
                class="form-control"
                placeholder="Enter Building Number"
                v-model="building_number"
              >
            </div>
            <div class="form-group">
              <!-- <label for="name">Postal Code</label> -->
              <input
                type="postal_code"
                id="postal_code"
                name="postal_code"
                class="form-control"
                placeholder="Enter Postal Code"
                v-model="postal_code"
              >
            </div>
            <button @click="updateAddressBook" type="button" class="btn btn-primary btn-block">Edit</button>
            <h3 v-if="message" class="success text-center mb-3">
              {{ message }}
            </h3>

          </form>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      message: "",
      name: "",
      age: "",
      bio: "",
      country: "",
      city: "",
      address: "",
      building_number: "",
      postal_code: "",
      errors: []
    };
  },
  components: {
    // HelloWorld
  },
  created() {
    this.getAddress();
  },
  methods: {
    range: function(min,max){
      var array = [],
      j = 0;
      for(var i = min; i <= max; i++){
        array[j] = i;
        j++;
      }
      return array;
    },
    logout: function() {
      axios
        .post("http://localhost:5000/api/v1/users/logout")
        .then(response => {
          this.message = response.data.message;
          setTimeout(() => {
            this.$router.push({ name: 'home'});
          }, 2000);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    getAddress: function(){
      axios
        .get("http://localhost:5000/api/v1/addressbooks/"+this.$route.query.key)
        .then(response => {
          let address = response.data.address;
          console.log(address);
          this.name = address.name;
          this.age = address.age;
          this.bio = address.bio;
          this.country = address.country;
          this.city = address.city;
          this.address = address.address;
          this.building_number = address.building_number;
          this.postal_code = address.postal_code;
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateAddressBook: function(){
      let formData = new FormData();
      
      formData.append('file', this.$refs.file.files[0]);
      formData.append('name', this.name);
      formData.append('age', this.age);
      formData.append('bio', this.bio);
      formData.append('country', this.country);
      formData.append('city', this.city);
      formData.append('address', this.address);
      formData.append('building_number', this.building_number);
      formData.append('postal_code', this.postal_code);

      axios
        .put("http://localhost:5000/api/v1/addressbooks/"+this.$route.query.key,
        formData,
        {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
          this.message = response.data.message;
          setTimeout(() => {
            this.$router.replace("home");
          }, 2000);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
          // console.log(error)
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