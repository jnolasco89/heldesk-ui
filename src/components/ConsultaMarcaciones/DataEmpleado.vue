<template>
  <div>
    <h2>
      <p class="text-md-center">{{leyendaMarcacion}}</p>
    </h2>
    <v-card>
      <v-toolbar dense color="dafult" class="elevation-1">
        <v-spacer></v-spacer>
        <v-toolbar-title>Datos del empleado</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-list dense>
          <v-list-tile>
            <v-list-tile-content class="align-left">Codigo de asistencia</v-list-tile-content>
            <v-list-tile-content class="align-end">
           <!--
                    <v-text-field
              v-model="dataEmpleado.codigoMarcacion"
              readonly
            ></v-text-field>-->
              <b>{{dataEmpleado.codAsistencia}}</b>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content class="align-left">NIT</v-list-tile-content>
            <v-list-tile-content class="align-end">
              <b>{{dataEmpleado.nit}}</b>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content class="align-left">Nombre</v-list-tile-content>
            <v-list-tile-content class="align-end">
              <b>{{dataEmpleado.nombre}}</b>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content class="align-left">Departamento</v-list-tile-content>
            <v-list-tile-content class="align-end">
              <b>{{dataEmpleado.departamento}}</b>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content class="align-left">Cargo</v-list-tile-content>
            <v-list-tile-content class="align-end">
              <b>{{dataEmpleado.cargo}}</b>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content class="align-left">Ubicación</v-list-tile-content>
            <v-list-tile-content class="align-end">
              <b>{{dataEmpleado.ubicacion}}</b>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "marcacion-data-empleado",
  props: {
    dataEmpleado: {
      type: Object,
      default: function() {
        return {
          codigoMarcacion: "Sin información (ui)",
          nit: "Sin información (ui)",
          nombre: "Sin información (ui)",
          departamento: "Sin información (ui)",
          cargo: "Sin información (ui)",
          ubicacion: "Sin información (ui)"
        };
      }
    },
    anio: {
      type: Number,
      default: 0
    },
    mes: {
      type: String,
      default: null
    }
  },
  /*
  data() {
    return {
      empleado: this.dataEmpleado,
      anioAmostrar: this.anio,
      mesAmostrar: this.mes
    };
  },
  */
  watch:{
    empleado: function(val){
      this.empleado=val;
    }
  },
  computed: {
    leyendaMarcacion: function() {
      if (this.anio > 0 && this.mes != null) {
        return (
          "Marcaciones del mes de " +
          this.mes +
          " de " +
          this.anio
        );
      } else {
        return "Sin información (ui)";
      }
    }
  }
};
</script>
