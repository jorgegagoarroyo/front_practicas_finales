<template>
  <div class="container-fluid">
    <div class="containe">
      <ingresar-user @cambio_rol="cambio"/>
    </div>
  </div>
</template>

<script>
import IngresarUser from '../components/IngresarUser.vue'

export default {
  name: 'ListaView',
  components: {
    IngresarUser
  },
  methods: {
    cambio () {
      // console.log('firt view')
      this.$emit('cambio_rol')
    }
  },
  mounted () {
    localStorage.removeItem('control')
    // this.$emit('cambio_rol')
    this.cambio()
    console.log('mounted')
  }
}
</script>
