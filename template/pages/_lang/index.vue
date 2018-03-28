<template lang="pug">

  div
    section1(:socials="socials")
    .section__cotnainer--fullheight
    .section__cotnainer--fullheight
    landing-footer(:socials="socials")


</template>

<script>
  import section1 from '~/components/sections/section1.vue'
  import landingFooter from '~/components/landingFooter.vue'

  import { mapState, mapGetters } from 'vuex';
  export default {
    name: 'home_page',
    mixins: [],
    props: [],
    data() {
      return {
        socials: [
          {
            name: 'facebook',
            url: 'https://www.facebook.com/ICEX.CH/',
          },
          {
            name: 'vkontakte',
            url: 'https://vk.com/icexch',
          },
          {
            name: 'instagram',
            url: 'https://www.instagram.com/icex.ch/',
          },
          {
            name: 'telegram',
            url: 'https://t.me/icexch',
          },
          {
            name: 'twitter',
            url: 'https://twitter.com/icex_ch',
          },
        ],
      };
    },
    watch: {},
    methods: {
    },
    components: {
      section1,
      landingFooter,
    },
    computed: {
      ...mapGetters({
        localeData: 'common/locale',
      }),
      ...mapState({
        sliderData: state => state.coins.data,
        currency: state => state.common.currency,
        locale: state => state.common.locale,
      }),
    },
    fetch({ redirect, params }) {
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

<style lang="sass">

  @import '~assets/base.sass'

</style>
