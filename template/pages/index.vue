<template lang="pug">
</template>

<script>
  export default {
    name: 'boilerplate',
    mixins: [],
    props: [],
    data() {
      return {};
    },
    components: {},
    watch: {},
    methods: {},
    computed: {},
    fetch({ redirect, params }) {
      if (params.lang === 'ko') {
        redirect(307, '/en');
      }
      redirect(307, '/en');
    },
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    activated() {},
    deactivated() {},
    beforeDestroy() {},
    destroyed() {},
    errorCaptured() {},
  };
</script>

<style>

</style>
