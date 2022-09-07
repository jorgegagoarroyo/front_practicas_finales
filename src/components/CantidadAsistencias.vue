<template>
  <div class="row inside">
    <div v-if="faltas" class="col celda" :key="falta">{{falta}}</div>
    <div v-else class="col  celda" :key="asis">{{asis}}</div>
  </div>
</template>

<script>
export default {
  name: 'CantidadAsistencia',
  props: {
    alumno: {},
    clase: {},
    faltas: { default: false }
  },
  data () {
    return {
      token: false,
      modulos: [],
      ufs: [],
      horarios: {},
      asis: 0,
      falta: 0,
      totales: [],
      todos: 0,
      codigos_asis: [2, 3], // <--------------------------cambiar en funcion
      codigos_falta: [1] // <------------------------------de los codigos deseados
    }
  },
  methods: {
    async get_token () {
      const tok = localStorage.getItem('control')
      this.token = await JSON.parse(tok)
      //   console.log('token ', this.token)
      //   this.asistencia_alumno()
      this.get_modulos()
    },
    async get_modulos () {
      const uri = 'http://localhost:4000/api/modulos/get'
      let res = await fetch(uri, {
        method: 'POST',
        headers: {
          authorization: `bearer ${this.token.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          campos: { // agregar otros filtros
            id_clases: this.clase
          }
        })
      })
      res = await res.json()
      res = res.resul
      //   console.log(res)
      //   this.totales = res
      for (const val in res) {
        await this.get_ufs(res[val])
      }
      //   console.log(this.ufs)
      //   for (const val in res) {
      //     await this.get_ufs(res[val])
      //   }
      this.asistencia_alumno()
    },
    async get_ufs (val) {
      const uri = 'http://localhost:4000/api/ufs/get'
      let res = await fetch(uri, {
        method: 'POST',
        headers: {
          authorization: `bearer ${this.token.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          campos: { // agregar otros filtros
            id_modulos: val.id
          }
        })
      })
      res = await res.json()
      res = res.resul
      this.ufs.push(res)
    },
    async asistencia_alumno () {
    //   console.log(this.token)
      const uri = 'http://localhost:4000/api/asistencias/get'
      let res = await fetch(uri, {
        method: 'POST',
        headers: {
          authorization: `bearer ${this.token.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          campos: { // agregar otros filtros
            id_alumnos: this.alumno.id
          }
        })
      })
      res = await res.json()
      res = res.resul
      //   console.log(res)
      this.totales = res
      for (const hora in this.totales) {
        await this.get_horaio_uf(this.totales[hora].id_horarios)
      }
      this.porcent()
    },
    async get_horaio_uf (val) {
      const uri = 'http://localhost:4000/api/horarios/get'
      let res = await fetch(uri, {
        method: 'POST',
        headers: {
          authorization: `bearer ${this.token.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          campos: { // agregar otros filtros
            id: val
          }
        })
      })
      res = await res.json()
      res = res.resul
      res = res[0]
      //   console.log(res)
      this.horarios[`${res.id_ufs}`] = true
      //   console.log(this.horarios)
    },
    porcent () {
    //   console.log(this.horarios)
      for (const cod in this.totales) {
        // console.log(this.horarios[`${this.totales[cod].id_horarios}`])
        // console.log('for  ', this.totales[cod])
        const val = this.totales[cod].id_codigos
        // if (this.horarios[`${this.totales[cod].id_horarios}`]) {
        //   console.log('true')
        if (this.codigos_asis.includes(val)) {
          this.asis += 1
        }
        if (this.codigos_falta.includes(val)) {
          this.falta += 1
        }
        this.todos += 1
        // }
      }
      this.asis = ((this.asis / this.todos) * 100).toFixed(1)
      this.falta = ((this.falta / this.todos) * 100).toFixed(1)
    }
  },
  mounted () {
    this.get_token()
  }
}
</script>

<style>
* {
    margin: 0px;
    padding: 0px;
}
.celda {
    overflow: hidden;
}
.inside {
    box-sizing: border-box;
}

</style>
