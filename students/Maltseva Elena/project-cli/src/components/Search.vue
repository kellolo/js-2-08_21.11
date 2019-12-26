<template>
    <form action="#" class="search-form">
        <input type="text" class="search-field" v-model="searchLine" @input="$root.$refs.catalog.searchProducts(searchLine)">
        <button class="btn-search" type="submit">
            <i class="fas fa-search"></i>
        </button>
    </form>
</template>

<script>
export default {
    data () {
        return {
            searchLine: ''
        }
    }
}
</script>

<style>

</style>