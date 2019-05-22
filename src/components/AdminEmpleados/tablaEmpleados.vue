<template>
  <v-card flat class="elevation-5">
    <v-container grid-list-md>
      <v-layout row wrap align-center>
        <v-flex xs4 sm4 md4>
          <v-select
            label="Filtrar por"
            prepend-icon="filter_list"
          ></v-select>
        </v-flex>
        <v-flex xs4 sm4 md4></v-flex>
      </v-layout>
    </v-container>
    <v-card-text>
      <v-data-table
        :items="empleadosFiltrados"
        class="elevation-1"
        hide-actions
      >
          <tr>
            <th>Codigo Marcacion</th>
            <th>Nombre</th> 
            <th>Acciones</th>   
          </tr>
        <template v-slot:items="propiedades">
          <tr>
            <td>{{propiedades.item.codAsistencia}}</td>
            <td>{{propiedades.item.nombreCompleto}}</td>
            <td>X</td>
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
  name: "tabla-empleados",
  props: {
    empleados: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      filtro:"",  
      iniRango:0,
      finRango:9
    };
  },
  
  methods:{
      empleadosFiltrados:function(){
          if(this.filtro.length==0){
              return this.empleados;  
          }
      }
  }
};
</script>
