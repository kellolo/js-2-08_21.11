Vue.component ('goods', {
  
  data () {
    return {
      imgSrc: 'https://placehold.it/200x150',
      goods: [],
      filteredGoods: []
    }
  },
  
  methods: {
    filter(s) {
      const regExp = new RegExp(s, 'i');
      this.filteredGoods = this.goods.filter(g => regExp.test(g.product_name));
    }
  },
  
  mounted () {
    this.$parent.loadData(`${server.url}/${query.catalog}`)
      .then(data => {
        if(this.$parent.error)
          this.$root.$refs.error.log(`Ошибка при загрузке каталога товаров.`)
        else {
          data.forEach(d => {
            d.img = this.imgSrc;
            this.goods.push(d);
          });
          this.filter('');
        };
      });
  },
  
  template: `
    <div class="products">
      <div v-if="filteredGoods.length === 0">Нет данных.</div>
      <goods-item v-else v-for="good of filteredGoods" :good="good" :key="good.id_product"></goods-item>
    </div>`
    
});
