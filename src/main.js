import { createApp } from 'vue'
import App from './App.vue'
import VueToast from 'vue-toast-notification'
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';

const app = createApp(App)


app.use(VueToast);
app.mount('#app')
