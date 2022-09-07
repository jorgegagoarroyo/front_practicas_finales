<template>
  <div>
    <!-- <span class="" v-for="(dia, index) in dias" :key="index">
        {{dia}}
        <div class="" v-for="(hora, index) in horario" :key="index">
            {{hora}}
        </div>
    </span> -->
    <!-- <span>{{elemento}}</span> -->
    <div class="row d-flex flex-column " v-if="listo">
      <!-- <div class="col border">{{dia}}</div> -->
      <div class="col celda" :key="horas">{{horas.nombre}}</div>
      <div class="col celda" :title="modulos.nombre" :key="modulos">{{modulos.codigo}}</div>
      <div class="col celda" :title="ufs.nombre" :key="ufs">{{ufs.codigo}}</div>
      <div class="col celda" :key="usuarios">{{usuarios.codigo}}</div>
      <div class="col celda" :key="aulas">{{aulas.codigo}}</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'InfoPanel',
  data () {
    return {
      fecha: '',
      aulas: '',
      horas: '',
      ufs: '',
      modulos: '',
      usuarios: '',
      listo: false
    }
  },
  props: {
    elemento: {},
    dia: { defaul: '' }
  },
  methods: {
    async get_datos () {
      // const datos = {}
      // console.log('datos')
      let token = localStorage.getItem('control')
      token = JSON.parse(token)
      // console.log('elemento ', this.elemento)<------------------------------
      // let item = Object.keys(this.elemento)
      // item = this.elemento[item]
      // const valor = item.resul[0]
      // item = Object.keys(item.resul[0])
      let item = this.elemento
      // item = item.resul
      const valor = item
      item = Object.keys(item)
      // console.log('item ', item)
      // console.log('valor ', valor)
      for (const i in item) {
        // const res = await this.get_info(i, token)
        // console.log(item[i])
        // console.log(valor[item[i]])
        await this.get_info(item[i], valor[item[i]], token)
      }
      // console.log('res datos ', res)
      this.get_info('id_modulos', this.ufs.id_modulos, token, 'id_modulos')
      this.listo = true
    },
    async get_info (table, val, token) {
      // console.log('get info')
      // console.log('table ', table)
      // console.log(buscar, val)
      if (table !== 'id') {
        let tabla = table.split('_')
        tabla = tabla[1]
        if (tabla === 'empleados') {
          tabla = 'usuarios'
        }
        const uri = `http://localhost:4000/api/${tabla}/get`
        // console.log(uri)
        let res = await fetch(uri, {
          method: 'POST',
          headers: {
            authorization: `bearer ${token.token}`,
            'Content-type': 'application/json; charset=UTF-8'
          },
          body: JSON.stringify({
            campos: {
              id: val
            }
          })
        })
        res = await res.json()
        // console.log('this[] ', res.resul)
        this[tabla] = res.resul[0]
        // console.log(`${tabla} `, res.resul)
        // console.log('this[] ', this[tabla])
      }
    }
  },
  mounted () {
    // this.fecha = ''
    // this.aulas = ''
    // this.horas = ''
    // this.ufs = ''
    // this.modulos = ''
    // this.usuarios = ''
    // this.listo = false
    // this.get_semana()
    // console.log('info')
    this.get_datos()
    // console.log('dia ', this.dia)
    // console.log('elemento ', this.elemento)
  },
  watch: {
    elemento: function () {
      console.log('cambio en elemento')
      this.get_datos()
    }
  }
}
</script>

<style scope>
.celda{
    min-width: 4%;
    min-height: 1.5rem;
}

</style>

// async get_semana () {
    //   let token = localStorage.getItem('control')
    //   token = JSON.parse(token)
    //   const uri = 'http://localhost:4000/api/fechas/get'
    //   let res = await fetch(uri, {
    //     method: 'POST',
    //     headers: {
    //       authorization: `bearer ${token.token}`,
    //       'Content-type': 'application/json; charset=UTF-8'
    //     },
    //     body: JSON.stringify({
    //       campos: {
    //         id_semanas: this.semana
    //       }
    //     })
    //   })
    //   if (res.status === 200) {
    //     res = await res.json()
    //     this.dias = res
    //     // console.log(res)
    //     this.get_dias(res.resul)
    //   }
    // },
    // async get_dias (lista) { // falta agregar el modulo
    //   let token = localStorage.getItem('control')
    //   token = JSON.parse(token)
    //   // const lista = this.dias
    //   lista.forEach(element => {
    //     this.get_horas(element, token)
    //   })
    // },
    // async get_horas (element, token) {
    //   const uri = 'http://localhost:4000/api/horarios/get'
    //   let res = await fetch(uri, {
    //     method: 'POST',
    //     headers: {
    //       authorization: `bearer ${token.token}`,
    //       'Content-type': 'application/json; charset=UTF-8'
    //     },
    //     body: JSON.stringify({
    //       campos: { // agregar otros filtros
    //         id_fechas: element.id
    //       }
    //     })
    //   })
    //   res = await res.json()
    //   if (res.resul.length > 0) {
    //     this.horario[element.id] = res
    //   }
    // }
