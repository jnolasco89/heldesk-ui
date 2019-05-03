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
              <descriptor-de-colores :descriptores="descriptores"></descriptor-de-colores>
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
        codigoMarcacion: "",
        nit: "",
        nombre: "",
        departamento: "",
        cargo: "",
        ubicacion: ""
      },
      dataTablaMarcaciones: null,
      anioConsulta: 0,
      mesConsulta: "",
      verRegistroMarcaciones:false,
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
    };
  },
  methods: {
    consultarMarcaciones: function(mes, anio) {
      this.$eventBus.$emit("mostrarCargando", true);
      let user=JSON.parse(localStorage.getItem("data-user"));

      var self = this;
      this.$http
        .post("usuario/marcaciones/"+user.codigoMarcacion+"/" + mes + "/" + anio)
        .then(response => {
          this.$eventBus.$emit("mostrarCargando", false);
          let empleado = response.data.empleado;
          let nombreCompleto =
            (empleado.pnombre.length > 0 ? empleado.pnombre + " " : "") +
            (empleado.snombre.length > 0 ? empleado.snombre + " " : "") +
            (empleado.tnombre.length > 0 ? empleado.tnombre + " " : "") +
            (empleado.papellido.length > 0 ? empleado.papellido + " " : "") +
            (empleado.sapellido.length > 0 ? empleado.sapellido + " " : "") +
            (empleado.tapellido.length > 0 ? empleado.tapellido + " " : "");

          let meses = [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre"
          ];
          self.mesConsulta = meses[mes - 1];
          self.anioConsulta = anio * 1;

          self.dataEmpleado = {
            codigoMarcacion: empleado.codMarcacion,
            nit: empleado.nit,
            nombre: nombreCompleto,
            departamento: empleado.departamento.nombre,
            cargo: empleado.cargo.nombre,
            ubicacion: empleado.ubicacion
          };


          let dataParaTabla = [];
          let diasMes = response.data.meses[0].diasMes;

          diasMes.forEach(function(marca) {
            let marcasManana = "";
            let marcasTarde = "";
            //console.log(JSON.stringify(marca));

            for (var i = 0; i < marca.marcaciones.length; i++) {
              var hora = self.$moment(marca.marcaciones[i]).format("HH") * 1;

              if (hora <= 12) {
                marcasManana +=
                  self.$moment(marca.marcaciones[i]).format("hh:mm A") + " ";
              } else {
                marcasTarde +=
                  self.$moment(marca.marcaciones[i]).format("hh:mm A") + " ";
              }
            }

            if (marcasManana.length == 0) {
              marcasManana = "Sin marcaciones";
            }

            if (marcasTarde.length == 0) {
              marcasTarde = "Sin marcaciones";
            }

            dataParaTabla.push({
              dia: marca.diaDeLaSemana,
              fecha: self.$moment(marca.fecha).format("DD-MM-YYYY"),
              manana: marcasManana,
              tarde: marcasTarde
            });
          });

          self.dataTablaMarcaciones = {
            cabeceras: [
              { texto: "Dia", value: "dia" },
              { texto: "Fecha", value: "fecha" },
              { texto: "Manana", value: "manana" },
              { texto: "Tarde", value: "tarde" }
            ],
            filtros: ["Todo", "Laborado", "Inasistencia"],
            data: dataParaTabla
          };
        })
        .catch(function(error) {
          self.$eventBus.$emit("mostrarCargando", false);
          alert("ocurrio un error " + error);
        });
    }
  }
};
</script>

    
