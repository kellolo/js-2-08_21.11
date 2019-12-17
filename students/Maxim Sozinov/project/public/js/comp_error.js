Vue.component ('server-error', {
    // data () {
    //     return {
    //         smthWrong: false
    //     };
    // },
    template: `
        <div class="server-error" v-if="$root.smthWrong">
            We are sorry! Server is not responsible.
        </div>
    `
});