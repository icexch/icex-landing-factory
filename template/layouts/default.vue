<template lang="pug">

  div.layout__container
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
        host: 'https://app.icex.ch',
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
      }),
    },
  };

</script>

<style lang="sass">


</style>
