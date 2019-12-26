<template>
  <div id="app">
  
    <header>
      <div class="logo">E-shop</div>
      <div class="cart">

        <search></search>
        <cart ref="cart"></cart>
        
      </div>
    </header>
    
    <main>
    
      <goods ref="goods"></goods>
      
    </main>
    
    <error class="invisible" ref="error"></error>
    
  </div>
</template>

<script>
  import cart     from './components/cart'
  import search   from './components/search'
  import goods    from './components/goods'
  import error    from './components/error'

  export default {
    name: 'app',
    
    data() {
      return {
        error: false
      }
    },
    
    methods: {
      async loadData(url) {
        try {
          let response = await fetch(url);
          return await response.json();
        } catch(e) {this.error = e;};
      },
    
      async requestData(url, method, data) {
        try {
          let response = await fetch(url, {
            method:   method,
            headers:  {'Content-Type': 'application/json;charset=utf-8'},
            body:     JSON.stringify(data)
          });
          return await response.json();
        } catch(e) {this.error = e;};
      }
    },
    
    components: {
      'cart':   cart,
      'search': search,
      'goods':  goods,
      'error':  error
    }
  }
</script>
