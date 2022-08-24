<template>
<div class="row border">
  <!-- <casilla-asistencia class="col border" :alumno="1" :horario="2" :valor="lista.a" :valores="lista" />
  <casilla-asistencia class="col" :alumno="1" :horario="3" :valor="lista.b" :valores="lista" />
  <casilla-asistencia class="col" :alumno="1" :horario="4" :valor="lista.d" :valores="lista" /> -->
  <panel-control/>
</div>
</template>

<script>
// import CasillaAsistencia from './CasillaAsistencia.vue'
import PanelControl from './PanelControl.vue'
export default {
  name: 'MultiTest',
  components: {
    // CasillaAsistencia
    PanelControl
  },
  data () {
    return {
      lista: { a: 'A', b: 'B', c: 'C', d: 'D' }
    }
  }
}

</script>

<style>

</style>
