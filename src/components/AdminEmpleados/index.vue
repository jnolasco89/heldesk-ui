<template>
<div v-if="isLoadData">
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
            empleados:[{
                codAsistencia:201,
                nombreCompleto:"Jose Nolsco"
            },
            {
                codAsistencia:201,
                nombreCompleto:"Jose Nolsco"
            },
            {
                codAsistencia:201,
                nombreCompleto:"Jose Nolsco"
            },
            {
                codAsistencia:201,
                nombreCompleto:"Jose Nolsco"
            }
            ],
            iniRango:0,
            finRango:9,
            isLoadData:false
        }
    }
    /*
    ,
    mounted(){
      

      this.$http
      .get("usuario/empleados/"+this.iniRango+"/"+this.finRango)
      .then( response => {
          this.isLoadData=true
          this.empleados=response.data
          this.$eventBus.$emit("mostrarCargando",false);
      })
      .catch( error => {
          alert(error)
          this.$eventBus.$emit("mostrarCargando",false);
      })
  }*/
}
</script>

