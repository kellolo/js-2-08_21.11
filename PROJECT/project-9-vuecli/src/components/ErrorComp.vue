<template>
    <div class="error-block" v-if="text">
        <p class="error-msg">
            <button class="close-btn" @click="text = ''">&times;</button>
            {{ text }}
        </p>
    </div>
</template>

<script>
export default {
    data () {
        return {
            text: ''
        }
    },
    methods: {
        setError (error) {
            this.text = error;
        }
    }
}
</script>

<style>

</style>