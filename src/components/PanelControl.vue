<template>
  <!-- <div class="container-fluid"> -->
    <div class="container">
      <div>
        <table class="table">
          <thead>
            <tr>
            <th scope="col" class="col-3"> alumnos </th>
            <template v-for="dia in semana" >
              <template v-for="resul in dia">
                <th scope="col" v-for="(hora, index) in resul" :key="index">
                <info-panel :elemento="hora" v-if="cargado"  />
              </th>
              </template>
            </template>
          </tr>
          </thead>
          <tbody v-if="listado">
            <tr v-for="(alumno, index) in datos" :key="index" >
            <td>{{alumno.apellido1}} {{alumno.apellido2}}, {{alumno.nombre}}</td>
            <!-- <template v-for="dia in semana" >
              <td v-for="(hora, index) in dia" :key="index"><casilla-asistencia :alumno="alumno" :horario="hora" :valores="codigos" /></td>
            </template> -->
            <template v-for="dia in semana" >
                <template v-for="resul in dia">
                  <td v-for="(hora, index) in resul" :key="index">
                    <casilla-asistencia :alumno="alumno" :horario="hora" :valores="codigos" />
                  </td>
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
  <!-- </div> -->
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
      // datos: { nombre: 'primero', nombre2: 'segundo', nombre3: 'tercero' },
      datos: [],
      semana: {},
      horario: {},
      cargado: false,
      listado: false
    }
  },
  props: {
    codigos: {
      F: 'f',
      A: 'A'
    },
    semana_selec: { default: 1 },
    clase: { default: 3 }
    // datos: { default: '' }
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
        this.get_dias(res.resul)
      }
    },
    async get_dias (lista) { // falta agregar el modulo
      let token = localStorage.getItem('control')
      const temp = {}
      token = JSON.parse(token)
      // const lista = this.dias
      // lista.forEach(element => {
      for (const element in lista) {
        // console.log(lista[element])
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
      if (res.resul.length > 0) {
        // this.horario[element.id] = res
        return res
      }
      return false
    },
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
            id_clasescursos: this.clase
          }
        })
      })
      respon = await respon.json()
      // respon = respon[0].resul
      respon = respon.resul
      // this.datos = respon
      // console.log(uri)
      console.log('res ', this.datos)
      console.log('clase ', this.clase)
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
    }
  },
  mounted () {
    // this.keys = Object.keys(this.semana)
    // this.keys.forEach(element => {
    //   this.keys = Object.keys(element)
    // })
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
}

</style>

// dia1: {
//           hora1: 1,
//           hora2: 2,
//           hora3: 3,
//           hora4: 4,
//           hora5: 5
//         },
//         dia2: {
//           hora1: 1,
//           hora2: 2,
//           hora3: 3,
//           hora4: 4,
//           hora5: 5
//         },
//         dia3: {
//           hora1: 1,
//           hora2: 2,
//           hora3: 3,
//           hora4: 4,
//           hora5: 5
//         },
//         dia4: {
//           hora1: 1,
//           hora2: 2,
//           hora3: 3,
//           hora4: 4,
//           hora5: 5
//         },
//         dia5: {
//           hora1: 1,
//           hora2: 2,
//           hora3: 3,
//           hora4: 4,
//           hora5: 5
//         }
