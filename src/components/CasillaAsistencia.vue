<template>
<div class="row">
    <div class="col">
        <span v-if="!est" class="" @click="estado">
            {{val}}
        </span>
        <span v-else class=""  >
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
      est: false,
      val: this.valor,
      opts: this.valores,
      hora: this.horario,
      estudiante: this.alumno
    }
  },
  props: {
    valores: { required: true },
    valor: { default: '  ' },
    horario: { required: true },
    alumno: { required: true }
  },
  methods: {
    estado () {
      this.est = !this.est
      console.log(this.est)
      let ls = localStorage.getItem('control')
      ls = JSON.parse(ls)
      console.log(ls)
    },
    async sele () {
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
        console.log('ok')
      } else {
        console.log(res)
      }
    }
  }
}
</script>

<style scope>
.casilla{
    width: 50px;
    height: 50px;
}

</style>
