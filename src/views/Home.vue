<template>
    <h1>Vista home donde cargaran todos los demas componentes</h1>
</template>
<script>
export default {
    name:'Home',
    mounted(){
        this.$emit('componenteCargado',5)
    }
}
</script>

