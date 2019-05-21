import Vue from "vue";
import App from "./App.vue";
import { vsButton, vsSlider, vsSpacer, vsSideBar, vsSwitch } from 'vuesax'
import 'vuesax/dist/vuesax.css'


Vue.use(vsButton);
Vue.use(vsSideBar);
Vue.use(vsSpacer);
Vue.use(vsSlider);
Vue.use(vsSwitch);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
