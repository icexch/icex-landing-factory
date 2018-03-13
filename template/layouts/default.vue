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
  @import "~assets/sass/vars.sass";
  @import "~bootstrap/scss/bootstrap.scss";

  .layout__container
    height: 100vh
    position: relative
    padding-top: 3.4rem
    padding-left: 3.4rem
    margin: auto
    transition: 0.3s

    @include media-breakpoint-down(md)
      padding-left: .4rem
      padding-right: .4rem
      padding-top: 3.2rem

    &.__short
      padding-left: 11.2rem
      @include media-breakpoint-down(md)
        padding-left: .4rem

    &.dark
      color: $athens_gray
      border: 1px solid $rhino
      background-color: #181c31

    &.light
      color: $tangaroa
      border: 1px solid $mischka
      background-color: $catskill_white

  .layout__content
    height: 100%
    overflow-y: scroll
    padding-right: .6rem

</style>
