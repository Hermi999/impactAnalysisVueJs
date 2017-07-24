// external libraries and plugins
import Vue from 'vue';
import VueRouter from 'vue-router';
import IaApp from './IaApp.vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// make globally accessable
window.Vue = Vue;

// Tell Vue to use libs
Vue.use(BootstrapVue);
Vue.use(VueRouter);

// custom files
import router from './routes';
//import keyShorts from './keyboard_shortcuts.js';

/* vue event bus for non-child communication 
 * Usage:
 *   - In component A's method:
 *     bus.$emit('id-selected', 1);
 *   - In component B's created hook
 *     bus.$on('id-selected', (args) => this.....);
 *
 *  In more complex cases, you should consider employing a dedicated 
 *  state-management pattern (vuex).
 */
ia.bus = new Vue();

// methods for fetching data from server
import init from './initialize.js';
ia.fetch_data_from_server = init;

new Vue({
  el: '#ia-app',
  router,
  render: h => h(IaApp),
  created: function(){
    // initialize keyboard shortcuts
    //keyShorts();
  }
});

