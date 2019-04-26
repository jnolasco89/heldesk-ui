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
            <v-list-tile-content class="align-left">Codigo de marcación</v-list-tile-content>
            <v-list-tile-content class="align-end">
              <b>{{empleado.codigoMarcacion}}</b>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content class="align-left">NIT</v-list-tile-content>
            <v-list-tile-content class="align-end">
              <b>{{empleado.nit}}</b>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content class="align-left">Nombre</v-list-tile-content>
            <v-list-tile-content class="align-end">
              <b>{{empleado.nombre}}</b>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content class="align-left">Departamento</v-list-tile-content>
            <v-list-tile-content class="align-end">
              <b>{{empleado.departamento}}</b>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content class="align-left">Cargo</v-list-tile-content>
            <v-list-tile-content class="align-end">
              <b>{{empleado.cargo}}</b>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-content class="align-left">Ubicación</v-list-tile-content>
            <v-list-tile-content class="align-end">
              <b>{{empleado.ubicacion}}</b>
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
    datosEmpleado: {
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
  data() {
    return {
      empleado: this.datosEmpleado,
      anioAmostrar: this.anio,
      mesAmostrar: this.mes
    };
  },
  computed: {
    leyendaMarcacion: function() {
      if (this.anioAmostrar > 0 && this.mesAmostrar != null) {
        return (
          "Marcaciones del mes de " +
          this.mesAmostrar +
          " de " +
          this.anioAmostrar
        );
      } else {
        return "Sin información (ui)";
      }
    }
  }
};
</script>
