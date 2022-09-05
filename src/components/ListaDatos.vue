<template>
<div class="container">
  <!-- <div class="row"> -->
    <!-- <div class="table table-borderer">{{tabla}}</div>
  </div> -->
  <div class="row">
    <div class="col m-2">
      <button class="btn btn-secondary col-2" @click="editar_elemento(dato)">Agregar {{elemento_nombre}}</button>
    </div>
  </div>
    <div class="row">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <template v-for="(titulo, index) in titulos" >
                      <template v-if="titulo !== 'id'">
                        <th :key='index'>
                          {{titulo}}
                        </th>
                      </template>
                    </template>
                    <th v-if=" edits || deletes"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(dato, index) in datos" :key="index">
                  <template v-for="(titulo, index) in titulos">
                    <template v-if="titulo !== 'id'">
                      <td class="col" :key='index'>  {{dato[titulo]}}  </td>
                    </template>
                  </template>
                    <!-- <td class='col' v-for="(titulo, index) in titulos" :key='index'>  {{dato[titulo]}}  </td> -->
                    <!-- <td v-show='edit' class='bg-primary rounded border col-1 ' > editar </td>
                    <td v-show='dele' class='bg-danger rounded col-1'> eliminar </td> -->
                    <td class='col-2' v-if=" edits || deletes">
                        <button v-show='edits' class='bg-primary rounded m-2 p-1' @click="editar_elemento(dato)">editar</button>
                        <button v-show='deletes' class='bg-danger rounded m-2 p-1' @click="eliminar_elemento(dato)">eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>

export default {
  name: 'ListaDatos',
  props: {
    tabla: { required: true }, // { type: String, default: () => ('def'), required: true },
    editar: { default: false },
    borrar: { default: false }
    // titulo: { default: () => (['t1', 't2', 't3']) },
    // dato: { default: () => ([{ t1: 'a', t2: 'b', t3: 'c' }, { t1: 'd', t2: 'e', t3: 'f' }, { t1: 'g', t2: 'h', t3: 'i' }]) }
  },
  data () {
    return {
      edits: false,
      deletes: false,
      titulos: [],
      datos: [],
      token: '',
      elemento_nombre: ''
      // tabla: ''
    }
  },
  methods: {
    async leer_elementos () {
      const uri = `http://localhost:4000/api/${this.tabla}/get`
      // console.log(uri)
      let temp = await fetch(uri, {
        method: 'POST',
        headers: {
          authorization: `bearer ${this.token.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
      // console.log(temp)
      temp = await temp.json()
      // console.log(temp)
      this.datos = temp.resul
      // console.log('datos ', this.datos)
      // this.datos = [{ t1: 'a', t2: 'b', t3: 'c' }, { t1: 'd', t2: 'e', t3: 'f' }, { t1: 'g', t2: 'h', t3: 'i' }]
      // console.log(`leer ${this.datos.status}`)
      // this.cant += 1
    },
    async leer_campos () {
      const uri = `http://localhost:4000/api/${this.tabla}/campos`
      // console.log(uri)
      let temp = await fetch(uri, {
        method: 'GET',
        headers: {
          authorization: `bearer ${this.token.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
      // console.log(temp)
      temp = await temp.json()
      temp = temp.fields
      // console.log('campo ', temp)
      // this.titulos = temp.fields
      this.titulos = Object.keys(temp)
      // console.log('titulos', this.titulos)
      // this.titulos = ['t1', 't2', 't3']
      // console.log(`campos ${this.titulos}`)
    },
    async editar_elemento (elemento) {
      const element = await JSON.stringify(elemento)
      console.log(`editar ${element}`)
      console.log(elemento)
      this.$router.push({ name: 'elemento', params: { tabla: this.tabla, existe: element, editar: this.edits, borrar: this.deletes } })
      // llamara funcion para editar ese elemento
    },
    eliminar_elemento (elemento) {
      console.log('eliminar')
    },
    cambiar_botones () {
      if (this.editar === 'true') {
        this.edits = true
      }
      if (this.borrar === 'true') {
        this.deletes = true
      }
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
  async mounted () {
    this.elemento_nombre = this.tabla.slice(0, -1)
    await this.get_token()
    this.cambiar_botones()
    // this.tabla = this.$route.params.tabla
    // console.log('tabla es ', this.tabla)
    // console.log('edita ', this.edits)
    // console.log('borrar es ', this.deletes)
    // console.log(this.$route.params)
    await this.leer_campos()
    await this.leer_elementos()
  }
}
</script>

<style scoped>
</style>
