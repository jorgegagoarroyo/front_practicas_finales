<template>
<div class="container">
  <div class="row">
    <div class="tabla">{{tabla}}</div>
  </div>
    <div class="row">
        <table>
            <thead>
                <tr>
                    <th v-for="(titulo, index) in titulos" :key='index'>{{titulo}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(dato, index) in datos" :key="index">
                    <td class='col' v-for="(titulo, index) in titulos" :key='index'>  {{dato[titulo]}}  </td>
                    <!-- <td v-show='edit' class='bg-primary rounded border col-1 ' > editar </td>
                    <td v-show='dele' class='bg-danger rounded col-1'> eliminar </td> -->
                    <td class='col-2'>
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
    tabla: { type: String, default: () => ('def'), required: true },
    editar: { default: false },
    borrar: { default: false }
    // titulo: { default: () => (['t1', 't2', 't3']) },
    // dato: { default: () => ([{ t1: 'a', t2: 'b', t3: 'c' }, { t1: 'd', t2: 'e', t3: 'f' }, { t1: 'g', t2: 'h', t3: 'i' }]) }
  },
  data () {
    return {
      edits: this.editar,
      deletes: this.borrar,
      titulos: [],
      datos: []
    }
  },
  methods: {
    async leer_elementos () {
      const uri = `http://localhost:4000/api/${this.tabla}`
      // console.log(uri)
      this.datos = await fetch(uri, {
        method: 'GET'
      })
      this.datos = [{ t1: 'a', t2: 'b', t3: 'c' }, { t1: 'd', t2: 'e', t3: 'f' }, { t1: 'g', t2: 'h', t3: 'i' }]
      // console.log(`leer ${this.datos.status}`)
      this.cant += 1
    },
    async leer_campos () {
      const uri = `http://localhost:4000/api/${this.tabla}/campos`
      // console.log(uri)
      this.titulos = await fetch(uri, {
        method: 'GET'
      })
      this.titulos = ['t1', 't2', 't3']
      // console.log(`campos ${this.titulos}`)
    },
    editar_elemento (elemento) {
      const element = JSON.stringify(elemento)
      console.log(`editar ${element}`)
      // llamara funcion para editar ese elemento
    },
    eliminar_elemento (elemento) {
      console.log('eliminar')
    }
  },
  async mounted () {
    await this.leer_campos()
    await this.leer_elementos()
  }
}
</script>

<style scoped>
</style>
