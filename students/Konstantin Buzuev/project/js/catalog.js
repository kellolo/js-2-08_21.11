Vue.component('catalog', {
    props: {
        items: Array
    },
    template: `<div class="productWrap prodWrap">
                    <product v-for="item in items" v-bind:product="item"></product>
                </div>
                `
})