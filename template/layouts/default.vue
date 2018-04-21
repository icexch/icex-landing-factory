<template lang="pug">

  div.layout__container(:class="{'layout__container--unscroll': scrollDisabled, 'layout__container--unscroll-mobile': scrollDisabled && isMobile}")
    nuxt

</template>

<script>
  import { mapState } from 'vuex';

  export default {
    head() {
      return {
        link: [
          {
            rel: 'alternate',
            href: this.link('ru'),
            hreflang: 'ru',
          },
          {
            rel: 'alternate',
            href: this.link('en'),
            hreflang: 'en',
          },
          {
            rel: 'alternate',
            href: this.link('ko'),
            hreflang: 'ko',
          },
        ],
        meta: [
          {
            hid: 'og:title',
            name: 'og:title',
            content: 'icex.ch',
          },
          {
            hid: 'og:type',
            name: 'og:type',
            content: 'website',
          },
          {
            hid: 'og:image',
            name: 'og:image',
            content: `${this.host}/static/img/logo.svg`,
          },
          {
            hid: 'og:url',
            name: 'og:url',
            content: `${this.host}/${this.$route.fullPath}`,
          },
          {
            hid: 'og:locale',
            name: 'og:locale',
            content: this.localeForMeta,
          },
          {
            hid: 'og:site_name',
            name: 'og:site_name',
            content: 'icex.ch',
          },
        ],
      };
    },

    data() {
      return {
        host: '',
      };
    },

    components: {
    },

    methods: {

      link(locale) {
        const path = this.$route.fullPath.replace(/^.{3}/g, `/${locale}`);
        return this.host + path;
      },
    },

    computed: {
      ...mapState({
        locale: state => state.common.locale,
        isMobile: state => state.common.isMobile,
        scrollDisabled : state => state.common.scrollDisabled,
      }),
    },

    mounted() {
      this.$store.dispatch('common/setUserDefaultParams');
    }
  };

</script>

<style lang="sass">
  .layout__container
    overflow: hidden
    width: 100%

  .layout__container--unscroll
    height: 100vh

  .layout__container--unscroll-mobile
    position: fixed
    left: 0
    top: 0

</style>
