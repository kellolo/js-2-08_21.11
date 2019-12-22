import cart from './cart'
import goods from './goods'
import search from './search'
import error from './error'


const app = {
  
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
    cart,
    goods,
    search,
    error
  }
  
};

export default app