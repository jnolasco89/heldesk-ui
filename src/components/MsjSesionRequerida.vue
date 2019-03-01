<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs10 sm6 md4 lg3 xl3>
      <v-card class="elevation-12">
        <i class="material-icons size-warning">warning</i>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Inicio de sesion requerido</h3>
            <div>Debe iniciar sesion para poder ingresar a este recurso del sistema</div>
          </div>
        </v-card-title>
        <v-card-actions>
          <v-layout justify-center>
            <v-btn @click="irAlogin">Ir a login
              <v-icon right dark>arrow_forward</v-icon>
            </v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
    name:'MsjSesionRequerida',
    data(){
        return {
            icono:'warning'
        }
    },
    methods:{
        irAlogin:function(){
            this.$router.push({ name: "Login"});
        }
    },
    mounted() {
      this.$emit('componenteCargado',1)
    }
}
</script>
<style>
.size-warning{
    font-size: 80px;
    color:darkorange;
}
</style>
