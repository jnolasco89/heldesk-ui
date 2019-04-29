<template>
  <v-layout align-center justify-center row fill-height>
    <v-flex xs10 sm6 md4 lg3 xl3>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>Ingreso</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              label="NIT"
              prepend-icon="person"
              placeholder="0000-000000-000-0"
              :mask="ui.mascarNit"
              return-masked-value
              v-model="data.nit"
              data-vv-name="data.nit"
              v-validate="'required|length:17'"
              :error-messages="errors.collect('data.nit')"
              required
            ></v-text-field>
            <v-text-field
              label="Contraseña"
              prepend-icon="lock"
              placeholder=" "
              :append-icon="ui.passVisible ? 'visibility_off' : 'visibility'"
              :type="ui.passVisible ? 'text' : 'password'"
              @click:append="ui.passVisible = !ui.passVisible"
              v-model="data.password"
              data-vv-name="data.password"
              v-validate="'required'"
              :error-messages="errors.collect('data.password')"
              required
            ></v-text-field>
            <a @click="irAresetPass">Restablecer contraseña</a>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-layout justify-center>
            <v-btn @click="login" color="primary" small>
              Ingresar
              <v-icon right dark>arrow_forward</v-icon>
            </v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
      <v-alert v-show="ui.loginFallido" :value="true" color="error" icon="warning">{{ui.msjError}}</v-alert>
      <v-expansion-panel v-show="ui.detallesError">
        <v-expansion-panel-content expand-icon="keyboard_arrow_down">
          <template v-slot:header>
            <div>Detalle error</div>
          </template>
          <v-card>
            <v-card-text class="grey lighten-3">{{ui.msjDetallesError}}</v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>

    <!--
    <v-dialog id="dialogAutenticacion" v-model="ui.dialogLoading" max-width persistent>
      <v-progress-circular :size="70" :width="9" color="amber" indeterminate></v-progress-circular>
    </v-dialog>-->
  </v-layout>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      ui: {
        passVisible: false,
        mascarNit: "####-######-###-#",
        loginFallido: false,
        msjError: "",
        msjDetallesError: "",
        //dialogLoading: false,
        detallesError: false
      },
      data: {
        nit: "",
        password: ""
      },
      dictionary: {
        attributtes: {
          "data.nit": "NIT",
          "data.password": "Contraseña"
        },
        custom: {
          "data.nit": {
            required: function() {
              return "El campo NIT es requerido";
            },
            length: function() {
              return "El campo NIT debe tener 14 digitos";
            }
          },
          "data.password": {
            required: function() {
              return "El campo contraseña es requerido";
            }
          }
        }
      }
    };
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
    this.$emit("componenteCargado", 3);
  },
  methods: {
    irAresetPass: function() {
      this.$router.push({ name: "ResetearPassword" });
    },
    login: function() {
      this.$validator.validateAll().then(result => {
        if (result) {
          //this.ui.dialogLoading = true;
          //this.$emit("mostrarCargando", true);
          this.$eventBus.$emit("mostrarCargando",true);

          var self = this;
          this.$http
            .post("/usuario/login", {
              nit: this.data.nit,
              contrasenia: this.data.password
            })
            .then(response => {
              localStorage.setItem("data-user", response.data);
              localStorage.setItem("t-a", response.headers.authorization);
              this.$emit("loginCorrecto","ConsultaMarcaciones");
              //this.$emit("mostrarCargando", false);
              this.$eventBus.$emit("mostrarCargando",false);
            })
            .catch(function(error) {
              switch (error.response.status) {
                case 401:
                  self.ui.msjError = error.response.data.error;
                  self.ui.loginFallido = true;
                  break;
                default:
                  self.ui.detallesError = true;
                  var descripcion = error.response.descripcion;
                  var error = error.response.descripcion;
                  var tipo = error.response.tipo;

                  self.ui.msjError = error;
                  self.ui.msjDetallesError =
                    "Ha ocurrido un error: " + tipo + " , " + descripcion;

                  break;
              }

              //self.ui.dialogLoading = false;
              //this.$emit("mostrarCargando", false);
              this.$eventBus.$emit("mostrarCargando",false);
            });

          return;
        }
      });
    }
  }
};
</script>
<style>
.v-dialog {
  overflow: hidden !important;
  box-shadow: 0 0 0 0 !important;
  -webkit-box-shadow: 0 0 0 0 !important;
}
</style>
