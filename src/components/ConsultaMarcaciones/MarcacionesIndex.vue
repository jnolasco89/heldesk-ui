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
          :data-empleado="dataEmpleado"
          :mes="mesConsulta"
          :anio="anioConsulta"
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
              <marcacion-tabs :data-tabla="dataTablaMarcaciones"></marcacion-tabs>
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
          codigoMarcacion: "a",
          nit: "a",
          nombre: "a",
          departamento: "a",
          cargo: "a",
          ubicacion: "a"
        },
        dataTablaMarcaciones:null,
        anioConsulta:0,
        mesConsulta:"",
      test: {
        
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
        //let registro=response.data;
        let empleado=response.data.empleado;
        let nombreCompleto=(empleado.pnombre.length>0?empleado.pnombre+" ":"")+
                           (empleado.snombre.length>0?empleado.snombre+" ":"")+
                           (empleado.tnombre.length>0?empleado.tnombre+" ":"")+
                           (empleado.papellido.length>0?empleado.papellido+" ":"")+
                           (empleado.sapellido.length>0?empleado.sapellido+" ":"")+
                           (empleado.tapellido.length>0?empleado.tapellido+" ":"");

        let meses=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
        self.mesConsulta=meses[mes-1];
        self.anioConsulta=anio*1;
        
        self.dataEmpleado= {
          codigoMarcacion: empleado.codMarcacion,
          nit: empleado.nit,
          nombre: nombreCompleto,
          departamento: empleado.departamento.nombre,
          cargo: empleado.cargo.nombre,
          ubicacion: empleado.ubicacion
        };

/*
        self.marcasMes=meses[0];
        alert(JSON.stringify(dataMes));
        */
       
       let dataParaTabla=[];
       let diasMes=response.data.meses[0].diasMes;

       diasMes.forEach(function(marca){
         let marcasManana="";
         let marcasTarde="";
         //console.log(JSON.stringify(marca));
        
          for(var i=0;i<marca.marcaciones.length;i++){
              var hora=(self.$moment(marca.marcaciones[i]).format("HH"))*1;
              
              if(hora<=12){
                marcasManana+=self.$moment(marca.marcaciones[i]).format("HH:mm:ss A")+" ";
              }else{
                marcasTarde+=self.$moment(marca.marcaciones[i]).format("HH:mm:ss A")+" ";
              }

              if(marcasManana.length==0){
                 marcasManana="Sin marcaciones"; 
              }

              if(marcasTarde.length==0){
                 marcasManana="Sin marcaciones"; 
              }
          }

          dataParaTabla.push({
            fecha:self.$moment(marca.fecha).format("DD-MM-YYYY"),
            dia:marca.diaDeLaSemana,
            manana:marcasManana,
            tarde:marcasTarde
          });
          
       });

      console.log(JSON.stringify(dataParaTabla));

        self.dataTablaMarcaciones={
          cabeceras:[{ texto: "Fecha", value: "fecha" },{ texto: "Dia", value: "dia" },{ texto: "Manana", value: "manana" },{ texto: "Tarde", value: "tarde" }],
          filtros:["Todo","Laborado","Inasistencia"],
          data: dataParaTabla
          /*
          [
            {fecha:"01/01/01",dia:"miercoles",manana:"uno",tarde:"fggh"},
            {fecha:"01/01/01",dia:"miercoles",manana:"dos",tarde:"fggh"},
            {fecha:"01/01/01",dia:"miercoles",manana:"tres",tarde:"fggh"},
            {fecha:"01/01/01",dia:"miercoles",manana:"cuatro",tarde:"fggh"},
          ]
          */
        };
        
    })
    .catch(function(error){
      self.$eventBus.$emit("mostrarCargando",false);
      alert("ocurrio un error "+error);
    })

    }
  }
};
</script>

    
