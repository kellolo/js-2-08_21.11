Vue.component('catalog', {
    props: {
        items: Array
    },
    data() {
        return {
            isFilled: true
        }
    },
    created() {
        eventBus.$on("search", (searchString) => {
            let filter = new RegExp("(\\" + "S*" + searchString + "\\" + "S*)", "i")
            this.isFilled = false
            this.items.forEach(item => {
                if (searchString == "") {
                    item.hidden = false;
                    this.isFilled = true
                } else {
                    if (filter.test(item.title)) {
                        item.hidden = false
                        this.isFilled = true
                    } else item.hidden = true
                }
            })
        })

    },
    template: `<div class="catalog__wrap">
                    <product v-for="item in items" v-bind:product="item"></product>
                    <div class = "catalog__emptyMsg" v-bind:class="{catalog_hidden: isFilled}">Извините, но по вашему запросу товаров не найдено!</div>
                </div>
                `
})