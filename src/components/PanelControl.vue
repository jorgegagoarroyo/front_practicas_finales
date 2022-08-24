<template>
  <div class="container-fluid">
    <!-- <div class="row">
        <div class="col"></div>
        <div class="row border m-2" v-for="( dia, index) in semana" :key="index">
          {{dia}}
            <div class="col " >
                <div class="col" v-for="(hora, index) in dia" :key="index">
                {{hora}}
                </div>
            </div>
        </div>
    </div> -->
    <!-- <div class="row"> -->
    <div class="container">
      <div>
        <table>
          <thead>
            <tr>
            <th scope="col"> alumnos </th>
            <span v-for="(dia, index) in semana" :key="index">
              <th scope="col" v-for="(hora, index) in dia" :key="index">dia-{{hora}}</th>
            </span>
          </tr>
          </thead>
          <tbody>
            <tr v-for="(alumno, index) in datos" :key="index">
            <td>{{alumno}}</td>
            <span v-for="(dia, index) in semana" :key="index">
              <td v-for="(hora, index) in dia" :key="index">{{alumno}}-{{hora}}</td>
            </span>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PanelControl',
  data () {
    return {
      keys: [],
      datos: { nombre: 'primero', nombre2: 'segundo', nombre3: 'tercero' },
      semana: {
        dia1: {
          hora1: 1,
          hora2: 2,
          hora3: 3,
          hora4: 4,
          hora5: 5
        },
        dia2: {
          hora1: 1,
          hora2: 2,
          hora3: 3,
          hora4: 4,
          hora5: 5
        }
      }
    }
  },
  mounted () {
    this.keys = Object.keys(this.semana)
    this.keys.forEach(element => {
      this.keys = Object.keys(element)
    })
    console.log(this.keys)
  }
}
</script>

<style scope>
.casilla{
  width: 50px;
  height: 50px;
  border: solid
}

</style>
