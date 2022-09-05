<template>
  <nav v-if="this.$route.path !== '/'">
    <!-- v-if="this.$route.path !== '/'" -->
    <!-- <router-link to="/">Home</router-link> -->
    <!-- <router-link to="/about">About</router-link> -->
    <!-- <template v-if="profesor || secretaria">
      | <router-link to="/panel">asistencias</router-link>
      | <router-link :to="{ name: 'lista', params: { tabla: 'alumnos', editar: false} }">alumnos</router-link>
    </template> -->
    <template v-if="rol === 'admin'">
      <router-link :to="{ name: 'lista', params: { tabla: 'alumnos', editar: true, borrar: true} }">alumnos</router-link> |
      <router-link :to="{ name: 'lista', params: { tabla: 'aulas', editar: true, borrar: true} }">aulas</router-link> |
      <router-link :to="{ name: 'lista', params: { tabla: 'ciclos', editar: true, borrar: true} }">ciclos</router-link> |
      <router-link :to="{ name: 'lista', params: { tabla: 'codigos', editar: true, borrar: true} }">codigos</router-link> |
      <router-link :to="{ name: 'lista', params: { tabla: 'cursos', editar: true, borrar: true} }">cursos</router-link> |
      <router-link :to="{ name: 'lista', params: { tabla: 'usuarios', editar: true, borrar: true} }">usuario</router-link> |
      <router-link :to="{ name: 'lista', params: { tabla: 'horas', editar: true, borrar: true} }">horas</router-link> |
      <router-link :to="{ name: 'lista', params: { tabla: 'semanas', editar: true, borrar: true} }">semanas</router-link> |
      <router-link :to="{ name: 'lista', params: { tabla: 'clase_alumno', editar: true, borrar: true} }">clases-alumno</router-link> |
      <router-link :to="{ name: 'lista', params: { tabla: 'clases', editar: true, borrar: true} }">clases</router-link> |
      <router-link :to="{ name: 'lista', params: { tabla: 'clases_curso', editar: true, borrar: true} }">clases_curso</router-link> |
      <router-link :to="{ name: 'lista', params: { tabla: 'fechas', editar: true, borrar: true} }">fechas</router-link> |
      <router-link :to="{ name: 'lista', params: { tabla: 'horarios', editar: true, borrar: true} }">horarios</router-link> |
      <router-link :to="{ name: 'lista', params: { tabla: 'roles', editar: true, borrar: true} }">roles</router-link> |
      <router-link :to="{ name: 'lista', params: { tabla: 'ufs', editar: true, borrar: true} }">ufs</router-link> |
      <router-link :to="{ name: 'lista', params: { tabla: 'modulos', editar: true, borrar: true} }">modulos</router-link> |

      <router-link to="/panel_filtro">asistencias</router-link>
    </template>
  </nav>
  <router-view @cambio_rol="nuevo_rol" />
</template>
<script>
export default {
  data () {
    return {
      // profesor: false,
      // secretaria: false,
      // admin: false
      rol: ''
    }
  },
  methods: {
    nuevo_rol () {
      let temp = localStorage.getItem('control')
      if (!temp) {
        this.$router.push('/')
        return 0
      }
      temp = JSON.parse(temp)
      temp = temp.rol
      this.rol = temp
    }
  },
  mounted () {
    this.nuevo_rol()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
