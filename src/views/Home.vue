<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <button @click="logout">Logout</button>

    <div class="row mt-5">
      <div class="col-md-6 m-auto">
        <div class="card card-body">
          <h1 class="text-center mb-3">
            <i class="fas fa-user-plus"></i> Add to Address Book<br>
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
                <option v-for="i in range(10, 85)">{{i}}</option>
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
            <button @click="addToAddressBook" type="button" class="btn btn-primary btn-block">Add</button>
            <h3 v-if="message" class="success text-center mb-3">
              {{ message }}
            </h3>

          </form>
        </div>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-md-12 m-auto">
        <div class="row">
          <div v-bind:key="addressbook.key" v-for="addressbook in addresses" class="col-md-4 mt-5">
            <div class="card" style="">
              <img class="card-img-top" v-bind:src="addressbook.image" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">{{addressbook.name}}</h5>
                <p class="card-text">{{addressbook.bio}}</p>
                <p class="card-text">{{addressbook.age}}</p>
                <p class="card-text">{{addressbook.country}} - {{addressbook.city}} - {{addressbook.address}} - {{addressbook.building_number}} - {{addressbook.postal_code}}</p>
                <a @click="deleteAddressbook(addressbook.key)" class="btn btn-primary mr-5">Delete AddressBook</a>
                <a @click="goToEdit(addressbook.key)" class="btn btn-primary">Edit AddressBook</a>
              </div>
            </div>
          </div>
          
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
      addresses: [],
      errors: []
    };
  },
  components: {
    // HelloWorld
  },
  created() {
    this.getAllAddresses();
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
            this.$router.replace("login");
          }, 2000);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    getAllAddresses: function(){
      axios
        .get("http://localhost:5000/api/v1/addressbooks/")
        .then(response => {
          this.addresses = response.data.addresses;
          console.log(this.addresses);
          
        })
        .catch(error => {
          console.log(error);
        });
    },
    goToEdit: function(key){
      this.$router.push({ name: 'edit', query: { key: key } });
    },
    deleteAddressbook: function(key){
      axios
        .delete("http://localhost:5000/api/v1/addressbooks/"+key)
        .then(response => {
          this.message = response.data.message;
          this.getAllAddresses();
          })
        .catch(error => {
          this.errors = error.response.data.errors;
          // console.log(error)
        });
    },
    addToAddressBook: function(){
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
        .post("http://localhost:5000/api/v1/addressbooks/add",
        formData,
        {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
          this.message = response.data.message;
          this.getAllAddresses();
          this.name= "";
          this.age= "";
          this.bio= "";
          this.country= "";
          this.city= "";
          this.address= "";
          this.building_number= "";
          this.postal_code= "";
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