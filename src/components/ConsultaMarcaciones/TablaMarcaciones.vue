<template>
  <v-card flat class="elevation-5">
    <v-container grid-list-md>
      <v-layout row wrap align-center>
        <v-flex xs4 sm4 md4>
          <v-select :items="filtrosAmostrar" label="Filtrar por" prepend-icon="filter_list"></v-select>
        </v-flex>
        <v-btn color="primary" small>Imprimir
          <v-icon right dark>local_printshop</v-icon>
        </v-btn>
        <v-flex xs4 sm4 md4></v-flex>
      </v-layout>
    </v-container>
    <v-card-text>
      <v-data-table
        :headers="cabecerasAmostrar"
        :items="dataAmostrar"
        class="elevation-1"
        hide-actions
      >
        <template slot="headers" slot-scope="propiedades">
          <tr>
            <th v-for="cabecera in propiedades.headers" :key="cabecera.value">{{cabecera.texto}}</th>
          </tr>
        </template>
        <template slot="items" slot-scope="propiedades">
          <tr>
            <td v-for="dataFila in propiedades.item" :key="dataFila.value">{{dataFila}}</td>
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
      cabecerasAmostrar: this.cabeceras,
      dataAmostrar: this.data
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
    }
  }
};
</script>
