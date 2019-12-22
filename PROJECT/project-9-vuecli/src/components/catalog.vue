<template>
    <div class="products">  
        <product v-for="product of filtered" :img="imgCatalog" :product="product" :key="product.id_product"></product>
    </div>
</template>

<script>
    import product from './product'

    export default {
        data () {
            return {
                products: [],
                filtered: [],
                imgCatalog: 'https://placehold.it/200x150'
            }
        },
        mounted () {
            this.$parent.getJson ('/api/products')
                .then (data => {
                    this.products = data
                    this.filtered = data
                })
        },
        methods: {
            filter (value) {
                let reg = new RegExp (value, 'i')
                this.filtered = this.products.filter (el => reg.test(el.product_name))
            }
        },
        components: {
            product
        }
    }
</script>

