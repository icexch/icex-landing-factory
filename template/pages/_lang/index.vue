<template lang="pug">
  div
    section1(:socials="socials")

    ui-footer(
      :footerData="footerData"
      :socials="socials"
    )

</template>

<script>
  import section1 from '~/components/sections/section1.vue'
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
        footerData: {
          logo: {
            url: '/img/logo_footer.svg',
          },
          email: 'info@icex.ch',
          copyright: '© 2017 ICEX | Holygate Investments',
          share: {
            // chage with $t('header.share')
            title: 'Follow us',
          },
        },
      };
    },
    watch: {},
    methods: {
      emitBtnClick() {
        console.log('emit');
      },
    },
    components: {
      section1,
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

  $font-family-base: 'Montserrat'
  $primary: #021032
  $secondary: #0b50cd
  $info: #e7e9f1
  // example of changing header burger bg
  // $header-burger-bg: red

  @import "~bootstrap/scss/bootstrap.scss";

  @import "~icex-landing-uikit/index.sass";


</style>
