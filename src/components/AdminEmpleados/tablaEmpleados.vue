<template>
  <v-card flat class="elevation-5">
    <v-card-text>
      <v-toolbar flat color="white">
        <v-dialog v-model="modal.show" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Cambiar contraseña</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      disabled
                      v-model="modal.editedEmpleado.codAsistencia"
                      label="Codigo asistencia"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field disabled v-model="modal.editedEmpleado.nombreCompleto" label="Nombre"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      prepend-icon="vpn_key"
                      :type="modal.newPassVisible?'text':'password'"
                      :append-icon="modal.newPassVisible ? 'visibility_off' : 'visibility'"
                      @click:append="modal.newPassVisible = !modal.newPassVisible"
                      v-model="modal.editedEmpleado.newPass"
                      label="Contraseña"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field
                      prepend-icon="vpn_key"
                      :type="modal.confirmNewPassVisible?'text':'password'"
                      :append-icon="modal.confirmNewPassVisible ? 'visibility_off' : 'visibility'"
                      @click:append="modal.confirmNewPassVisible = ! modal.confirmNewPassVisible"
                      v-model="modal.editedEmpleado.confirmNewPass"
                      label="Confirmar contraseña"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="cerrarModal">Cancelar</v-btn>
              <v-btn color="blue darken-1" flat @click="guardarNuevaPass">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>

      <v-data-table 
      rows-per-page-text="Filas por pagina"
      :headers="tabla.encabezados" 
      :items="tabla.empleados" 

      :pagination.sync="pagination"
      :total-items="tabla.totalEmpleados"
      :loading="tabla.isLoading"

      class="elevation-1" 
      >
        <template v-slot:items="propiedades">
          <tr>
            <td>{{propiedades.item.codAsistencia}}</td>
            <td>{{propiedades.item.nombreCompleto}}</td>
            <td>
              <v-icon small class="cambiar_pass mr-2" @click="cambiarPass(propiedades.item)">vpn_key</v-icon>
            </td>
          </tr>
        </template>
        <template slot="no-data">
          <v-alert :value="true" color="error" icon="warning">No hay datos para mostrar</v-alert>
        </template>
        <template v-slot:pageText="propiedades">
           {{ propiedades.pageStart }} - {{ propiedades.pageStop }} de {{ propiedades.itemsLength }}
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: "tabla-empleados",
  props: {
    parametroBusqueda:{
      type:String,
      default:function(){
        return "";
      }
    }
  },
  data() {
    return {
      modal:{
        newPassVisible: false,
        confirmNewPassVisible: false,
        show:false,
        editedEmpleado: {
        codAsistencia: "",
        nombreCompleto: "",
        newPass: "",
        confirmNewPass: ""
        }  
      },
      pagination:{},
      tabla:{
        totalEmpleados:0,
        empleados:[],
        isLoading:true,
        encabezados:[
          { text: "Codigo asistencia",align: "Left",sortable: true,value: "codigoMarcacion"},
          { text: "Nombre", align: "Left", sortable: true, value: "nombre" },
          { text: "Acciones", align: "Left", sortable: true, value: "acciones" }  
        ]
      }
    };
  },
  watch:{
    pagination:{
      handler(){
        this.getEmpleados().then(data=>{
          this.tabla.empleados=data.empleados;
          this.tabla.totalEmpleados=data.count;
        })
      },
      deep:true
    }
  },
  methods: {
    cambiarPass: function(item) {
      this.modal.editedEmpleado.codAsistencia = item.codAsistencia;
      this.modal.editedEmpleado.nombreCompleto = item.nombreCompleto;
      this.modal.show = true;
    },
    cerrarModal: function() {
      this.modal.show = false;
      this.modal.editedEmpleado.codAsistencia = "";
      this.modal.editedEmpleado.nombreCompleto = "";
      this.modal.editedEmpleado.newPass = "";
      this.modal.editedEmpleado.confirmNewPass = "";
      this.modal.newPassVisible=false;
      this.modal.confirmNewPassVisible=false;
    },
    guardarNuevaPass: function() {
      alert("Se guardara la nueva pass");
    },
    getEmpleados: function() {
      this.tabla.isLoading = true;
      const {sortBy, descending, page, rowsPerPage } = this.pagination
      
      return new Promise((resolve, reject) => {
       let indiceInicial=(page-1)*rowsPerPage;
       let indiceFinal=(page*rowsPerPage)-1;
       
        this.$http
          .get("usuario/empleados/"+indiceInicial+"/"+indiceFinal)
          .then(response => {

            let count = response.data.count;
            let empleados = response.data.empleados;
            this.tabla.isLoading=false;

            resolve({
                count,
                empleados
            })
          })
          .catch(error => {
            alert(error);
            this.$eventBus.$emit("mostrarCargando", false);
          });
      });
    },
    buscarEmpleado:function(){
      alert(localStorage.getItem("t-a"));
      this.$eventBus.$emit("mostrarCargando", true);
         this.$http
          .get("find-empleado/jose")
          .then(response => {

          alert(JSON.stringify(response.data));

        this.$eventBus.$emit("mostrarCargando", false);
          })
          .catch(error => {
            alert(error);
            this.$eventBus.$emit("mostrarCargando", false);
          });
      
    }
  },
  mounted(){
      this.getEmpleados().then(data => {
         
         this.tabla.empleados=data.empleados;
         this.tabla.totalEmpleados=data.count;
     })
  }
};
</script>
<style>
.cambiar_pass {
  cursor: pointer;
}
</style>
