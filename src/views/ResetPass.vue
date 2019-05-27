<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs10 sm8 md5 lg4 xl3>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Restablecer contraseña</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <div class="headline">¿Ha olvidado su contraseña?</div>
            <p>
              Para restablecer su contraseña, introduzca su NIT y precione el botón enviar.
              Posteriormente en su correo institucional asociado a su cuenta recibirá un mensaje
              en el cual se mostrará un enlace con el que podra reestablecer su contraseña.
              En caso de no poder reestablecer su contraseña por este medio, comunicarse con el
              departamento de informática.
            </p>
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
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-layout>
              <v-spacer></v-spacer>
              <v-btn color="primary" dark @click="irAvistaLogin()" small>
                <v-icon dark left>arrow_back</v-icon>Atras
              </v-btn>

              <v-btn color="primary" dark @click="limpiar()" small>
                Limpiar
                <v-icon right dark>clear</v-icon>
              </v-btn>

              <v-btn color="primary" dark @click="restablecer()" small>
                Enviar
                <v-icon right dark>send</v-icon>
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
  name: "ResetPass",
  data() {
    return {
      nit: "",
      mascaraNit: "####-######-###-#",
      dictionary: {
        attributes: {
          nit: "NIT"
        },
        custom: {
          nit: {
            required: function() {
              return "El campo NIT es requerido";
            },
            max:
              "El campo NIT solo puede tener 17 caracteres incluyendo los guiones(-)"
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
    limpiar: function() {
      this.nit = "";
      this.$validator.reset();
    },
    restablecer: function() {
      this.$validator.validateAll().then(result => {
        if (result) {
          alert("Restablecer contra");
        } else {
          alert("validar bien");
        }
      });
    }
  }
};
</script>
<style>
p {
  text-align: justify;
}
</style>