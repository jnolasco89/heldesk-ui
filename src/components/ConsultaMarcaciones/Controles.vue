<template>
  <v-layout row wrap align-center justify-center>
    <v-flex xs6 sm6 md4 v-if="verListaSupervisiones">
      <v-select :items="supervisiones" item-value="id" item-text="nombreCompleto" v-model="selectedEmpleado" label="Seleccione un usuario" prepend-icon="supervisor_account" @change="cambioSeleccion"></v-select>
    </v-flex>
    <v-flex xs6 sm6x md4>
      <v-menu
        :close-on-content-click="false"
        v-model="datePickerVisible"
        :nudge-right="40"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="fechaFormateada"
          label="Mes consulta"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker
          v-model="fecha"
          type="month"
          locale="es"
          @input="datePickerVisible = false"
          scrollable
        ></v-date-picker>
      </v-menu>
    </v-flex>

    <v-flex xs12 sm12 md12>
      <v-btn color="primary" small @click="consultarMarcaciones">
        Consultar
        <v-icon right dark>check</v-icon>
      </v-btn>
      <v-divider horizontal></v-divider>
      <v-divider horizontal></v-divider>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
    name: 'controles-marcaciones',
    props:{
       supervisiones:{
         type:Array,
         default:function(){
           return [];
         }
       },
       inituserselected:{
         type:Number,
         default:function(){
           return 0;
         }
       }
    },
    data() {
    return {
      fechaActual: new Date(),
      fecha: new Date().toISOString().substr(0, 10),
      datePickerVisible: false,
      selectedEmpleado:this.inituserselected,
      usuarios: [
        /*
        { text: "Jose Nolasco", callback: () => console.log("jn") },
        { text: "Edgardo Rodriguez", callback: () => console.log("ed") },
        { text: "Juan Perez", callback: () => console.log("jp") }
        */
      ]
    };
  },
  computed: {
    fechaFormateada: function() {
      return this.$moment(this.fecha).format("MMMM - YYYY");
    },
    verListaSupervisiones:function(){
      return this.supervisiones.length>0?true:false;
    }
  },
  methods:{
    consultarMarcaciones:function(){
      var mes=this.$moment(this.fecha).format("MM");
      var anio=this.$moment(this.fecha).format("YYYY");
      this.$emit("consultarMarcaciones",mes,anio);
    },
    cambioSeleccion:function(){
      this.$emit("cambioSeleccion",this.selectedEmpleado);
    }
  }
  /*
  ,
  mounted(){
      let user=JSON.parse(localStorage.getItem("data-user"));
      if(user!=null){
        this.selectedEmpleado=user.id;
        alert(user.id);
      }else if(this.supervisiones.length>0){
        alert(JSON.stringify(user));
        this.selectedEmpleado=this.supervisiones[0].id;   
      }
     this.selectedEmpleado=8989;
  }
  */
}
</script>