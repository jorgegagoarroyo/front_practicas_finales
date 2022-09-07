<template>
<div class="container">
  <div class="row " :key="alumno">
    <div class="col">
        {{alumno.nombre}} {{alumno.apellido1}} {{alumno.apellido2}}
    </div>
    <div class="row" v-for="(modulo, index) in modulos" :key="index">
        {{modulo}}
        <div class="row" v-for="(uf, index) in ufs" :key="index">
            <span v-if="uf.id_modulos == modulo.id">{{uf}}</span>
            hola
        </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ListaAsistencia',
  props: {
    alumnos: {},
    clases: {}
  },
  data () {
    return {
      alumno: '',
      token: false,
      modulos: [],
      ufs: []
    }
  },
  methods: {
    async get_token () {
      const tok = localStorage.getItem('control')
      this.token = await JSON.parse(tok)
      this.get_alumno()
      this.get_modulos()
    },
    async get_alumno () {
      const uri = 'http://localhost:4000/api/alumnos/get'
      let res = await fetch(uri, {
        method: 'POST',
        headers: {
          authorization: `bearer ${this.token.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          campos: { // agregar otros filtros
            id: this.alumnos
          }
        })
      })
      res = await res.json()
      res = res.resul
      res = res[0]
      this.alumno = res
      console.log(this.alumno)
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
            id_clases: this.clases
          }
        })
      })
      res = await res.json()
      res = res.resul
      //   console.log('modulos', res)
      this.modulos = res
      for (const mod in res) {
        await this.get_ufs(res[mod].id)
      }
      console.log('modulos ', this.modulos)
      console.log('ufs ', this.ufs)
      //   this.get_clases(res.id_clasescursos)
    },
    async get_ufs (val) {
      console.log(val)
      const uri = 'http://localhost:4000/api/ufs/get'
      let res = await fetch(uri, {
        method: 'POST',
        headers: {
          authorization: `bearer ${this.token.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          campos: { // agregar otros filtros
            id_modulos: val
          }
        })
      })
      res = await res.json()
      res = res.resul
      //   console.log('ufs  ', res)
      this.ufs.push(res)
    }
  },
  mounted () {
    this.get_token()
    console.log(this.alumnos)
    console.log(this.clases)
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
