<template>
<div class="row" >
    <div class="col " >
        <span v-if="!est" class="altura border" @click="estado">
          <span v-if="asis">
              {{val}}
          </span>
          <span v-else class="nada">
            '_'
          </span>
        </span>
        <span v-else class="altura"  >
            <select name="asistencia" @change="sele()" v-model="val" >
                <option v-for="(opt, index) in opts" :value="opt" :key="index">{{opt}}</option>
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
    // valor: { default: ' ' },
    horario: { required: true },
    alumno: { required: true }
  },
  methods: {
    estado () {
      this.est = !this.est
    },
    async sele () {
      // // const uri = 'http://localhost:4000/api/asistencias'
      // // let token = localStorage.getItem('control')
      // // token = JSON.parse(token)
      // // console.log('pasamos', this.horario, this.alumno, this.val)
      // // const res = await fetch(uri, {
      // //   method: 'POST',
      // //   headers: {
      // //     authorization: `bearer ${token.token}`,
      // //     'Content-type': 'application/json; charset=UTF-8'
      // //   },
      // //   body: JSON.stringify({
      // //     campos: {
      // //       id_alumno: this.alumno,
      // //       id_horarios: this.horario,
      // //       id_codigos: this.val
      // //     }
      // //   })
      // // })
      // if (res.status === 200) {
      this.estado()
      this.asis = true
      //   console.log('ok')
      // } else {
      //   console.log(res)
      // }
      console.log(this.alumno, this.horario)
    },
    async existe () { // cambiar funcine s afuturo <------------------------------
      const uri = 'http://localhost:4000/api/asistencias'
      let token = localStorage.getItem('control')
      token = JSON.parse(token)
      console.log('pasamos', this.horario, this.alumno, this.val)
      const res = await fetch(uri, {
        method: 'POST',
        headers: {
          authorization: `bearer ${token.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          campos: {
            id_alumno: this.alumno,
            id_horarios: this.horario,
            id_codigos: this.val
          }
        })
      })
      if (res.status === 200) {
        this.estado()
      }
    },
    async nuevo () {
      const uri = 'http://localhost:4000/api/asistencias'
      let token = localStorage.getItem('control')
      token = JSON.parse(token)
      console.log('pasamos', this.horario, this.alumno, this.val)
      const res = await fetch(uri, {
        method: 'POST',
        headers: {
          authorization: `bearer ${token.token}`,
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          campos: {
            id_alumno: this.alumno,
            id_horarios: this.horario,
            id_codigos: this.val
          }
        })
      })
      if (res.status === 200) {
        this.estado()
        this.asis = true
      }
    }
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
