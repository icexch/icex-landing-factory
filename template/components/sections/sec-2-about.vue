<template lang="pug">

  ui-section(:sectionData="sectionData")
    template(slot="sectionContent")
      .container-fluid.py-lg-5.pt-5


</template>

<script>
  export default {
    name: 'About',
    mixins: [],
    props: {},
    data() {
      return {
        sectionData: {
          name: 'about',
          id: '2',
          label: {
            text: this.$t('section2.label'),
            classes: ['text-secondary', 'h5'],
          },
          container: {
            classes: ['py-5', 'section__cotnainer--fullheight'],
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
