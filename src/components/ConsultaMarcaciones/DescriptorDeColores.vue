<template>
  <v-card>
    <v-card-title>
      <h4>{{titulo}}</h4>
    </v-card-title>
    <v-divider></v-divider>
    <v-list dense>
      <div v-if="descriptores.length > 0">
        <v-list-tile v-for="descriptor in descriptores" :key="descriptor.texto">
          <v-list-tile-content class="align-left">
            <v-chip>
              <v-avatar class="teal" :style="{background: descriptor.color +'!important'}"></v-avatar>
              {{ descriptor.texto }}
            </v-chip>
          </v-list-tile-content>
        </v-list-tile>
      </div>
      <div v-else>
        <v-list-tile>
          <v-list-tile-content class="align-center">Sin datos que mostrar</v-list-tile-content>
        </v-list-tile>
      </div>
    </v-list>
  </v-card>
</template>
<script>
export default {
  name: "descripcion-de-colores",
  props: {
    titulo: {
      type: String,
      default: "Descripción de colores"
    },
    descriptores: {
      type: Array,
      default: function() {
        return [];
      }
    }
  }
};
</script>

<style>
.v-chip {
  width: 95%;
}
</style>
