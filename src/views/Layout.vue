<template>
  <v-app>
    <!-- ============= Toolbar ================= -->
    <v-toolbar app clipped-left color="primary">
      <v-spacer></v-spacer>
      <a class="d-flex router-link-active">
        <img src="../assets/logo-conna-transparente.png" width="60px" height="38px">
      </a>
      <v-toolbar-title class="white--text">
        Mesa de ayuda - Consejo Nacional de la Niñez y de la Adolescencia -
        CONNA
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <div>
        <v-menu offset-y>
          <v-btn color="primary" slot="activator" @click="verLocalStorage">
            <v-icon>account_circle</v-icon>Jose Nolasco
          </v-btn>
        </v-menu>

        <v-btn color="success">Salir
          <v-icon right dark>arrow_back</v-icon>
        </v-btn>
      </div>
    </v-toolbar>
    <!-- ============ Content ================= -->
    <v-content>
      <v-container fluid fill-height>
        <router-view v-on:loginCorrecto="cargarVistaPrincipal"></router-view>
      </v-container>
    </v-content>
    <!-- ============ Footer =================== -->
    <v-footer app>
      <v-layout justify-center row wrap>
        <v-flex lighten-2 text-xs-center xs12>
          <div>
            <h3>
              <strong>¿No tiene cuenta?</strong>
              <a>Registrarse</a>
            </h3>
          </div>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  name: "Layout",
  methods: {
    verLocalStorage: function() {
      var token = localStorage.getItem("t-a");
      var dataUser = localStorage.getItem("data-user");
      /*
         alert("TOKEN: "+token);
         alert("data user: "+ JSON.stringify(dataUser));
         */
      console.log(
        "Token: " + token + " Data ususario: " + JSON.stringify(dataUser)
      );
     
    },
    cargarVistaPrincipal: function() {
      
      this.$router.push({ name: "Marcaciones" });
      
      //  alert("deberia cargar la nueva vista")
    }
  }
};
</script>