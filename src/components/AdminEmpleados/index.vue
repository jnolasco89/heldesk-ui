<template>
  <v-container fluid>
    <v-layout align-center justify-start row fill-height>
      <v-flex xs2 sm2 md2>
        <h1>Empleados</h1>
      </v-flex>
    </v-layout>
    <v-layout align-start justify-start row fill-height>
      <v-flex xs5 sm5 md5>
        <v-text-field label="Buscar" prepend-icon="search" class="input-buscar"></v-text-field>
      </v-flex>
      <v-flex xs2 sm2 md2>
        <v-btn color="primary" small>
          Buscar
          <v-icon right dark>check</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout align-cente justify-center row fill-height>
      <v-flex xs12 sm12 md12>
        <v-divider horizontal></v-divider>
        <v-divider horizontal class="divisor"></v-divider>
      </v-flex>
    </v-layout>
    <v-layout row align-start justify-center>
      <v-flex xs12 sm12 md12>
          
        <tabla-empleados></tabla-empleados>
        
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import tablaEmpleados from "@/components/AdminEmpleados/tablaEmpleados";
import { resolve } from "q";

export default {
  name: "index-empleados",
  components: {
    tablaEmpleados
  },
  data() {
    return {
      iniRango: 0,
      finRango: 9
    };
  }
};
</script>
<style>
.input-buscar {
  padding-top: 1px !important;
}

.divisor {
  margin-bottom: 15px !important;
}
</style>

