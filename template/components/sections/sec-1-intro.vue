<template lang="pug">

  ui-section(:sectionData="sectionData")
    template(slot="sectionContent")
      ui-header(
        :headerData="headerData"
        :socials="socials"
      )
        template(slot="headerLogoDesktop")
          ui-icon(:name="'logo'" v-if="menuIsOpen").icon--white
          ui-icon(:name="'logo'" v-else)

        template(slot="headerLogoMobile")
          ui-icon(:name="'logo'" v-if="menuIsOpen").icon--white
          ui-icon(:name="'logo'" v-else)

        template(slot="headerContent")
          ui-slider(
            v-if="showSlider"
            :flickityOptions="flickityOptions"
          )
            .currency__slide.pl-3(
              slot="sliderContent"
              v-for="data in sliderData"
            )
              .small.currency__name(v-html="data.name")
              .d-flex.align-items-end.align-content-end
                small(v-html="data.price.value")
                span.d-flex.align-items-end.align-content-end
                  span.currency__status(:class=" data.change.day.indexOf('-') !== -1 ?  'down': 'up' ")
                  small(:class=" data.change.day.indexOf('-') !== -1 ?  'down': 'up' " v-html="data.change.day")


      .scrolldown(v-scroll-to="'#about_wallet'")
      .scroller(:style="{ 'visibility' : stickNav ? 'visible' : 'hidden' }", @click="scrollToTop()")

</template>

<script>
  import { mapState, mapGetters } from 'vuex';

  export default {
    name: 'section-1',
    mixins: [],
    props: {
      socials: {
        type: Array,
        required: true,
      }
    },
    data() {
      return {
        showSlider: false,
        stickNav: false,
        /**
         * Slider options
         */
        flickityOptions: {
          cellAlign: 'left',
          wrapAround: true,
          prevNextButtons: false,
          pageDots: false,
          freeScroll: true,
          selectedAttraction: 0.001,
          freeScrollFriction: 1,
          friction: 1,
          autoPlay: 4000,
        },

        sectionData: {
          label: {
            text: '',
            classes: ['text-warning', 'h4'],
          },
          container: {
            classes: ['bg-info', 'section__container--fullheight'],
          },
          id: '1',
        },
      };
    },
    components: {},
    watch: {},
    methods: {
      /**
       * Check if user scrolled more then 100vh
       */
      checkNavSticking () {
        if (process.browser) {
          this.stickNav = window.scrollY > window.innerHeight;
        }
      },
    },
    computed: {
      headerData() {
        return {
          locale: this.localeData,
          label: 'Test',
          share: {
            // chage with $t('header.share')
            class: 'white',
            title: this.$t('social.title'),
          },
          /**
           * Every time start from 2. 
           * @type {Array}
           */
          menu: [
            {
              label: this.$t('section2.label'),
              index: 2,
            },
            {
              label: this.$t('section3.label'),
              index: 3,
            },
            {
              label: this.$t('section4.label'),
              index: 4,
            },
            {
              label: this.$t('section5.label'),
              index: 5,
            },
            {
              label: this.$t('section6.label'),
              index: 6,
            },
            {
              label: this.$t('section7.label'),
              index: 7,
            },
          ]
        }
      },
      ...mapGetters({
        localeData: 'common/locale',
      }),
      ...mapState({
        sliderData: state => state.coins.data,
        currency: state => state.common.currency,
        locale: state => state.common.locale,
        menuIsOpen: state => state.common.menuIsOpen,
      }),

    },
    fetch() {},
    beforeCreate() {},
    created () {
      if (process.browser) {
        window.addEventListener('scroll', this.checkNavSticking);
      }
    },
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
    destroyed () {
      if (process.browser) {
        window.removeEventListener('scroll', this.checkNavSticking);
      }
    },
    errorCaptured() {},
  };
</script>

<style lang="sass">
  
</style>
