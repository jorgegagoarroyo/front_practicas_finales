<template>
  <div class="container">
    <!-- <lista-datos :tabla="'cursos'" :editar="'a'" :borrar="true" :titulo="['t1', 't3']"/> -->
    <!-- <ingresar-editar :existe="{ nombre: 'hola', apellido2: 'apellidos' }" /> -->
    <ingresar-user />
    <!-- <casilla-asistencia />
    <casilla-asistencia />
    <casilla-asistencia /> -->
    <!-- <multi-test/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import ListaDatos from '../components/ListaDatos.vue'
// import IngresarEditar from '../components/IngresarEditar.vue'
import IngresarUser from '../components/IngresarUser.vue'
// import CasillaAsistencia from '../components/CasillaAsistencia.vue'
// import MultiTest from '../components/MultiTest.vue'

export default {
  name: 'ListaView',
  components: {
    //  ListaDatos
    // IngresarEditar
    IngresarUser
    // CasillaAsistencia
    // MultiTest
  }
}
</script>
