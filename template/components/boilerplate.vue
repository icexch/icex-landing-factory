<template lang="pug">

  ui-section(:sectionData="sectionData")
    template(slot="sectionContent")

</template>

<script>
  export default {
    name: 'boilerplate',
    mixins: [],
    props: {},
    data() {
      return {
        sectionData: {
          label: {
            text: '',
            classes: ['text-warning', 'h4'],
          },
          container: {
            classes: ['bg-info', 'section__cotnainer--fullheight'],
          },
        },
      };
    },
    components: {},
    watch: {},
    methods: {},
    computed: {},
    fetch() {},
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

<style lang="sass">
  
</style>
