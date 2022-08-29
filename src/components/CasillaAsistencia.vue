<template>
<div class="row" >
    <div class="col " >
        <span v-if="!est" class="altura border" @click="estado">
          <span v-if="asis">
              {{val.nombre}}
          </span>
          <span v-else class="nada">
            '_'
          </span>
        </span>
        <span v-else class="altura"  >
            <select name="asistencia" @change="sele()" v-model="val" >
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
      estudiante: this.alumno
    }
  },
  props: {
    valores: { required: true },
    horario: { required: true },
    alumno: { required: true }
  },
  methods: {
    estado () {
      this.est = !this.est
    },
    async sele (e) {
      // console.log('e ', this.val)
      this.estado()
      if (this.asis) {
        this.act_asis()
      } else {
        this.nuevo()
      }
      // console.log(this.alumno, this.horario)
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
    }
  },
  mounted () {
    this.existe()
  }
}
</script>

<style scope>
.altura{
    height: 1rem;
}
.nada{
  color: transparent;
}

</style>
