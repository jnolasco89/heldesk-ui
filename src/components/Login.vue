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
              v-validate="'required|max:17'"
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
            <a @click="irAresetPass"> Restablecer contraseña</a>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-layout justify-center>
            <v-btn @click="login" color="primary" small>Ingresar
              <v-icon right dark>arrow_forward</v-icon>
            </v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
      <v-alert v-show="ui.loginFallido" :value="true" color="error" icon="warning" outline>{{ui.msjError}}</v-alert>
    </v-flex>
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
        loginFallido:false,
        msjError:''
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
            max: "El campo NIT solo puede tener 17 caracteres numericos"
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
    this.$emit('componenteCargado',3)
  },
  methods: {
    irAresetPass:function(){
      this.$router.push({name:'ResetearPassword'})
    },
    login: function() {
      this.$validator.validateAll().then(result => {
        if (result) {
          var self=this;
          this.$http
            .post("/usuario/login", {
              nit: this.data.nit,
              contrasenia: this.data.password
            })
            .then(response => {
              localStorage.setItem('data-user',response.data)
              localStorage.setItem('t-a',response.headers.authorization)
              this.$emit('loginCorrecto')
            })
            .catch(function(error) {
              switch (error.response.status) {
                case 401:
                  self.ui.msjError=error.response.data.detalle;
                  self.ui.loginFallido=true;
                  break;
                default:
                  self.ui.msjError="Ha ocurrido un error  "+error.response.data;

                break;
              }
            });

          return;
        }
      });
    }
  }
};
</script>