let serverError = {
    template: `
        <div class="server-error" v-if="$root.smthWrong">
            We are sorry! Server is not responsible.
        </div>
    `
};

export default serverError;