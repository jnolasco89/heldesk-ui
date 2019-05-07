<template>
  <v-card flat class="elevation-5">
    <v-container grid-list-md>
      <v-layout row wrap align-center>
        <v-flex xs4 sm4 md4>
          <v-select
            :items="filtrosAmostrar"
            item-value="id"
            item-text="texto"
            v-model="filtroSeleccionado"
            label="Filtrar por"
            prepend-icon="filter_list"
          ></v-select>
        </v-flex>
        <v-btn color="primary" small>
          Imprimir
          <v-icon right dark>local_printshop</v-icon>
        </v-btn>
        <v-flex xs4 sm4 md4></v-flex>
      </v-layout>
    </v-container>
    <v-card-text>
      <v-data-table
        :headers="cabeceras"
        :items="marcacionesFiltradas"
        class="elevation-1"
        hide-actions
      >
        <template slot="headers" slot-scope="propiedades">
          <tr>
            <th v-for="cabecera in propiedades.headers" :key="cabecera.value">{{cabecera.texto}}</th>
          </tr>
        </template>
        <template v-slot:items="propiedades">
          <tr v-bind:class="[propiedades.item.tipo.clase]">
            <td>{{propiedades.item.dia}}</td>
            <td>{{propiedades.item.fecha}}</td>
            <td>{{marcacionesTxtDia(propiedades.item.manana)}}</td>
            <td>{{marcacionesTxtDia(propiedades.item.tarde)}}</td>
          </tr>
        </template>
        <template slot="no-data">
          <v-alert :value="true" color="error" icon="warning">No hay datos para mostrar</v-alert>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "tabla-marcaciones",
  props: {
    cabeceras: {
      type: Array,
      default: function() {
        return [{ texto: "", value: "sindatos" }];
      }
    },
    data: {
      type: Array,
      default: function() {
        return [];
      }
    },
    filtros: {
      type: Array,
      default: function() {
        return [
          {
            text: "Sin filtros a mostrar"
          }
        ];
      }
    }
  },
  data() {
    return {
      filtroSeleccionado: 0
      /*
      cabecerasAmostrar: this.cabeceras,
      dataAmostrar: this.data
      */
    };
  },
  computed: {
    filtrosAmostrar: function() {
      let filtrosAretornar = [
        {
          text: "Sin filtros a mostrar"
        }
      ];

      if (this.filtros != null) {
        if (this.filtros.length > 0) {
          filtrosAretornar = this.filtros;
        }
      }

      return filtrosAretornar;
    },
    marcacionesFiltradas: function() {
      let filtradas = [];

      if (this.filtroSeleccionado == 0) {
        filtradas = this.data;
      } else {
        let self = this;
        this.data.forEach(function(item) {
          if (item.tipo.id == self.filtroSeleccionado) {
            filtradas.push(item);
          }
        });
      }
      return filtradas;
    }
  },
  methods: {
    marcacionesTxtDia: function(marcaciones) {
      let marcacionesTxt = "";
      marcaciones.forEach(function(marcacion) {
        marcacionesTxt += marcacion + ", ";
      });

      marcacionesTxt =
        marcacionesTxt.length > 0
          ? marcacionesTxt.substring(0, marcacionesTxt.length - 2)
          : "Sin marcaciones";
      return marcacionesTxt;
    }
  }
};
</script>
<style>
.sin-marcaciones td {
  background-color: red;
  color: white;
}

.una-marcacion-periodo td {
  background-color: rgb(255, 164, 32);
  color: white;
}

.marcaciones-en-un-periodo td {
  background-color: yellow;
}

.marcaciones-full td {
  background-color: green;
  color: white;
}
</style>
