<template lang="pug">
  div
    ui-section(:data="section1")
      template(slot="sectionContent")

        ui-header(
          :data="headerData"
          @clickbtn="emitBtnClick"
        )
          template(slot="headerContent")

            ui-slider(:flickityOptions="flickityOptions")
              .currency__slide(v-for="data in sliderData" slot="sliderContent")
                small(v-html="data.name")
                .d-flex.align-items-end.align-content-end
                  small {{ data.price.value }}
                  span.d-flex.align-items-end.align-content-end
                    span.currency__status(:class=" data.change.day.indexOf('-') !== -1 ?  'down': 'up' ")
                    small(:class=" data.change.day.indexOf('-') !== -1 ?  'down': 'up' " v-html="data.change.day")

          .header__btns(slot="headerBtns")
            ui-link(type="link" text="Sign in" :link="`${appLink}/signin`")
            ui-link(type="primary-outline" text="Sign up" :link="`${appLink}/signup`" @clickbtn="emitBtnClick")


    ui-footer(:footerData="footerData")
      template(slot="footerForm")

</template>

<script>

  import { mapState, mapGetters } from 'vuex';
  export default {
    name: 'home_page',
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

        section2: {
          label: {
            text: 'Section label',
            classes: ['text-warning', 'h4'],
          },
          container: {
            classes: ['bg-primary', 'section__cotnainer--fullheight'],
          }
        },

        section3: {
          label: {
            text: 'Section label',
            classes: ['text-info', 'h5'],
          },
          container: {
            classes: ['bg-secondary', 'section__cotnainer--fullheight'],
          }
        },

        footerData: {
          logo: {
            url: '/img/logo_footer.svg',
          },
          share: {
            // chage with $t('header.share')
            title: 'Follow us',
          },
        },

        flickityOptions: {
          cellAlign: 'left',
          freeScroll: true,
          wrapAround: true,
          contain: true,
          prevNextButtons: true,
          pageDots: false,
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
    },
    computed: {
      ...mapGetters({
        locale: 'common/locale',
      }),
      ...mapState({
        sliderData: state => state.common.sliderData,
      }),

      appLink() {
        return `https://app.icex.ch/${this.locale.active}/auth`
      },

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

  @import "~icex-landing-uikit/index.sass";

</style>
