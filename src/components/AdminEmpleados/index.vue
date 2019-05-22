<template>
<div>
    <h1>ADMIN EM</h1>
    <tabla-empleados :empleados="empleados"></tabla-empleados>
</div>
</template>
<script>
import tablaEmpleados from '@/components/AdminEmpleados/tablaEmpleados'

export default {
    name:"tabla-empleados",
    components:{
        tablaEmpleados
    },
    data(){
        return {
            empleados:[],
            iniRango:0,
            finRango:9,
            isLoadData:false
        }
    },
    mounted(){
      this.$eventBus.$emit("mostrarCargando",false);

      this.$http
      .get("usuario/empleados/"+this.iniRango+"/"+this.finRango)
      .then( response => {
          this.isLoadData=true
          this.empleados=response.data
      })
      .catch( error => {
          alert(error)
      })
  },
}
</script>

