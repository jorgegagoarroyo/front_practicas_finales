<template>
<div class="row">
  <div class="col-12 bg-secondary altura" v-if="fiesta">
  </div>
  <div class="col m-0 p-0" v-else >
        <!-- <span v-if="!est" class="altura border col-12" @click="estado"> -->
        <span v-if="est === false" class="altura" @click="estado(true)">
            <span v-if="asis" :title="val.descripcion">
              {{val.nombre}}
            </span>
            <span v-else class="nada">
              '_'
            </span>
        </span>
        <span v-else class="altura"  >
            <select class="m-0 p-0" name="asistencia" @change="sele()" v-model="val" >
                <option v-for="(opt, index) in valores" :value="opt" :key="index" :title="opt.descripcion">{{opt.nombre}}</option>
            </select>
        </span>
  </div>
</div>
</template>

<script>
export default {
  name: 'CasillaAsistencia',
  data () {
    return {
      id: 0,
      asis: false,
      est: false,
      val: ' ',
      opts: this.valores,
      hora: this.horario,
      estudiante: this.alumno,
      fiesta: false
    }
  },
  props: {
    valores: { required: true },
    horario: { required: true },
    alumno: { required: true }
  },
  methods: {
    estado (x) {
      this.est = x
      console.log('estado ', this.est)
    },
    async sele () {
      console.log('sele ', this.val, this.est)
      this.estado(false)
      // this.est = false
      if (this.asis) {
        this.act_asis()
      } else {
        this.nuevo()
      }
      // console.log(this.alumno, this.horario)
      console.log('post sele ', this.val, this.est)
    },
    async existe () {
      // let exis = false
      const uri = 'http://localhost:4000/api/asistencias/get'
      let token = localStorage.getItem('control')
      token = JSON.parse(token)
      // console.log('pasamos', this.horario, this.alumno, this.val)
      let res = await fetch(uri, {
        method: 'POST',
        headers: {
          authorization: `bearer ${token.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          campos: {
            id_alumnos: this.alumno.id,
            id_horarios: this.horario.id
          }
        })
      })
      if (res.status === 200) {
        res = await res.json()
        res = res.resul
        // console.log(this.alumno.apellido1, res)
        if (res.length < 1 || res.length > 1) {
          return 0
        }
        const registrado = await this.valores.find((element) => {
          // console.log(element.id, res[0].id_codigos)
          if (element.id !== res[0].id_codigos) {
            return 0
          }
          return true
        })
        // console.log(this.valores)
        // console.log(this.alumno.apellido1, registrado, res)
        if (!registrado || registrado === -1) {
          return 0
        }
        this.asis = true
        this.val = registrado
        this.id = res[0].id
      }
    },
    async nuevo () {
      const uri = 'http://localhost:4000/api/asistencias'
      let token = localStorage.getItem('control')
      token = JSON.parse(token)
      // console.log('pasamos', this.horario, this.alumno, this.val)
      const res = await fetch(uri, {
        method: 'POST',
        headers: {
          authorization: `bearer ${token.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          campos: {
            id_alumnos: this.alumno.id,
            id_horarios: this.horario.id,
            id_codigos: this.val.id
          }
        })
      })
      if (res.status === 200) {
        // this.estado()
        this.existe()
      }
    },
    async act_asis () {
      const uri = 'http://localhost:4000/api/asistencias'
      let token = localStorage.getItem('control')
      token = JSON.parse(token)
      const res = await fetch(uri, {
        method: 'PUT',
        headers: {
          authorization: `bearer ${token.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          campos: {
            id: this.id,
            id_alumnos: this.alumno.id,
            id_horarios: this.horario.id,
            id_codigos: this.val.id
          }
        })
      })
      if (res.status === 200) {
        // this.estado()
      }
    },
    async festivos () {
      const uri = 'http://localhost:4000/api/fechas/get'
      let token = localStorage.getItem('control')
      token = JSON.parse(token)
      let res = await fetch(uri, {
        method: 'POST',
        headers: {
          authorization: `bearer ${token.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          campos: {
            id: this.horario.id_fechas
          }
        })
      })
      res = await res.json()
      res = res.resul
      // console.log('horario ', this.horario, res[0].festivo)
      this.fiesta = res[0].festivo
      // console.log('fiesta ', this.fiesta)
    }
  },
  mounted () {
    this.festivos()
    if (!this.fiesta) {
      this.existe()
    }
    // console.log(this.festivo)
  }
}
</script>

<style scope>
*{
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
.altura{
    /* height: 1rem; */
    height: 100%;
}
.nada{
  color: transparent;
}
.w-f{
  width: 100%;
}
.act{
  border: solid red;
}
.act2{
  border: solid blue;
}
select {
  width: 95%
}
option {
  width: 95%
}
</style>
