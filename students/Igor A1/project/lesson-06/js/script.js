const app = new Vue ({
  
  el:   '#app',
  
  data: {
    error: false
  },
  
  methods: {
    async loadData(url) {
      try {
        let response = await fetch(url);
        return await response.json();
      } catch(e) {this.error = e;};
    }
  }
  
});
