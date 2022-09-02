<template>
  <!-- <div class="container-fluid"> -->
    <div class="container">
      <div>
        <table class="table table-bordered">
          <thead>
            <tr>
            <th scope="col" class="col-3 "> alumnos </th>
            <template v-for="dia in semana" >
              <template v-for="resul in dia">
                <th scope="col" v-for="(hora, index) in resul" :key="index">
                  <info-panel :elemento="hora" v-if="cargado" />
                </th>
              </template>
            </template>
          </tr>
          </thead>
          <tbody v-if="listado">
            <tr v-for="(alumno, index) in datos" :key="index" >
              <td class="border-5-r">{{alumno.apellido1}} {{alumno.apellido2}}, {{alumno.nombre}}</td>
              <!-- <template v-for="dia in semana" >
                <td v-for="(hora, index) in dia" :key="index">
                  <casilla-asistencia :alumno="alumno" :horario="hora" :valores="codigos" />
                </td>
              </template> -->
              <template v-for="(dia, key) in semana" >
                  <template v-for="resul in dia">
                    <template v-for="(hora, index) in resul" :key="index">
                      <td v-if="feriados[key]" class="bg-light">  </td>
                      <td v-else>
                        <casilla-asistencia :alumno="alumno" :horario="hora" :valores="codigos"/>
                      </td>
                    </template>
                  </template>
                </template>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- <div class="row">test varios
        <info-panel :elemento="semana" v-if="cargado" />
      </div> -->
  </div>
  <!-- {{feriados}} -->
</template>

<script>
import CasillaAsistencia from './CasillaAsistencia.vue'
import InfoPanel from './InfoPanel.vue'
export default {
  name: 'PanelControl',
  components: {
    CasillaAsistencia,
    InfoPanel
  },
  data () {
    return {
      keys: [],
      datos: [],
      codigos: [],
      semana: {},
      // horario: {},
      cargado: false,
      listado: false,
      feriados: {}
    }
  },
  props: {
    semana_selec: { default: 1 },
    clase: { default: 3 }
  },
  methods: {
    async get_semana () {
      let token = localStorage.getItem('control')
      token = JSON.parse(token)
      const uri = 'http://localhost:4000/api/fechas/get'
      let res = await fetch(uri, {
        method: 'POST',
        headers: {
          authorization: `bearer ${token.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          campos: {
            id_semanas: this.semana_selec
          }
        })
      })
      if (res.status === 200) {
        res = await res.json()
        // this.dias = res
        // console.log(res)
        // this.semana_full = res.resul
        this.get_dias(res.resul)
        // console.log(this.semana_full)
      }
    },
    async get_dias (lista) { // falta agregar el modulo
      let token = localStorage.getItem('control')
      const temp = {}
      token = JSON.parse(token)
      // const lista = this.dias
      // lista.forEach(element => {
      for (const element in lista) {
        // console.log('lista ', lista[element])
        this.feriados[lista[element].fecha] = lista[element].festivo
        const date = lista[element].fecha
        const hora = await this.get_horas(lista[element], token)
        if (hora) {
          temp[date] = hora
        }
      // })
      }
      // console.log('temp ', temp)
      this.semana = temp
      this.cargado = true
      // console.log('semana ', this.semana)
    },
    async get_horas (element, token) {
      const uri = 'http://localhost:4000/api/horarios/get'
      let res = await fetch(uri, {
        method: 'POST',
        headers: {
          authorization: `bearer ${token.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          campos: { // agregar otros filtros
            id_fechas: element.id
          }
        })
      })
      res = await res.json()
      // console.log(res)
      if (res.resul.length > 0) {
        // this.horario[element.id] = res
        return res
      }
      return false
    },
    async get_alumnos () {
      // console.log('get_alumnos')
      // console.log('clase ', this.clase)
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
            id_clasescursos: this.clase
          }
        })
      })
      respon = await respon.json()
      respon = respon.resul
      // respon = respon[0].resul
      // respon = respon.resul
      // console.log('respon en get alumnos', respon)
      // this.datos = respon
      // console.log(uri)
      // console.log('res ', this.datos)
      // console.log('clase ', this.clase)
      for (const alumno in respon) {
        // console.log(alumno)
        // console.log(respon[alumno])
        // console.log(respon[alumno].id_alumnos)
        await this.get_nombres(token, respon[alumno])
      }
      // console.log('final ', this.datos)
      this.listado = true
    },
    async get_nombres (token, alumno) {
      // console.log('get nombres')
      const uri = 'http://localhost:4000/api/alumnos/get'
      let respon = await fetch(uri, {
        method: 'POST',
        headers: {
          authorization: `bearer ${token.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          campos: { // agregar otros filtros
            id: alumno.id_alumnos
          }
        })
      })
      respon = await respon.json()
      // console.log('alumno ', alumno, respon)
      // this.datos[`alumno_${alumno.id}`] = respon.resul[0]
      this.datos.push(respon.resul[0])
      // console.log('nombre alumnos ', this.datos)
    },
    async get_codigos () {
      let token = localStorage.getItem('control')
      token = JSON.parse(token)
      const uri = 'http://localhost:4000/api/codigos/get'
      let respon = await fetch(uri, {
        method: 'POST',
        headers: {
          authorization: `bearer ${token.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
      respon = await respon.json()
      respon = respon.resul
      this.codigos = respon
      // console.log(this.codigos)
    }
  },
  mounted () {
    // this.keys = Object.keys(this.semana)
    // this.keys.forEach(element => {
    //   this.keys = Object.keys(element)
    // })
    // console.log(`semana ${this.semana_selec}  clase ${this.clase}`)
    this.get_codigos()
    this.get_alumnos()
    this.get_semana()
  }
}
</script>

<style scope>
.casilla{
  width: 50px;
  height: 50px;
  border: solid
};
.borde-5 {
  border: solid 2px;
};
.borde-5-r {
  border-right: solid 2px;
};
.bgc-g {
  background-color: gray;
  color: beige;
}

</style>
