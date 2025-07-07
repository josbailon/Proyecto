import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/globals/reset.css';
import './assets/css/globals/variables.css';
import './assets/css/globals/layout.css';

createApp(App)
  .use(router)
  .mount('#app');
