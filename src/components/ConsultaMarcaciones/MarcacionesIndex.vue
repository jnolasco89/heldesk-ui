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
              <marcacion-tabs :data-tabla="dataTablaMarcaciones" :data-calendario="dataCalendarioMarcaciones"></marcacion-tabs>
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
      dataCalendarioMarcaciones:[],
      anioConsulta: 0,
      mesConsulta: "",
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
      let user = JSON.parse(localStorage.getItem("data-user"));

      var self = this;
      this.$http
        .post(
          "usuario/marcaciones/" + user.codigoMarcacion + "/" + mes + "/" + anio
        )
        .then(response => {
          //Se muestra la animacion de cargando
          this.$eventBus.$emit("mostrarCargando", false);

          //Se obtiene la data relacionada con el empleado
          let empleado = response.data.empleado;
          let nombreCompleto =
            (empleado.pnombre.length > 0 ? empleado.pnombre + " " : "") +
            (empleado.snombre.length > 0 ? empleado.snombre + " " : "") +
            (empleado.tnombre.length > 0 ? empleado.tnombre + " " : "") +
            (empleado.papellido.length > 0 ? empleado.papellido + " " : "") +
            (empleado.sapellido.length > 0 ? empleado.sapellido + " " : "") +
            (empleado.tapellido.length > 0 ? empleado.tapellido + " " : "");

          //Seteando los valores del mes
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

          //Seteando la data del empleado
          self.dataEmpleado = {
            codigoMarcacion: empleado.codMarcacion,
            nit: empleado.nit,
            nombre: nombreCompleto,
            departamento: empleado.departamento.nombre,
            cargo: empleado.cargo.nombre,
            ubicacion: empleado.ubicacion
          };

          //Procesando la data de las marcaciones
          let dataParaTabla = [];
          let dataParaCalendario = [];
          let diasMes = response.data.meses[0].diasMes;

          diasMes.forEach(function(marca) {
            let marcasManana = {
              totMarcaciones: 0,
              marcaciones: "",
              arrayMarcaciones: []
            };
            let marcasTarde = {
              totMarcaciones: 0,
              marcaciones: "",
              arrayMarcaciones: []
            };

            for (var i = 0; i < marca.marcaciones.length; i++) {
              var hora = self.$moment(marca.marcaciones[i]).format("HH") * 1;

              if (hora <= 12) {
                marcasManana.totMarcaciones++;
                marcasManana.marcaciones +=
                  self.$moment(marca.marcaciones[i]).format("hh:mm A") + ", ";
                marcasManana.arrayMarcaciones.push(
                  self.$moment(marca.marcaciones[i]).format("hh:mm A")
                );
              } else {
                marcasTarde.totMarcaciones++;
                marcasTarde.marcaciones +=
                  self.$moment(marca.marcaciones[i]).format("hh:mm A") + ", ";
                marcasTarde.arrayMarcaciones.push(
                  self.$moment(marca.marcaciones[i]).format("hh:mm A")
                );
              }
            }

            if (marcasManana.totMarcaciones == 0) {
              marcasManana.marcaciones = "Sin marcaciones";
            } else {
              marcasManana.marcaciones = marcasManana.marcaciones.substring(
                0,
                marcasManana.marcaciones.length - 2
              );
            }

            if (marcasTarde.totMarcaciones == 0) {
              marcasTarde.marcaciones = "Sin marcaciones";
            } else {
              marcasTarde.marcaciones = marcasTarde.marcaciones.substring(
                0,
                marcasTarde.marcaciones.length - 2
              );
            }

            let tipoMarcacion = { id: 0, clase: "" };
            if (
              marcasManana.totMarcaciones == 0 &&
              marcasTarde.totMarcaciones == 0
            ) {
              //Sin marcaciones
              tipoMarcacion.id = 1;
              tipoMarcacion.clase = "sin-marcaciones";
            } else if (
              (marcasManana.totMarcaciones == 1 &&
                marcasTarde.totMarcaciones == 0) ||
              (marcasManana.totMarcaciones == 0 &&
                marcasTarde.totMarcaciones == 1)
            ) {
              //Una marcacion ya sea en la mañana o en la tarde
              tipoMarcacion.id = 2;
              tipoMarcacion.clase = "una-marcacion-periodo";
            } else if (
              (marcasManana.totMarcaciones > 0 &&
                marcasTarde.totMarcaciones == 0) ||
              (marcasManana.totMarcaciones == 0 &&
                marcasTarde.totMarcaciones > 0)
            ) {
              //Varias marcaciones solo en un tiempo del dia mañana o tarde
              tipoMarcacion.id = 3;
              tipoMarcacion.clase = "marcaciones-en-un-periodo";
            } else if (
              marcasManana.totMarcaciones > 0 &&
              marcasTarde.totMarcaciones > 0
            ) {
              //Maraciones en todo el dia
              tipoMarcacion.id = 4;
              tipoMarcacion.clase = "marcaciones-full";
            }

            dataParaCalendario.push({
              turno: "Mañana",
              marcaciones: marcasManana.arrayMarcaciones,
              fecha: self.$moment(marca.fecha).format("YYYY-MM-DD")
            });
            dataParaCalendario.push({
              turno: "Tarde",
              marcaciones: marcasTarde.arrayMarcaciones,
              fecha: self.$moment(marca.fecha).format("YYYY-MM-DD")
            });

            delete marcasManana.arrayMarcaciones;
            delete marcasTarde.arrayMarcaciones;

            dataParaTabla.push({
              tipo: tipoMarcacion,
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
            filtros: [
              { id: 0, texto: "Todo" },
              { id: 1, texto: "Inasistencia" },
              { id: 2, texto: "Una marcacion" },
              { id: 3, texto: "Marcaciones un tiempo" },
              { id: 4, texto: "Laborados" }
            ],
            data: dataParaTabla
          };

          self.dataCalendarioMarcaciones=dataParaCalendario;

        })
        .catch(function(error) {
          self.$eventBus.$emit("mostrarCargando", false);
          alert("ocurrio un error " + error);
        });
    }
  }
};
</script>

    
