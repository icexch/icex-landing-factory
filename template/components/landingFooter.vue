<template lang="pug">

  ui-footer(
    :footerData="footerData"
    :socials="socials"
  )
    template(slot="footerForm" @submit.prevent="validateForm")
      .text-center
        .text-white(v-html="$t('footer.writeToUs')")
      form.mb-2
        .form-group
          input(
            type="text"
            :placeholder="$t('form.placeholder.name')"
            :class="{'has-error': errors.name.length > 0 }"
            v-model="form.name"
            @input="clearErrors('name')"
          ).custom-control

        .form-group
          input(
            type="email"
            :placeholder="$t('form.placeholder.email')"
            :class="{'has-error': errors.email.length > 0 }"
            v-model="form.email"
            @input="clearErrors('email')"
          ).custom-control

        .form-group.mb-4
          textarea(
            row="5"
            :placeholder="$t('form.placeholder.message')"
            :class="{'has-error': errors.message.length > 0 }"
            v-model="form.message"
            @input="clearErrors('message')"
          ).custom-control

        .text-center
          button(v-html="$t('btn.send')" @click.prevent="validateForm").btn.btn-secondary.text-white

</template>

<script>
  import { _post } from '~/api/Utils/requests';
  export default {
    name: 'landingFooter',
    mixins: [],
    props: {
      socials: {
        type: Array,
        required: true,
      },
    },

    data() {
      return {
        baseUrl: 'https://api.icex.ch/api/',
        form: {
          name: '',
          email: '',
          message: '',
        },
        errors: {
          name: [],
          email: [],
          message: [],
        },
        footerData: {
          bg: '',
          logo: {
            url: '/img/logo_footer.svg',
          },
          form: {
            class: 'bg-primary',
          },
          email: 'info@icex.ch',
          copyright: '© 2017 ICEX | Holygate Investments',
          share: {
            // chage with $t('header.share')
            color: 'primary',
            title: this.$t('social.title'),
          },
        },
      };
    },
    components: {},
    watch: {},
    methods: {
      validateForm() {
        Object.keys(this.form).forEach((field) => {
          const err = this.errors[field];
          const val = this.form[field];

          if (!val) {
            err.push('empty');
            return;
          }

          if (field === 'name') {
            this.validateName(val);
            return;
          }

          if (field === 'email') {
            this.validateEmail(val);
            return;
          }

          this.sendForm();
        })
      },
      validateName(name) {
        if (name.length < 3) {
          this.errors.name.push('short');
        }
      },

      validateEmail(email) {
        const re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

        if (!re.test(email.toLowerCase())) {
          this.errors.email.push('invalidEmail');
        }
      },

      sendForm() {
        _post(this.baseUrl, 'landing/contact', this.form)
          .then((data) => {
            if (data.data.result) {
              this.form = {}
            }
          });
      },

      clearErrors(field) {
        this.errors[field] = [];
      },
    },
    computed: {},
    fetch() {},
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
  
</style>
