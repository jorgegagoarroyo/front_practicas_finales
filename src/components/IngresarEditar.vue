<template>
<div class="container  rounded">
    <form class="border p-4" v-if="cambios" name="formulario1">
        <div class="m-3 row" v-for="(titulo, index) in titulos" :key="index">
            <label class="col ">{{titulo}}</label>
            <input :v-if="existe[titulo]" class="form-contol col-10" :type=tipos[titulo] :name=titulo  :value="data_existe[titulo]"/>
            <!-- <input :v-if="!existe[titulo]" class="form-contol col-10" :type=tipos[titulo] :name=titulo>
            {{data_existe[titulo]}} -->
        </div>
        <div class="row ">
          <span class="col-2 bg-secondary text-white offset-2 btn"  @click.stop="cancel_edit">CANCELAR</span>
          <span class="col-4"></span>
          <span class="col-2 bg-primary text-white btn" v-if="!existe" @click="obt_datos(e, true)">AGREGAR</span>
          <span class="col-2 bg-primary text-white btn" v-else @click="obt_datos">EDITAR</span>
          <span></span>
        </div>
    </form>
</div>
</template>

<script>
// falta boton y metodo cancelar y router a otra pagina
export default {
  name: 'IngresarEditar',
  props: {
    tabla: { require: true },
    existe: { default: false },
    editar: { require: true },
    borrar: { require: true }
  },
  data () {
    return {
      titulos: [],
      tipos: [],
      datos: {},
      data_existe: this.existe,
      cambios: false,
      token: ''
    }
  },
  methods: {
    async leer_elementos () {
      // quitar leera si hay datos en props y los colocara en el campo correspondiente
      const uri = `http://localhost:4000/api/${this.tabla}`
      this.datos = await fetch(uri, {
        method: 'GET'
      })
    },
    async leer_campos () {
      const uri = `http://localhost:4000/api/${this.tabla}/campos`
      // console.log(uri)
      const titles = await fetch(uri, {
        method: 'GET',
        headers: {
          authorization: `bearer ${this.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
      // console.log(await titles.json())
      this.titulos = await titles.json()
      this.titulos = this.titulos.fields
      if (this.titulos.id) {
        delete this.titulos.id
      }
      this.crear_tipos(this.titulos)
      this.titulos = Object.keys(this.titulos)
    },
    crear_tipos (lista = null) {
      if (!lista) {
        // console.log('no hay tipos')
        this.cancel_edit()
      }
      const number = /int/
      const dates = /date/
      const temp = {}
      for (const key in lista) {
        if (number.test(lista[key])) {
          temp[key] = 'number'
        } else if (dates.test(lista[key])) {
          temp[key] = 'date'
        } else {
          temp[key] = 'text'
        }
      }
      this.tipos = temp
    },
    obt_datos (event, nuevo = false) {
      // console.log('datos')
      console.log('obt_datos ', nuevo)
      const datosForm = document.formulario1
      // console.log(`datos formularios ${datosForm.length}`, datosForm)
      // console.log('datos formularios', datosForm[3].name, datosForm[3].value)
      for (let i = 0; i < datosForm.length; i++) {
        // console.log(i, datosForm[i].name, datosForm[i].value)
        this.datos[datosForm[i].name] = datosForm[i].value
      }
      if (!nuevo) {
        return this.enviar_datos_editados()
      }
      this.enviar_datos_nuevos()
    },
    async enviar_datos_nuevos () {
      // console.log(this.datos)
      console.log('datos nuevos')
      const uri = `http://localhost:4000/api/${this.tabla}`
      let temp = this.datos
      temp = { campos: temp }
      // console.log(temp)
      const res = await fetch(uri, {
        method: 'POST',
        headers: {
          authorization: `bearer ${this.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(temp)
      })
      if (res.status === 200) {
        this.cancel_edit()
      }
    },
    async enviar_datos_editados () {
      const uri = `http://localhost:4000/api/${this.tabla}`
      let temp = this.datos
      temp.id = this.data_existe.id
      console.log('temp editados ', temp)
      temp = { campos: temp }
      console.log('temp editados campo', temp)
      const res = await fetch(uri, {
        method: 'PUT',
        headers: {
          authorization: `bearer ${this.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(temp)
      })
      console.log(res.status)
      if (res.status === 200) {
        this.cancel_edit()
      }
      // res = await res.json()
      // console.log('editados datos ', res.status)
    },
    cancel_edit () {
      this.$router.push({ name: 'lista', params: { tabla: this.tabla, editar: this.editar, borrar: this.editar } })
    },
    async cambio_props () {
      if (this.existe) {
        this.data_existe = JSON.parse(this.existe)
        // console.log('datos existen ', this.data_existe)
      }
      this.cambios = true
    }
  },
  async mounted () {
    let token = localStorage.getItem('control')
    token = await JSON.parse(token)
    // console.log(token.token)
    this.token = token.token
    this.leer_campos()
    // console.log('tabla edicion ', this.existe)
    this.cambio_props()
  }
}
</script>

<style scoped>
</style>
