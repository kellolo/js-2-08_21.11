//глобальный компонент
let templ = {template: true, name: 'Ivan Petrov', email: 'example@yandex.com', body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, ipsa tenetur consequatur, dolore dolorem odio rerum labore, commodi impedit ea quo doloremque excepturi. Quia, labore corrupti iure deserunt eos sequi.'}

Vue.component ('post', {
    template: `
        <div class="post">
        <button @click="togglePost" v-if="!comm.template">{{ toggleButtonText }}</button>
            <div class="user">
                <h1>{{ name }}</h1>
            </div>
            <div v-show="!collapsed">
                <div class="post-body">
                    <p>
                        {{ body }}
                    </p>
                </div>
                <div class="post-footer">
                    <a href="#">{{ email }}</a>
                </div>
            </div>
        </div>
    `,
    props: {
        comm: {type: Object, default: () => templ}
    },
    data () {
        return {
            collapsed: false,
            name: '',
            body: '',
            email: ''
        }
    },
    computed: {
        toggleButtonText () {
            return this.collapsed ? '+' : '-'
        }
    },
    methods: {
        togglePost () {
            this.collapsed = !this.collapsed
        },
        changePost (n, b, e) {
            this.name = n
            this.body = b
            this.email = e
        }
    },
    mounted () {
        this.name = this.comm.name
        this.body = this.comm.body
        this.email = this.comm.email
        console.log ('from comp')
        console.log (this.$parent) // === this.$root
    }
    // props: ['comm']
})