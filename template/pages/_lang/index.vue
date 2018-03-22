<template lang="pug">
  div
    ui-section(:sectionData="section1")
      ui-header(
        slot="sectionContent"
        :headerData="headerData"
        @clickbtn="emitBtnClick"
        :socials="socials"
      )
        ui-slider(
          slot="headerContent"
          v-if="showSlider"
          :flickityOptions="flickityOptions"
        )
          .currency__slide(
            slot="sliderContent"
            v-for="data in sliderData"
          )
            small(v-html="data.name")
            .d-flex.align-items-end.align-content-end
              small {{ data.price.value }}
              span.d-flex.align-items-end.align-content-end
                span.currency__status(:class=" data.change.day.indexOf('-') !== -1 ?  'down': 'up' ")
                small(:class=" data.change.day.indexOf('-') !== -1 ?  'down': 'up' " v-html="data.change.day")

        .header__btns(slot="headerBtns")
          ui-link(type="link" text="Sign in" :link="`${appLink}/signin`")
          ui-link(type="primary-outline" text="Sign up" :link="`${appLink}/signup`" @clickbtn="emitBtnClick")

    ui-footer(
      :footerData="footerData"
      :socials="socials"
    )

</template>

<script>

  import { mapState, mapGetters } from 'vuex';
  export default {
    name: 'home_page',
    mixins: [],
    props: [],
    data() {
      return {
        showSlider: false,
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
          email: 'info@icex.ch',
          copyright: '© 2017 ICEX | Holygate Investments',
          share: {
            // chage with $t('header.share')
            title: 'Follow us',
          },
        },

        flickityOptions: {
          cellAlign: 'left',
          // freeScroll: true,
          wrapAround: true,
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
        localeData: 'common/locale',
      }),
      ...mapState({
        sliderData: state => state.coins.data,
        currency: state => state.common.currency,
        locale: state => state.common.locale,
      }),

      appLink() {
        return `https://app.icex.ch/${this.locale.active}/auth`
      },

      headerData() {
        return {
          locale: this.localeData,
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
    mounted() {
      const params = {
        convert: this.currency,
        detail: true,
      };
      this.$store.dispatch('coins/fetchAllCoinsData', params )
        .then(() => {
          this.showSlider = true;
        });
    },
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
