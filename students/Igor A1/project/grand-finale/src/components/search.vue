<template>
  <form action="#" class="search-form"
  @submit.prevent="$root.$refs.goods.filter(searchLine)">
    <input type="text" class="search-field" v-model="searchLine">
    <button class="btn-search" type="submit">
      <font-awesome-icon :icon="searchIcon"></font-awesome-icon>
    </button>
  </form>
</template>

<script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { faSearch } from '@fortawesome/free-solid-svg-icons'
  
  export default {
    data() {
      return {
        searchLine: '',
        searchIcon: faSearch
      }
    },
    
    components: {
      FontAwesomeIcon
    }
  }
</script>
