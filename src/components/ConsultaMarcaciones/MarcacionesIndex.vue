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
              <marcacion-tabs
                :data-tabla="dataTablaMarcaciones"
                :data-calendario="dataCalendarioMarcaciones"
                :today-calendar="fechaInicioCalendario"
              ></marcacion-tabs>
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
      dataCalendarioMarcaciones: [],
      anioConsulta: 0,
      mesConsulta: "",
      fechaInicioCalendario: this.$moment(new Date()).format("YYYY-MM-DD"),
      verRegistroMarcaciones: false,
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
      let userCookie = JSON.parse(localStorage.getItem("data-user"));
      var self = this;

      this.$http
        .post(
          "usuario/marcaciones/" +
            userCookie.codigoMarcacion +
            "/" +
            mes +
            "/" +
            anio
        )
        .then(response => {
          //********************************************************
          //Declarando variables utilitarias
          //********************************************************
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
          let empleado = response.data.empleado;
          let nombreCompleto =
            (empleado.pnombre.length > 0 ? empleado.pnombre + " " : "") +
            (empleado.snombre.length > 0 ? empleado.snombre + " " : "") +
            (empleado.tnombre.length > 0 ? empleado.tnombre + " " : "") +
            (empleado.papellido.length > 0 ? empleado.papellido + " " : "") +
            (empleado.sapellido.length > 0 ? empleado.sapellido + " " : "") +
            (empleado.tapellido.length > 0 ? empleado.tapellido + " " : "");

          //********************************************************
          //Seteando las variables locales del componente
          //********************************************************
          self.fechaInicioCalendario=self.$moment(new Date(anio,mes-1,1)).format("YYYY-MM-DD");
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

          //********************************************************
          //Procesando la data de las marcaciones
          //********************************************************
          let dataParaTabla = [];
          let dataParaCalendario = [];
          let diasMarcaciones = response.data.meses[0].diasMes;

          diasMarcaciones.forEach(function(diaMarcacion) {
            let marcasManana = [],
              marcasTarde = [];

            diaMarcacion.marcaciones.forEach(function(marcacion) {
              //HH para formato de 24 horas
              //hh para formato de 12 horas
              let horaMarcacion = self.$moment(marcacion).format("HH") * 1;

              if (horaMarcacion <= 12) {
                marcasManana.push(self.$moment(marcacion).format("hh:mm A"));
              } else {
                marcasTarde.push(self.$moment(marcacion).format("hh:mm A"));
              }
            }); //Fin forEach marcaciones

            let tipoMarcacion = { id: 0, clase: "" };
            if (marcasManana.length == 0 && marcasTarde.length == 0) {
              //Sin marcaciones
              tipoMarcacion.id = 1;
              tipoMarcacion.clase = "sin-marcaciones";
            } else if (
              (marcasManana.length == 1 && marcasTarde.length == 0) ||
              (marcasManana.length == 0 && marcasTarde.length == 1)
            ) {
              //Una marcacion ya sea en la mañana o en la tarde
              tipoMarcacion.id = 2;
              tipoMarcacion.clase = "una-marcacion-periodo";
            } else if (
              (marcasManana.length > 0 && marcasTarde.length == 0) ||
              (marcasManana.length == 0 && marcasTarde.length > 0)
            ) {
              //Varias marcaciones solo en un tiempo del dia mañana o tarde
              tipoMarcacion.id = 3;
              tipoMarcacion.clase = "marcaciones-en-un-periodo";
            } else if (marcasManana.length > 0 && marcasTarde.length > 0) {
              //Maraciones en todo el dia
              tipoMarcacion.id = 4;
              tipoMarcacion.clase = "marcaciones-full";
            }

            marcasManana =
              marcasManana.length > 0 ? marcasManana : ["Sin marcaciones"];
            marcasTarde =
              marcasTarde.length > 0 ? marcasTarde : ["Sin marcaciones"];

            //Agregando las marcaciones a la data
            dataParaCalendario.push({
              tipo:tipoMarcacion,
              key: "manana-"+self.$moment(diaMarcacion.fecha).format("YYYY-MM-DD"),
              turno: "Mañana",
              marcaciones: marcasManana,
              fecha: self.$moment(diaMarcacion.fecha).format("YYYY-MM-DD")
            });
            dataParaCalendario.push({
              tipo:tipoMarcacion,
              key: "tarde-"+self.$moment(diaMarcacion.fecha).format("YYYY-MM-DD"),
              turno: "Tarde",
              marcaciones: marcasTarde,
              fecha: self.$moment(diaMarcacion.fecha).format("YYYY-MM-DD")
            });

            dataParaTabla.push({
              tipo: tipoMarcacion,
              dia: diaMarcacion.diaDeLaSemana,
              fecha: self.$moment(diaMarcacion.fecha).format("DD-MM-YYYY"),
              manana: marcasManana,
              tarde: marcasTarde
            });
          }); //Fin forEach diaMarcacion

          self.dataTablaMarcaciones = {
            cabeceras: [
              { texto: "Dia", value: "dia" },
              { texto: "Fecha", value: "fecha" },
              { texto: "Manana", value: "manana" },
              { texto: "Tarde", value: "tarde" }
            ],
            filtros: [
              { id: 0, texto: "Todo" },
              { id: 1, texto: "Inasistencia" },
              { id: 2, texto: "Una marcacion" },
              { id: 3, texto: "Marcaciones un tiempo" },
              { id: 4, texto: "Laborados" }
            ],
            data: dataParaTabla
          };

          self.dataCalendarioMarcaciones = dataParaCalendario;

          this.$eventBus.$emit("mostrarCargando", false);
        }) //Fin de THEN
        .catch(function(error) {
          self.$eventBus.$emit("mostrarCargando", false);
          alert("ocurrio un error " + error);
        });
    }
  }
};
</script>

    
