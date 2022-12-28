import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import axios from "axios";

import Toaster from "v-toaster";
import "v-toaster/dist/v-toaster.css";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import VueRouter from "vue-router";
import AxiosPlugin from "vue-axios-cors";
import carousel from "vue-owl-carousel";
import VueSkeletonLoader from "skeleton-loader-vue";

axios.defaults.baseURL = "https://armin-esp.iran.liara.run/";
//axios.defaults.baseURL = "http://it1.thotero.com:3000/";

axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";

/* Vue uses */
Vue.use(Toaster, { timeout: 8000 });
Vue.use(VueSweetalert2);
Vue.use(VueRouter);
Vue.use(AxiosPlugin);
Vue.use(carousel);
Vue.component("vue-skeleton-loader", VueSkeletonLoader);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
