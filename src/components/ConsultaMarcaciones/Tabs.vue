<template>
  <v-tabs color="default">
    <v-tabs-slider color="blue"></v-tabs-slider>

    <v-tab href="#vista-tabla" class="primary--text">
      <v-icon>library_books</v-icon>Vista tabla
    </v-tab>
    <v-tab href="#vista-calendario" class="primary--text">
      <v-icon>insert_invitation</v-icon>Vista calendario
    </v-tab>

    <v-tabs-items>
      <v-tab-item :value="'vista-tabla'">
       <tabla-marcaciones :cabeceras="cabecerasTabla" :filtros="filtrosTabla" :data="filasTabla"></tabla-marcaciones>
      </v-tab-item>
      <v-tab-item :value="'vista-calendario'">
        <!--<full-calendario></full-calendario>-->
      </v-tab-item>
    </v-tabs-items>
  </v-tabs>
</template>
<script>
import tablaMarcaciones from "@/components/ConsultaMarcaciones/TablaMarcaciones";
//import FullCalendario from "@/components/FullCalendario";

export default {
  name: "marcacion-tabs",
  props: {
    dataTabla: {
      type: Object,
      default: function() {
        return null;
      }
    }
  },
  components: {
   tablaMarcaciones//,
  //  FullCalendario
  },
  computed: {
    cabecerasTabla: function() {
      if (this.dataTabla != null) {
        return this.dataTabla.cabeceras;
      } else {
        return [];
      }
    },
    filasTabla: function() {
      if (this.dataTabla != null) {
        return this.dataTabla.data;
      } else {
        return [];
      }
    },
    filtrosTabla:function(){
       if (this.dataTabla != null) {
        return this.dataTabla.filtros;
      } else {
        return [];
      }
    }
  }
};
</script>
