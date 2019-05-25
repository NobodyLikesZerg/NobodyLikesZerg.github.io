import Vue from "vue";
import App from "./App.vue";
import { vsDivider, vsIcon, vsInput, vsButton, vsChip, vsSlider, vsSpacer, vsSideBar, vsSwitch } from 'vuesax'
import 'vuesax/dist/vuesax.css'


Vue.use(vsButton);
Vue.use(vsSideBar);
Vue.use(vsSpacer);
Vue.use(vsSlider);
Vue.use(vsSwitch);
Vue.use(vsChip);
Vue.use(vsIcon);
Vue.use(vsInput);
Vue.use(vsDivider);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
