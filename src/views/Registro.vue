<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center row fill-height>
      <v-flex xs10 sm8 md5 lg4 xl3>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Registro</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="nit"
                data-vv-name="nit"
                v-validate="'required|max:17'"
                :error-messages="errors.collect('nit')"
                required
                label="NIT"
                prepend-icon="person"
                placeholder="0000-000000-000-0"
                :mask="mascaraNit"
                return-masked-value
              ></v-text-field>
              <v-text-field
                v-model="correo"
                data-vv-name="correo"
                v-validate="'required'"
                :error-messages="errors.collect('correo')"
                required
                label="Correo"
                prepend-icon="mail"
                placeholder="juan.perez@conna.gob.sv"
              ></v-text-field>
              <v-text-field
                v-model="password"
                data-vv-name="password"
                ref="referencia_password"
                v-validate="'required'"
                :error-messages="errors.collect('password')"
                required
                label="Contraseña"
                prepend-icon="lock"
                placeholder=" "
                :append-icon="passVisible ? 'visibility_off' : 'visibility'"
                :type="passVisible ? 'text' : 'password'"
                @click:append="passVisible = !passVisible"
              ></v-text-field>
              <v-text-field
                v-model="confirmPassword"
                data-vv-name="confirmPassword"
                v-validate="'required|confirmed:referencia_password'"
                :error-messages="errors.collect('confirmPassword')"
                required
                label="Confirmar contraseña"
                prepend-icon="lock"
                placeholder=" "
                :append-icon="confirmPassVisible ? 'visibility_off' : 'visibility'"
                :type="confirmPassVisible ? 'text' : 'password'"
                @click:append="confirmPassVisible = !confirmPassVisible"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-layout>
              <v-spacer></v-spacer>
              <v-btn color="primary" small dark @click="irAvistaLogin()">
                <v-icon dark left>arrow_back</v-icon>Atras
              </v-btn>

              <v-btn color="primary" small dark @click="limpiar()">
                Limpiar
                <v-icon right dark>clear</v-icon>
              </v-btn>

              <v-btn color="primary" small dark @click="registrar()">
                Registrase
                <v-icon right dark>check</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "Registro",
  data() {
    return {
      nit: "",
      mascaraNit: "####-######-###-#",
      correo: "",
      password: "",
      confirmPassword: "",
      passVisible: false,
      confirmPassVisible: false,
      dictionary: {
        attributes: {
          nit: "NIT",
          correo: "Correo",
          password: "Contraseña",
          confirmPassword: "Confirmación contraseña"
        },
        custom: {
          nit: {
            required: function() {
              return "El campo NIT es requerido";
            },
            max: function() {
              return "El campo NIT solo puede tener 17 caracteres incluyendo los guiones(-)";
            }
          },
          correo: {
            required: function() {
              return "El campo correo es requerido";
            }
          },
          password: {
            required: function() {
              return "El campo Contraseña es requerido";
            }
          },
          confirmPassword: {
            required: function() {
              return "El campo confirmar contraseña es requerido";
            },
            confirmed: function() {
              return "La confirmación debe coincidir con la contraseña";
            }
          }
        }
      }
    };
  },
  mounted() {
    this.$validator.localize("en", this.dictionary);
    this.$emit("componenteCargado", 1);
  },
  methods: {
    irAvistaLogin: function() {
      this.$router.push({ name: "Login" });
    },
    registrar: function() {
      this.$validator.validateAll().then(result => {
        if (result) {
          alert("Correcto, registrar ahora!!");
        } else {
          alert("ERRORES arreglar");
        }
      });
    },
    limpiar: function() {
      this.nit = "";
      this.correo = "";
      this.password = "";
      this.confirmPassword = "";
      this.$validator.reset();
    }
  }
};
</script>
