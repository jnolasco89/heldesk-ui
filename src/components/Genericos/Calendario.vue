<template>
  <v-card flat class="elevation-5">
    <v-calendar :value="today" color="primary" locale="es">
      <template v-slot:day="{ date }" style="background:red;">
        <template v-for="evento in eventsMap[date]">
          <v-menu :key="evento.key" full-width offset-x>
            <template v-slot:activator="{ on }">
              <div v-if="!evento.time" v-ripple :class="[estiloEvento,evento.tipo.clase]">
                <b>{{evento.turno}}</b>
                <hr>
                <ul class="listaMarcaciones" v-for="m in evento.marcaciones" :key="m">
                  <li>{{m}}</li>
                </ul>
              </div>
            </template>
          </v-menu>
        </template>
      </template>
    </v-calendar>
  </v-card>
</template>
<script>
export default {
  name: "calendario",
  props: {
    eventos: {
      type: Array,
      default: function() {
        return [];
      }
    },
    today:{
      type: String,
      default: function(){
        return this.$moment().format("YYYY-MM-DD");
      }
    }
  },
  data() {
    return {
      estiloEvento:"eventstyle"
      /*
      type: "month",
      start: "2019-01-01",
      end: "2019-01-06",
      today: "2018-01-01",
      events: [
        {
          key: 1,
          turno: "Manana",
          marcaciones: ["10:00 AM", "10:30 AM", "10:40 AM", "11:00 AM"],
          fecha: "2019-01-15",
          open: false
        },
        {
          key: 2,
          turno: "Tarde",
          marcaciones: ["10:00 AM", "10:30 AM", "10:40 AM", "11:00 AM"],
          fecha: "2019-01-15",
          open: false
        }
      ]*/
    };
  },
  computed: {
    eventsMap: function() {
      const map = {};
      //this.events.forEach(e => (map[e.fecha] = map[e.fecha] || []).push(e));
      if (this.eventos != null) {
        this.eventos.forEach(e => (map[e.fecha] = map[e.fecha] || []).push(e));
      }

      return map;
    }
  }
};
</script>
<style>
.eventstyle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  border: 1px solid #1867c0;
  width: 100%;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
}

 .listaMarcaciones{
   position: relative!important;
 }
 .listaMarcaciones li{
   float: left!important;
   width: 100%;
 }

.listaMarcaciones {
  list-style: none;
  text-align: left;
  border: solid 1px black;
}

.listaMarcaciones li{
  border: solid 1px black;
}

.sin-marcaciones {
  background-color: red;
  color: white;
}

.sin-marcaciones hr{
  border-color: white;
}

.una-marcacion-periodo{
  background-color: rgb(255, 164, 32);
  color: white;
}

.marcaciones-en-un-periodo{
  background-color: yellow;
}

.marcaciones-full{
  background-color: green;
  color: white;
}

</style>


