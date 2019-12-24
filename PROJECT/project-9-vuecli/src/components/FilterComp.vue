<template>
    <form action="#" class="search-form" @submit.prevent='$root.$children[0].$refs.products.filter (userSearch)'>
        <input type="text" class="search-field" v-model="userSearch">
        <button class="btn-search" type="submit">
            <i class="fas fa-search"></i>
        </button>
    </form>
</template>

<script>
export default {
    data () {
        return {
            userSearch: ''
        }
    }
}
</script>

<style>
    
</style>