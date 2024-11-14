import { createApp } from 'vue'
import './styles/style.css'
import "./styles/index.css";
import router from './router';
import App from './App.vue'

createApp(App).use(router).mount('#app')
