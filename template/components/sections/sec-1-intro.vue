<template lang="pug">

  ui-section(:sectionData="sectionData")
    template(slot="sectionContent")
      ui-header(
        :headerData="headerData"
        :socials="socials"
      )
        template(slot="headerLogo")
          ui-icon(:name="'logo'" v-if="menuIsOpen").icon--white
          ui-icon(:name="'logo'" v-else)

        template(slot="headerContent")
          ui-slider(
            v-if="showSlider"
            :flickityOptions="flickityOptions"
          )
            .currency__slide(
              slot="sliderContent"
              v-for="data in sliderData"
            )
              small(v-html="data.name")
              .d-flex.align-items-end.align-content-end
                small(v-html="data.price.value")
                span.d-flex.align-items-end.align-content-end
                  span.currency__status(:class=" data.change.day.indexOf('-') !== -1 ?  'down': 'up' ")
                  small(:class=" data.change.day.indexOf('-') !== -1 ?  'down': 'up' " v-html="data.change.day")

        .header__btns(slot="headerBtns")
          a(:href="`${appLink}/signin`" v-html="$t('btn.signin')").btn.btn-link
          a(:href="`${appLink}/signup`" v-html="$t('btn.signup')").btn.btn-primary-outline


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

        flickityOptions: {
          cellAlign: 'left',
          wrapAround: true,
          prevNextButtons: true,
          pageDots: false,
        },

        sectionData: {
          label: {
            text: '',
            classes: ['text-warning', 'h4'],
          },
          container: {
            classes: ['bg-info', 'section__cotnainer--fullheight'],
          },
          id: '1',
        },
      };
    },
    components: {},
    watch: {},
    methods: {},
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
          menu: [
            this.$t('section2.label'),
            this.$t('section3.label'),
            this.$t('section4.label'),
            this.$t('section5.label'),
            this.$t('section6.label'),
            this.$t('section7.label'),
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

      appLink() {
        return `https://app.icex.ch/${this.locale.active}/auth`
      },
    },
    fetch() {},
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
  
</style>
