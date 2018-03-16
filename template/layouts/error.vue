<template lang="pug">
  .layout__container.error__wrap(:class="theme")
    h1.error__code(v-html="error.statusCode")
    .error__container
      .error__img
        img(src="~static/img/404_desk.png")
      .error__content
        .error__title(v-html ="error.title")
        .error__desc(v-html ="error.message")
        nuxt-link.error__link(v-html="$t('error.home')" to="/")

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
  @import "~assets/sass/vars.sass";
  @import "~bootstrap/scss/bootstrap.scss";

  .error__wrap
    width: 100%
    min-height: 100%
    display: flex
    flex-flow: column nowrap
    justify-content: center

  .error__container
    display: flex
    flex-flow: row nowrap
    align-items: center
    @include media-breakpoint-down(md)
      flex-flow: row wrap

  .error__img,
  .error__content
    width: 50%
    padding: 1rem
    @include media-breakpoint-down(md)
      width: 100%

  .error__img
    img
      width: 100%
    // @include media-breakpoint-down(md)
    //   displa: none

  .error__content
    padding-left: 6rem
    @include media-breakpoint-down(md)
      padding-left: 1rem
      text-align: center


  .error__title
    margin-bottom: 1.5rem
    font-size: 1.5rem
    font-weight: 600
    @include media-breakpoint-down(md)

  .error__desc
    margin-bottom: 5rem
    font-size: .9rem
    @include media-breakpoint-down(md)
      margin-bottom: 2rem

  .error__code
    font-size: 10rem
    text-align: center
    text-shadow: .1rem .2rem 0 rgba(black, .15)
    @include media-breakpoint-down(lg)
      font-size: 8rem

    @include media-breakpoint-down(md)
      font-size: 7rem

    @include media-breakpoint-down(sm)
      font-size: 6rem

    @include media-breakpoint-down(xs)
      font-size: 5rem

  .error__link
    display: inline-block
    width: auto
    margin-left: -5rem
    padding: .4rem 1rem
    text-decoration: none
    border-radius: .5rem
    @include media-breakpoint-down(md)
      margin-left: 0
    &:hover
      text-decoration: none

  .error__wrap
    &.light
      background-color: $catskill_white

  .light
    .error__code
      color: $denim
      font-weight: bold

    .error__title
      color: $tangaroa

    .error__desc
      color: $catalina_blue

    .error__link
      color: white
      background-color: $denim

</style>