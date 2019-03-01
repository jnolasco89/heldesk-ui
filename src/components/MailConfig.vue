<template>
    <v-layout align-center justify-center row fill-height>
        <v-flex xs10 sm6 md4 lg3 xl3>
            <v-card class="elevation-12">
                <v-toolbar color="primary">
                    <v-toolbar-title>Configuracion de correo</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-form>
                        <v-text-field
                        label="Servidor SMPT"
                        v-model="servidorSMTP"
                        ></v-text-field>
                        <v-text-field
                        label="STTL"
                        v-model="sttl"
                        >
                        </v-text-field>
                        <v-text-field
                        label="Puerto"
                        v-model="puerto"
                        >
                        </v-text-field>
                        <v-text-field
                        label="Emisor"
                        v-model="correoEmisor"
                        ></v-text-field>
                        <v-text-field
                        label="Contrasenia"
                        v-model="contrasenia"
                        ></v-text-field>
                        <v-text-field
                        label="correoReceptor"
                        v-model="correoReceptor"
                        ></v-text-field>
                        <v-text-field
                        label="Auth"
                        v-model="auth"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="testear" color="primary">Testear</v-btn>
                </v-card-actions>
            </v-card>
            <v-alert color="error">
                {{error}}
            </v-alert>
        </v-flex>
    </v-layout>
</template>
<script>
export default {
    name:'MailConfig',
    data() {
        return {
            servidorSMTP:'',
            sttl:"true",
            puerto:'',
            correoEmisor:'',
            contrasenia:'',    
            correoReceptor:'',
            auth:"true",
            error:''
        }
    },
    methods:{
        testear:function(){
            this.$http
            .post('http://192.168.8.175:8080/helpdeskconna/ws/usuario/reset-password',
            {
                smtp:this.servidorSMTP,
                sttl:this.sttl,
                puerto:this.puerto,
                correoEmisor:this.correoEmisor,
                contrasenia:this.contrasenia,
                correoReceptor:this.correoReceptor,
                auth:this.auth
            })
            .then(response => {
                alert('en teoria enviado')
            })
            .catch(error => {
                this.error=error.response.status+error.response.data
                
            })
        }
    }
}
</script>