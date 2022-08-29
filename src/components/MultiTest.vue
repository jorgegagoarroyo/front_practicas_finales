<template>
<div class="row border">
  <!-- <casilla-asistencia class="col border" :alumno="1" :horario="2" :valor="lista.a" :valores="lista" />
  <casilla-asistencia class="col" :alumno="1" :horario="3" :valor="lista.b" :valores="lista" />
  <casilla-asistencia class="col" :alumno="1" :horario="4" :valor="lista.d" :valores="lista" /> -->
  <panel-control/>
  <!-- <info-panel/> -->
</div>
</template>

<script>
// import CasillaAsistencia from './CasillaAsistencia.vue'
import PanelControl from './PanelControl.vue'
// import InfoPanel from './InfoPanel.vue'
export default {
  name: 'MultiTest',
  components: {
    // CasillaAsistencia
    PanelControl
    // InfoPanel
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
