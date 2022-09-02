<template>
<div class="container">
  <form class="m-4 p-4">
    <div class="row mt-4">
        <label>Usuario</label>
        <input type = "text"
        v-model = "usuario.email"
        class = "from-control col-6 offset-3">
    </div>
    <div class="row mt-4">
        <label>Password</label>
        <input type = "text"
        v-model = "usuario.pass"
        class = "from-control col-6 offset-3">
    </div>
    <div class="row mt-4 col-3 offset-6">
        <button class="btn btn-primary" @click="ingreso">Ingresar</button>
    </div>
  </form>
</div>
</template>

<script>
export default {
  name: 'IngresarUser',
  data () {
    return {
      usuario: {
        email: '',
        pass: ''
      },
      ls_key: 'control'
    }
  },
  methods: {
    async ingreso (e) {
      try {
        e.preventDefault()
        // console.log('user', this.usuario.email, 'pass', this.usuario.pass)
        // console.log(this.usuario)
        const req = await fetch('http://localhost:4000/api/usuarios/ingresar', {
          method: 'POST',
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
          // body: JSON.stringify(this.usuario)
          body: JSON.stringify({
            campos: {
              email: this.usuario.email,
              pass: this.usuario.pass
            }
          })
        })
        const res = await req.json()
        // if (res.status === 200) {
        localStorage.setItem(this.ls_key, JSON.stringify(res))
        // console.log('response', res)
        this.resetEstado()
        this.$emit('cambio_rol')// <-----------------------------------------------------------
        // console.log(localStorage)
        this.$router.push('/blank')
        // } else {
        //   throw { mensaje: 'error en status server', res }
        // }
      } catch (error) {
        console.log('error en ingreso', error)
      }
    },
    resetEstado () {
      this.usuario.email = ''
      this.usuario.pass = ''
    }
  },
  mounted () {
    localStorage.removeItem(this.ls_key)
    // console.log(localStorage)
  }
}
</script>

<style>
</style>
