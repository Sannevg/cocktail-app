import { createRouter, createWebHistory } from 'vue-router'
import Overview from '@/views/cocktailOverview.vue'
import CocktailDetailed from '@/views/cocktailDetail.vue'

const routes = [
  {
    name: 'Home',
    component: Overview,
    path: '/'
},
{
    name: 'cocktailDetail',
    component: CocktailDetailed,
    path: '/cocktail/detailed'
}
];

const router = createRouter({ history: createWebHistory(), routes })
export default router
