import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Users from '../views/Users.vue'
import Dividends from '../views/Dividends.vue'
import UserDetails from '../views/UserDetails.vue'
import DividendDetails from '../views/DividendDetails.vue'
import Login from '../views/Login.vue'
import PlatformDetails from '../views/PlatformDetails.vue'
import Platforms from '../views/Platforms.vue'
import NotFound from '../views/NotFound.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  { path: '/users', name: 'Users', component: Users },
  { path: '/users/:userId', name: 'UserDetails', component: UserDetails, props: true },
  { path: '/users/add', name: 'AddUser', component: UserDetails },
  { path: '/dividends', name: 'Dividends', component: Dividends},
  { path: '/dividends/add', name: 'AddDividend', component: DividendDetails},
  { path: '/dividends/:dividendId', name: 'DividendDetails', component: DividendDetails, props: true },
  { path: '/platforms', name: 'Platforms', component: Platforms},
  { path: '/platforms/add', name: 'AddPlatform', component: PlatformDetails},
  { path: '/platforms/:platformId', name: 'PlatformDetails', component: PlatformDetails, props: true },
  { path: '/login', name: 'Login', component: Login },
  { path: '/:catchAll(.*)*', component: NotFound },
  ];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
