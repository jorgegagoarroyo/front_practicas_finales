import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import FirstView from '../views/FirstView.vue'
import MultiTest from '../components/MultiTest.vue'
import PanelControl from '../components/PanelControl.vue'
// import ListaDatos from '../components/ListaDatos.vue'
import FiltoControl from '../components/FiltroControl.vue'
import BlankComp from '../components/BlankComp.vue'
import IngresarEditar from '../components/IngresarEditar.vue'
import ListaAsistencias from '../components/ListaAsistencias.vue'
// import ListaView from '../views/ListaView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: FirstView
    // component: MultiTest
  },
  {
    path: '/multi',
    name: 'multi',
    component: MultiTest
  },
  {
    path: '/panel',
    name: 'panel',
    component: PanelControl
  },
  {
    path: '/panel_filtro',
    name: 'filtrado',
    component: FiltoControl
  },
  {
    path: '/lista',
    name: 'lista',
    props: true,
    // component: ListaView
    component: () => import('../views/ListaView.vue')
  },
  {
    path: '/blank',
    name: 'blank',
    component: BlankComp
  },
  {
    path: '/elemento',
    name: 'elemento',
    component: IngresarEditar,
    props: true
  },
  {
    path: '/asistencias',
    name: 'asistencias',
    component: ListaAsistencias,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

// path: '',
// name: '',
// component: ''
// }
