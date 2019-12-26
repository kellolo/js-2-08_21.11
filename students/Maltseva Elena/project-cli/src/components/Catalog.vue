<template>
    <div class="products">
        <div class="empty" v-if="filteredItems.length == 0">Товары не найдены</div>
        <catalog-item v-else v-for="item in filteredItems" :item="item" :image="image" :key="item.id_product"></catalog-item>
    </div>
</template>

<script>
import catalogItem from './CatalogItem'
export default {
    data () {
        return {
            url: `/api/catalog`,
            image: 'https://placehold.it/200x150',
            items: [],
            filteredItems: []
        }
    },
    methods: {
        searchProducts(searchLine) {
            if (searchLine.length == 0) {
                return this.filteredItems = this.items
            } else {
                let searchRequest = new RegExp (searchLine, 'gi')
                return this.filteredItems = this.items.filter(item => {
                    return searchRequest.test(item.product_name)
                })
            }
        }
    },
    mounted () {
        this.$parent.fetchData(this.url)
            .then (dataArr => this.items = this.filteredItems = dataArr)
    },
    components: {
        'catalog-item': catalogItem
    }
}
</script>