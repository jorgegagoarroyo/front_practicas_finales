<template>
<div class="container  rounded">
    <form class="border p-4" v-if="cambios || done" name="formulario1">
        <div class="m-3 row" v-for="(titulo, index) in titulos" :key="index">
          <template v-if="listas[titulo]">
              <label class="col">{{titulo}}</label>
              <select class="col-10" :name="titulo">
                <template v-for="val in listas[titulo]" >
                  <template v-if="val.id === data_existe[titulo]">
                    <option  :value="val.id" :key="val.id" selected>{{val.nombre}}</option>
                  </template>
                  <template v-else>
                    <option  :value="val.id" :key="val.id">{{val.nombre}}</option>
                  </template>
                </template>
              </select>
            </template>
            <template v-else>
              <label class="col-2 ">{{titulo}}</label>
              <!-- <input :v-if="existe[titulo]" class="form-contol col-10" :type=tipos[titulo] :name=titulo  :value="data_existe[titulo]"/>
               -->
               <input class="form-contol col-10" :type=tipos[titulo] :name=titulo  :value="data_existe[titulo]"/>
            </template>
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
export default {
  name: 'IngresarEditar',
  props: {
    tabla: { require: true },
    existe: {},
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
      done: false,
      token: '',
      listas: {}
    }
  },
  methods: {
    async leer_elementos () {
      const uri = `http://localhost:4000/api/${this.tabla}`
      this.datos = await fetch(uri, {
        method: 'GET'
      })
    },
    async leer_campos () {
      const uri = `http://localhost:4000/api/${this.tabla}/campos`
      const titles = await fetch(uri, {
        method: 'GET',
        headers: {
          authorization: `bearer ${this.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
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
      this.crear_selects()
    },
    async crear_selects () {
      // console.log(this.titulos)
      const keys = Object.keys(this.titulos)
      console.log(keys)
      const rel = /id_/
      for (const val in keys) {
        console.log(val)
        console.log(keys[val])
        if (rel.test(keys[val])) {
          console.log(keys[val])
          let tempName = keys[val].split('_')
          tempName = tempName[1]
          await this.leer_campos_rels(tempName, keys[val])
        }
        this.done = true
      }
    },
    async leer_campos_rels (tabla, nombre) {
      if (tabla === 'empleados' || tabla === 'profesor') {
        tabla = 'usuarios'
      }
      if (tabla === 'clasecurso' || tabla === 'clasescursos') {
        tabla = 'clases_curso'
      }
      const uri = `http://localhost:4000/api/${tabla}/get`
      let vals = await fetch(uri, {
        method: 'POST',
        headers: {
          authorization: `bearer ${this.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
      vals = await vals.json()
      // console.log(vals)
      this.listas[nombre] = vals.resul
      // console.log(this.listas)
    },
    obt_datos (event, nuevo = false) {
      // console.log('obt_datos ', nuevo)
      const datosForm = document.formulario1
      for (let i = 0; i < datosForm.length; i++) {
        this.datos[datosForm[i].name] = datosForm[i].value
      }
      // console.log(datosForm.test.value)
      // console.log('datos ', this.datos)
      // console.log('existe ', this.data_existe)
      if (this.datos.pass === this.data_existe.pass) {
        delete this.datos.pass
      }
      console.log('datos obt ', this.datos)
      if (!nuevo) {
        return this.enviar_datos_editados()
      }
      this.enviar_datos_nuevos()
    },
    async enviar_datos_nuevos () {
      // console.log('datos nuevos')
      const uri = `http://localhost:4000/api/${this.tabla}`
      let temp = this.datos
      temp = { campos: temp }
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
      // console.log(res.status)
      if (res.status === 200) {
        this.cancel_edit()
      }
    },
    cancel_edit () {
      this.$router.push({ name: 'lista', params: { tabla: this.tabla, editar: this.editar, borrar: this.editar } })
    },
    async cambio_props () {
      if (this.existe) {
        this.data_existe = JSON.parse(this.existe)
      }
      console.log('existe ', this.existe)
      this.cambios = true
    }
  },
  async mounted () {
    let token = localStorage.getItem('control')
    token = await JSON.parse(token)
    this.token = token.token
    this.leer_campos()
    this.cambio_props()
    if (this.data_existe.pass) {
      this.data_existe.pass = ''
    }
  }
}
</script>

<style scoped>
</style>
