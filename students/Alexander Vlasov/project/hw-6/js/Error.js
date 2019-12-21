Vue.component ('error-comp', {
    template: `
        <div class="error" v-show="showError">
            {{ errorText }}
        </div>
    `,
    data () {
        return {
            showError: false,
            errorText: ''
        }
    },
    methods: {
        error(text) {
            this.errorText = text
            this.showError = true
            setTimeout(() => {
                this.showError = false
            }, 3000)
        }
    }
})