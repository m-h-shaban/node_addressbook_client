import Vue from "vue";
import axios from "axios";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Edit from "./views/Edit.vue";
import Login from "./views/Login.vue";
import Signup from "./views/Signup.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/edit/:key",
      name: "edit",
      component: Edit,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "*",
      redirect: "/login"
    },
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/sign-up",
      name: "Signup",
      component: Signup
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  let currentUser = "";

  try {
    // fetch data from a url endpoint
    const response = await axios.get(
      "http://localhost:5000/api/v1/users/current"
    );
    currentUser = await response.data.user;
    
    if (requiresAuth && !currentUser) {
      next("login");
    } else if (!requiresAuth && currentUser) {
      next("home");
    } else {
      next();
    }
  } catch (error) {
    console.log(error); // catches both errors
  }
});

export default router;
