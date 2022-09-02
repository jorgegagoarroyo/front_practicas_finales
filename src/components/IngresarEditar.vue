<template>
<div class="container  rounded">
    <form class="border p-4" name="formulario1">
        <div class="dato m-3 row" v-for="(titulo, index) in titulos" :key="index">
            <label class="col ">{{titulo}}</label>
            <input v-if="existe[titulo]" class="form-contol col-10" :type=tipos[titulo] :name=titulo  :value="`${data_existe[titulo]}`" >
            <input v-else class="form-contol col-10" :type=tipos[titulo] :name=titulo>
        </div>
        <div class="row ">
          <span class="col-2 bg-secondary text-white offset-2 btn"  @click.stop="">CANCELAR</span>
          <span class="col-4"></span>
          <span class="col-2 bg-primary text-white btn" v-if="nuevo" @click="obt_datos">AGREGAR</span>
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
    tabla: { default: 'alumnos' },
    nuevo: { type: Boolean, default: true },
    existe: { type: Object, default: () => ({}) }
  },
  data () {
    return {
      titulos: [],
      tipos: [],
      datos: {},
      data_existe: this.existe
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
      console.log(uri)
      const titles = await fetch(uri, {
        method: 'GET'
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
        console.log('no hay tipos')
        // retornara al anteior router.back()?
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
    obt_datos () {
      // console.log('datos')
      const datosForm = document.formulario1
      // console.log(`datos formularios ${datosForm.length}`, datosForm)
      // console.log('datos formularios', datosForm[3].name, datosForm[3].value)
      for (let i = 0; i < datosForm.length; i++) {
        // console.log(i, datosForm[i].name, datosForm[i].value)
        this.datos[datosForm[i].name] = datosForm[i].value
      }
      this.enviar_datos()
    },
    enviar_datos () {
      console.log(this.datos)
      // const uri = `http://localhost:4000/api/${this.tabla}`
      // let temp = this.datos
      // temp = { campos: temp }
      // // console.log(temp)
      // fetch(uri, {
      //   method: 'POST',
      //   body: temp
      // })
    }
  },
  mounted () {
    console.log(this.existe)
    console.log(this.data_existe.nombre)
    this.leer_campos()
  }
}
</script>

<style scoped>
</style>
