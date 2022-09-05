<template>
<div class="container-fluid">
    <div class="container">
    <div class="row mt-4 ">
      <div class="col-4">
        <div class="row">
          <div class="col">CURSO:</div>
          <select class="col" name="cursos" v-if="cursos" @change="sele_true('cursos')" v-model="val_cursos">
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
      <div v-if="s_clase && s_cursos" class="col-4">
        <template v-if="clases">
          <div class="row">
            <div class="col">TUTOR</div>
            <select class="col" name="tutores" @change="sele_true('tutor')" v-model="val_tutor">
              <option v-for="(opt, index) in tutores" :value="opt" :key="index" :title="opt.nombre +' '+opt.apellido1">{{opt.usuario}}</option>
            </select>
          </div>
        </template>
      </div>
    </div>
    <div class="row mt-4 mb-4">
      <div class="col-4">
        <div class="row" >
          <div class="col">SEMANA:</div>
          <select class="col" name="cursos" v-model="semana_selec" @change="sele_true('semana')">
            <option v-for="(opt, index) in semanas" :value="opt" :key="index">{{opt.nombre}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row" v-if="s_tutor && semana_selec && clase_selec" :key="s_semana">
      <panel-control :semana_selec="semana_selec.id" :clase="clase_selec.id"/> <!--falta agregar los select de semana -->
    </div>
  </div>
</div>
</template>

<script>
// ----------------------------------------------------------------------------------------
// falta agregar la llamada al panel y modificat codigos empleados
// ----------------------------------------------------------------------------------------
import PanelControl from './PanelControl.vue'
export default {
  name: 'FiltroControl',
  components: {
    PanelControl
  },
  data () {
    return {
      s_cursos: false,
      s_clase: false,
      s_tutor: false,
      s_semana: false,
      cursos: false,
      clases: false,
      tutores: false,
      semanas: false,
      val_cursos: '',
      val_clases: '',
      val_tutor: '',
      token: '',
      clase_selec: '',
      semana_selec: false
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
    sele_true (x = false) {
      if (x === 'cursos') {
        this.s_cursos = false
        this.s_cursos = false
        this.s_tutor = false
        this.clases = false
        this.tutores = false
        this.val_clases = false
        this.val_tutor = false
        this.get_clases()
        // this.get_semanas()
        this.s_cursos = true
        // console.log('curso cambio')
      }
      if (x === 'clases') {
        this.s_clase = false
        this.s_tutor = false
        this.tutores = false
        this.val_tutor = false
        this.get_tutor()
        this.s_clase = true
      }
      if (x === 'tutor') {
        this.s_tutor = false
        this.s_tutor = true
        this.get_clase()
        // console.log('curso ', this.cursos)
        // console.log('clase ', this.clases)
        // console.log('tutor', this.s_tutor)
        // console.log('semana_selec ', this.semana_selec.id)
        // console.log('clase_selec ', this.clase_selec)
      }
      if (x === 'semana') {
        this.s_semana = !this.s_semana
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
      // console.log('curso id ', this.val_cursos.id)
      this.clases = false
      const uri = 'http://localhost:4000/api/clases_curso/get'
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
      respon = respon.resul
      this.get_lista_clases(respon)
      // console.log(this.val_cursos.id)
      // console.log(respon.resul)
      // console.log(this.cursos)
    },
    async get_lista_clases (obj) {
      // console.log('lista_clases id ', obj)
      // for (const clas in obj) {
      //   console.log('clas obj', obj[clas])
      // }
      const uri = 'http://localhost:4000/api/clases/get'
      const lista = []
      for (const clas in obj) {
        // console.log('clas obj', obj[clas])
        let item = await fetch(uri, {
          method: 'POST',
          headers: {
            authorization: `bearer ${this.token.token}`,
            'Content-type': 'application/json; charset=UTF-8'
          },
          body: JSON.stringify({
            campos: { // agregar otros filtros
              id: obj[clas].id_clases
            }
          })
        })
        item = await item.json()
        item = item.resul
        // console.log('clases ', item)
        lista.push(item[0])
      }
      //   lista.push(item)
      // }
      // console.log('lista ', lista)
      this.clases = lista
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
      // console.log('data ', data)
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
            id_roles: 3 // admin 1 para pruebas y 3 para profesores
          }
        })
      })
      respon = await respon.json()
      this.tutores = respon.resul
      // console.log(respon)
    },
    async get_clase () {
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
            id_clases: this.val_clases.id,
            id_empleados: this.val_tutor.id
          }
        })
      })

      // console.log(respon)
      respon = await respon.json()
      respon = respon.resul
      this.clase_selec = respon[0]
      // console.log('clase_selec_func ', this.clase_selec)
      // console.log('clase selec ', this.clase_selec)
      // console.log(this.cursos)
    },
    async get_semanas () {
      const uri = 'http://localhost:4000/api/semanas/get'
      let respon = await fetch(uri, {
        method: 'POST',
        headers: {
          authorization: `bearer ${this.token.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        }
      })

      // console.log(respon)
      respon = await respon.json()
      this.semanas = respon.resul
      // console.log('semanas ', this.semana)
      // console.log('clase selec ', this.clase_selec)
      // console.log(this.cursos)
    },
    get_token () {
      let token = localStorage.getItem('control')
      token = JSON.parse(token)
      if (!token) {
        this.$router.push('/')
      }
      this.token = token
    }
  },
  // computed: {
  //   c_clase: () => {
  //     return this.clases
  //   },
  //   c_tutor: () => {}
  // },
  mounted () {
    this.get_token()
    this.get_semanas()
    this.get_cursos()
  }
}
</script>

<style>

</style>
