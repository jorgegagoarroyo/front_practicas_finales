<template>
  
</template>

<script>
import PanelControl from './PanelControl.vue'
export default {
  name: 'FiltroControl',
  components: {
    PanelControl
  },
  methods: {
    async get_alumnos () {
      let token = localStorage.getItem('control')
      token = JSON.parse(token)
      const uri = 'http://localhost:4000/api/clase_alumno/get'
      let respon = await fetch(uri, {
        method: 'POST',
        headers: {
          authorization: `bearer ${token.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          campos: { // agregar otros filtros
            id_clasecurso: this.clase
          }
        })
      })
      respon = respon.json()
      // respon = respon[0].resul
      this.datos = respon
      console.log(uri)
      console.log('res ', this.datos)
      this.listado = true
    }
  }
}
</script>

<style>

</style>