<template>
  <v-layout row wrap align-center justify-center>
    <v-flex xs6 sm6 md4>
      <v-select :items="usuarios" label="Seleccione un usuario" prepend-icon="supervisor_account"></v-select>
    </v-flex>
    <v-flex xs6 sm6x md4>
      <v-menu
        :close-on-content-click="false"
        v-model="datePickerVisible"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="fechaFormateada"
          label="Mes consulta"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker
          v-model="fecha"
          type="month"
          locale="es"
          @input="datePickerVisible = false"
          scrollable
        ></v-date-picker>
      </v-menu>
    </v-flex>

    <v-flex xs12 sm12 md12>
      <v-btn color="primary" small @click="consultarMarcaciones">
        Consultar
        <v-icon right dark>check</v-icon>
      </v-btn>
      <v-divider horizontal></v-divider>
      <v-divider horizontal></v-divider>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
    name: 'controles-marcaciones',
    data() {
    return {
      fechaActual: new Date(),
      fecha: new Date().toISOString().substr(0, 10),
      datePickerVisible: false,
      usuarios: [
        /*
        { text: "Jose Nolasco", callback: () => console.log("jn") },
        { text: "Edgardo Rodriguez", callback: () => console.log("ed") },
        { text: "Juan Perez", callback: () => console.log("jp") }
        */
      ]
    };
  },
  computed: {
    fechaFormateada: function() {
      return this.$moment(this.fecha).format("MMMM - YYYY");
    }
  },
  methods:{
    consultarMarcaciones:function(){
      var mes=this.$moment(this.fecha).format("MM");
      var anio=this.$moment(this.fecha).format("YYYY");
      this.$emit("consultarMarcaciones",mes,anio);
    }
  }
}
</script>