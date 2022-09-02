<template>
  <div class="row" v-if="s_tabla" :key="s_tabla">
    <div class="col">
        <lista-datos :tabla="s_tabla.nombre" :editar="s_tabla.editar" :borrar="s_tabla.borrar"/>
    </div>
  </div>
</template>

<script>
import ListaDatos from '../components/ListaDatos.vue'

export default {
  name: 'ListaView',
  data () {
    return {
      s_tabla: false
    }
  },
  props: {
    tabla: { default: '' },
    editar: { default: false },
    borrar: { default: false }
  },
  async mounted () {
    console.log('lista view ', this.tabla)
    const tablas = { nombre: this.tabla, editar: false, borrar: false }
    if (this.editar) {
      tablas.editar = true
    }
    if (this.borrar) {
      tablas.borrar = true
    }
    this.s_tabla = tablas
    console.log('s_tabla ', this.s_tabla)
  },
  components: {
    ListaDatos
  }
}
</script>

<style>

</style>
