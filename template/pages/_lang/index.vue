<template lang="pug">
  div
    ui-section(:data="section1")
      div(slot="sectionContent")

        ui-header(
          :data="headerData"
          @clickbtn="emitBtnClick"
        )
          template(slot="headerContent")
            no-ssr
              

          .header__btns(slot="headerBtns")
            ui-link(type="link" text="Sign in" :link="`${appLink}/signin`")
            ui-link(type="primary-outline" text="Sign up" :link="`${appLink}/signup`" @clickbtn="emitBtnClick")

    ui-section(:data="section2")
      div(slot="sectionContent")

    ui-section(:data="section3")
      div(slot="sectionContent")

    ui-footer(:data="footerData")
      div(slot="footerForm")

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
        sliderOptions: {
          slidesToScroll: 1,
          slidesToShow: 10,
          infinite: true,
          dots: false,
          speed: 700,
          responsive: [
            {
              breakpoint: 1800,
              settings: {
                slidesToShow: 10,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1600,
              settings: {
                slidesToShow: 9,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1480,
              settings: {
                slidesToShow: 7,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1240,
              settings: {
                slidesToShow: 6,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1040,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 880,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 5,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
            {
              breakpoint: 700,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 520,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              },
            },
            {
              breakpoint: 460,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
            {
              breakpoint: 360,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
              },
            },
          ],
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
