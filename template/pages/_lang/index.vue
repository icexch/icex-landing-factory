<template lang="pug">

  ui-section(:data="section1")
    div(slot="sectionContent")
      ui-header(
          :data="headerData"
          @clickbtn="emitBtnClick"
        )
          template(slot="headerContent")
            h1 here is header content


          .header__btns(slot="headerBtns")
            h1 here is btns

</template>

<script>
  import uiSection from 'icex-landing-uikit/uiSection/uiSection.vue'
  import uiHeader from 'icex-landing-uikit/uiHeader/uiHeader.vue'
  import { mapState, mapGetters } from 'vuex';
  export default {
    name: 'boilerplate',
    mixins: [],
    props: [],
    data() {
      return {
        section1: {
          label: {
            text: '',
            classes: ['text-warning', 'h4'],
          },
          container: {
            classes: ['bg-info', 'section__cotnainer--fullheight'],
          }
        },
      };
    },
    components: {
      uiHeader,
      uiSection,
    },
    watch: {},
    methods: {
      emitBtnClick() {
        console.log('emit');
      },
    },
    computed: {
      ...mapGetters({
        locale: 'common/locale',
      }),
      headerData() {
        return {
          locale: this.locale,
          logo: {
            url: '/img/logo.svg',
          },
          share: {
            // chage with $t('header.share')
            title: 'Follow us',
          },
          menu: [
            'Menu item 1',
            'Menu item 2',
            'Menu item 3',
            'Menu item 4',
            'Menu item 5',
          ]
        }
      },
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

  @import "~bootstrap/scss/bootstrap.scss";

  @import "~icex-landing-uikit/uiHeader/uiHeader";
</style>
