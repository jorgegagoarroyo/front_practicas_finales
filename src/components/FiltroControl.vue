<template>
<div class="container-fluid">
    <div class="container">
    <div class="row">
      <div class="col-4">
        <div class="row">
          <div class="col">CURSO:</div>
          <select class="col" name="cursos" v-if="cursos" @change="sele_true('cursos')" v-model="val_cursos" >
            <option v-for="(opt, index) in cursos" :value="opt" :key="index">{{opt.nombre}}</option>
          </select>
        </div>
      </div>
      <div v-if="s_cursos" class="col-4">
        <div class="row">
          <template v-if="clases">
            <div class="col">CLASE:</div>
            <select class="col" name="clases" @change="sele_true('clases')" v-model="val_clases" >
              <option v-for="(opt, index) in clases" :value="opt" :key="index" >{{opt.nombre}}</option>
            </select>
          </template>
      </div>
      </div>
      <div v-if="s_clase" class="col-4">
        <div class="row">
          <div class="col">TUTOR</div>
          <select class="col" name="tutores" @change="sele_true('tutor')" v-model="val_tutor" v-if="clases">
            <option v-for="(opt, index) in tutores" :value="opt" :key="index" :title="opt.nombre +' '+opt.apellido1">{{opt.usuario}}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
// ----------------------------------------------------------------------------------------
// falta agregar la llamada al panel y midificat codigos empleados
// ----------------------------------------------------------------------------------------
// import PanelControl from './PanelControl.vue'
export default {
  name: 'FiltroControl',
  // components: {
  //   // PanelControl
  // },
  data () {
    return {
      s_cursos: false,
      s_clase: false,
      s_tutor: false,
      cursos: false,
      clases: false,
      tutores: false,
      val_cursos: '',
      val_clases: '',
      val_tutor: '',
      token: ''
    }
  },
  methods: {
    async get_alumnos () {
      const uri = 'http://localhost:4000/api/clase_alumno/get'
      let respon = await fetch(uri, {
        method: 'POST',
        headers: {
          authorization: `bearer ${this.token.token}`,
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
    },
    sele_true (x) {
      if (x === 'cursos') {
        this.s_cursos = false
        this.get_clases()
        this.s_cursos = true
        console.log('curso cambio')
      }
      if (x === 'clases') {
        this.s_clase = true
        this.get_tutor()
      }
      if (x === 'cursos') {
        this.s_tutor = true
      }
    },
    async get_cursos () {
      const uri = 'http://localhost:4000/api/cursos/get'
      let respon = await fetch(uri, {
        method: 'POST',
        headers: {
          authorization: `bearer ${this.token.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
      // console.log(respon)
      respon = await respon.json()
      this.cursos = respon.resul
      // console.log(this.cursos)
    },
    async get_clases () {
      this.clases = false
      const uri = 'http://localhost:4000/api/clases/get'
      let respon = await fetch(uri, {
        method: 'POST',
        headers: {
          authorization: `bearer ${this.token.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          campos: { // agregar otros filtros
            id_cursos: this.val_cursos.id
          }
        })
      })
      respon = await respon.json()
      this.clases = respon.resul
      // console.log(this.val_cursos.id)
      // console.log(respon.resul)
      // console.log(this.cursos)
    },
    async get_tutor () {
      const uri = 'http://localhost:4000/api/clases_curso/get'
      let respon = await fetch(uri, {
        method: 'POST',
        headers: {
          authorization: `bearer ${this.token.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          campos: { // agregar otros filtros
            id_cursos: this.val_cursos.id,
            id_clases: this.val_clases.id
          }
        })
      })
      respon = await respon.json()
      // this.tutores = respon.resul
      this.get_empleado(respon.resul)
      // console.log('curso ', this.val_cursos.id)
      // console.log('clase ', this.val_clases.id)
      // console.log(this.tutores)
      // console.log(respon.resul)
      // console.log(this.cursos)
    },
    async get_empleado (data) {
      console.log('data ', data)
      const uri = 'http://localhost:4000/api/usuarios/get'
      let respon = await fetch(uri, {
        method: 'POST',
        headers: {
          authorization: `bearer ${this.token.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          campos: { // agregar otros filtros
            id: data[0].id_empleados,
            id_roles: 1 // admin 1 para pruebas y 3 para profesores
          }
        })
      })
      respon = await respon.json()
      this.tutores = respon.resul
      console.log(respon)
    },
    get_token () {
      let token = localStorage.getItem('control')
      token = JSON.parse(token)
      this.token = token
    }
  },
  computed: {
    c_clase: () => {
      return this.clases
    },
    c_tutor: () => {}
  },
  mounted () {
    this.get_token()
    this.get_cursos()
  }
}
</script>

<style>

</style>
