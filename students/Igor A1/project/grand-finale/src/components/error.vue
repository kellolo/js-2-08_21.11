<template>
  <p>{{errorMsg}}</p>
</template>

<script>
  export default {
    props: ['errorMsg'],
    
    methods: {
      log(msg) {
        console.error(msg)
        alert(msg)
      }
    }
  }
</script>
