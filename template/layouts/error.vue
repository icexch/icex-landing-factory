<template lang="pug">
  .d-flex.flex-column.justify-content-center.error__container(:class="theme")

    h1.error__code(v-html="error.statusCode")

    .d-flex.align-items-center.flex-wrap.flex-md-nowrap

      .col-12.col-md-6
        img(src="~static/img/404_desk.png").mw-100

      .col-12.col-md-6.pl-5.text-center.text-md-left
        .error__title(v-html ="error.title")
        .error__desc(v-html ="error.message")
        nuxt-link.btn.btn-secondary(v-html="$t('error.home')" to="/")

</template>

<script>
  import { mapState } from 'vuex';

  export default {
    props: ['error'],

    layout: 'default',

    data() {
      return {
        error1: {
          code: 404,
          title: 'Page not found',
          desc: '',
        },
      };
    },

    computed: {
      ...mapState({
        theme: state => state.common.theme,
      }),
    },

  };
</script>

<style lang="sass">
  @import "~assets/sass/error.sass";
</style>