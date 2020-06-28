import Vue from 'vue'
import VueRouter from 'vue-router'
import Articles from '../views/Articles.vue'
import TopList from '../views/TopList.vue'
import Details from '../views/Details.vue'
import DetailsRight from '../views/DetailsRight.vue'



Vue.use(VueRouter)
const routes = [
  {
    path: '/type/:type_id',
    components: {
      Articles,
      TopList
    }
  },
  {
    path: '/type/:type_id/page/:page',
    components: {
      Articles,
      TopList
    }
  },
  {
    path: '/',
    name: 'Article',
    components: {
      Articles,
      TopList
    }
  },
  {
    path: '/details/:id',
    name: 'Details',
    components: {
      Details,
      DetailsRight
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
