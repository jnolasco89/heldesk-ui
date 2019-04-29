<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row align-start justify-center fill-height>
      <v-flex xs12 sm12 md12>
        <controles-marcacion v-on:consultarMarcaciones="consultarMarcaciones"></controles-marcacion>
      </v-flex>
    </v-layout>
    <v-layout row align-start justify-center>
      <v-flex xs12 sm12 md6>
        <marcacion-data-empleado
          :datos-empleado="dataEmpleado"
          :anio="test.anio"
          :mes="test.mes"
        ></marcacion-data-empleado>
      </v-flex>
    </v-layout>
    <v-layout row align-start justify-center>
      <v-flex xs12 sm12 md12>
        <v-container grid-list-md text-xs-center>
          <v-layout row wrap align-center justify-center>
            <v-flex xs12 sm6 md3>
              <descriptor-de-colores :descriptores="test.descriptores"></descriptor-de-colores>
            </v-flex>
            <v-flex xs12 sm12 md12>
              <marcacion-tabs></marcacion-tabs>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import ControlesMarcacion from "@/components/ConsultaMarcaciones/Controles";
import MarcacionDataEmpleado from "@/components/ConsultaMarcaciones/DataEmpleado";
import DescriptorDeColores from "@/components/ConsultaMarcaciones/DescriptorDeColores";
import MarcacionTabs from "@/components/ConsultaMarcaciones/Tabs";

export default {
  name: "Marcaciones",
  components: {
    ControlesMarcacion,
    MarcacionDataEmpleado,
    DescriptorDeColores,
    MarcacionTabs
  },
  data() {
    return {
       dataEmpleado: {
          codigoMarcacion: "",
          nit: "",
          nombre: "",
          departamento: "",
          cargo: "",
          ubicacion: ""
        },
      test: {
        dataEmpleado: {
          codigoMarcacion: "192.168.132.1",
          nit: "0101-060389-101-4",
          nombre: "Jose Nolasco",
          departamento: "Informacion",
          cargo: "Programador",
          ubicacion: "San Salvador, San Salvador"
        },
        anio: 2018,
        mes: "Diciembre",
        descriptores: [
          {
            texto: "Laborados",
            color: "green"
          },
          {
            texto: "Una marcacion",
            color: "yellow"
          },
          {
            texto: "Ausencia",
            color: "red"
          },
          {
            texto: "Sin registro",
            color: "#ffa420"
          }
        ]
      }
    };
  },
  methods:{
    consultarMarcaciones:function(mes,anio){
      this.$eventBus.$emit("mostrarCargando",true);
      
      var self=this;
      this.$http
    .post("usuario/marcaciones/416/"+mes+"/"+anio)
    .then(response => {
        this.$eventBus.$emit("mostrarCargando",false);
        var registro=response.data;
        
        self.dataEmpleado= {
          codigoMarcacion: registro.empleado.codMarcacion,
          nit: registro.empleado.nit,
          nombre: registro.empleado.pnombre,
          departamento: registro.empleado.departamento.nombre,
          cargo: registro.empleado.cargo.nombre,
          ubicacion: registro.ubicacion
        };
        
    })
    .catch(function(error){
      this.$eventBus.$emit("mostrarCargando",false);
      alert("ocurrio un error");
    })

    }
  }
};
</script>

    
