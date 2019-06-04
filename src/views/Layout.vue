<template>
  <v-app id="inspire">
    <!-- ===========================================
                    MENU LATERAL
    ===============================================-->
    <v-navigation-drawer fixed app clipped v-if="ui.menuLateralVisible">
      <v-list dense>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title @click="navegarOpcionMenu(1)">Marcaciones</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title @click="navegarOpcionMenu(2)">Empleados</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- ===========================================
                    NAVBAR SUPERIOR
    ===============================================-->
    <v-toolbar color="primary" dark fixed app clipped-left v-if="ui.navBarVisible">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <a class="d-flex router-link-active">
        <img src="../assets/logo-conna-transparente.png" width="60px" height="38px">
      </a>
      <v-toolbar-title class="white--text">
        Mesa de ayuda - Consejo Nacional de la Niñez y de la Adolescencia -
        CONNA
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat>
          <v-icon>account_circle</v-icon>
          {{ui.nickName}}
        </v-btn>
        <v-btn flat @click="cerrarSesion">
          <v-icon>power_settings_new</v-icon>Salir
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- ===========================================
                    CONTENIDO PRINCIPAL
                     v-on:mostrarCargando="mostrarCargando"
    ===============================================-->
    <v-content>
      <router-view
        v-on:loginCorrecto="cargarVistaPrincipal"
        v-on:componenteCargado="configurarElementosVisibles"
      ></router-view>
    </v-content>

    <!-- ===========================================
                    PIE DE PAGINA
    ===============================================-->
    <v-footer app v-if="ui.footerVisible">
      <v-layout justify-center row wrap>
        <v-flex lighten-2 text-xs-center xs12>
          <div>
            <h3>
              <strong>
                ¿No tiene cuenta?
                <a @click="irARegistrarse">Registrarse</a>
              </strong>
            </h3>
          </div>
        </v-flex>
      </v-layout>
    </v-footer>

    <v-dialog id="dialogAutenticacion" v-model="ui.dialogLoading" max-width persistent>
      <v-progress-circular :size="70" :width="9" color="amber" indeterminate></v-progress-circular>
    </v-dialog>
  </v-app>
</template>
<script>
export default {
  name: "Layout",
  data() {
    return {
      ui: {
        navBarVisible: false,
        menuLateralVisible: false,
        footerVisible: false,
        dialogLoading: false,
        nickName: "Usuario"
      }
    };
  },
  created() {
    this.armarNickName();
    this.$eventBus.$on("mostrarCargando", this.mostrarCargando);
  },
  methods: {
    cerrarSesion: function() {
      let user = JSON.parse(localStorage.getItem("data-user"));
      
      this.$http
        .post("usuario/cerrar-sesion/" + user.idSesion)
        .then(response => {
          this.$router.push({name:"Login"});
        })
        .catch(function(error) {
          alert("Error: " + JSON.stringify(error));
        });
    },
    armarNickName: function() {
      let nickName = "";
      let user = JSON.parse(localStorage.getItem("data-user"));
      let nombres = [
        user.pnombre,
        user.snombre,
        user.tnombre,
        user.papellido,
        user.sapellido,
        user.tapellido
      ];

      for (var i = 0; i < nombres.length; i++) {
        if (i < 2) {
          if (nombres[i].length > 0) {
            nickName = nombres[i];
            i = 2;
          }
        } else {
          if (nombres[i].length > 0) {
            nickName = nickName + " " + nombres[i];
            i = 5;
          }
        }
      }

      this.ui.nickName = nickName;
    },
    mostrarCargando: function(mostrar) {
      this.ui.dialogLoading = mostrar;
      //alert("mostrar cargando "+mostrar);
    },
    irARegistrarse: function() {
      this.$router.push({ name: "Registro" });
    },
    cargarVistaPrincipal: function(rutaDestino) {
      //this.$router.push({ name: "AdminEmpleados"});
      this.$router.push({ name: rutaDestino });
    },
    configurarElementosVisibles: function(confVisibles) {
      /*
        1- Para componentes que no deban mostrar nada mas que su contenido
        2- Para componentes que necesiten mostrar NAVBAR
        3- Para componentes que necesiten mostrar PIE
        4- Para componentes que necesiten mostrar NAVBAR y PIE
        5- Para componentes que necesiten mostrar NAVBAR y MENULATERAL
        6- Para componentes que necesiten mostrar NAVBAR, PIE y MENULATERAL
      */
      switch (confVisibles) {
        case 1:
          this.ui.navBarVisible = false;
          this.ui.menuLateralVisible = false;
          this.ui.footerVisible = false;
          break;
        case 2:
          this.ui.navBarVisible = true;
          this.ui.menuLateralVisible = false;
          this.ui.footerVisible = false;
          break;
        case 3:
          this.ui.navBarVisible = false;
          this.ui.menuLateralVisible = false;
          this.ui.footerVisible = true;
          break;
        case 4:
          this.ui.navBarVisible = true;
          this.ui.menuLateralVisible = false;
          this.ui.footerVisible = true;
          break;
        case 5:
          this.ui.navBarVisible = true;
          this.ui.menuLateralVisible = true;
          this.ui.footerVisible = false;
          break;
        case 6:
          this.ui.navBarVisible = true;
          this.ui.menuLateralVisible = true;
          this.ui.footerVisible = true;
          break;
      }
    },
    navegarOpcionMenu: function(opcion) {
      switch (opcion) {
        case 1:
          this.$router.push({ name: "ConsultaMarcaciones" });
          break;
        case 2:
          this.$router.push({ name: "AdminEmpleados" });
          break;
      }
    }
  }
};
</script>
<style>
.v-list__tile {
  cursor: pointer;
}

.v-list__tile:hover {
  background: gray;
}
</style>
