<template>
  <b-overlay :show="loading" rounded="sm">
    <b-container class="text-center mt-4">
        <div class="bg-warning text-dark rounded-lg p-4">
          <h4 class="p-0 m-0">
            برای استفاده از نقشه گوگل نیاز به یک API key دارید!
          </h4>
        </div>

        <div class="w-50 mx-auto mt-4">
          <label for="api-key">API key خود را وارد کنید:</label>
          <b-input
            id="api-key"
            type="text"
            placeholder="API key"
            class="text-center"
            v-model="apiKey"
          />
          <b-button variant="success" class="mt-2" block @click="addApiKey"
            >حله !</b-button
          >
        </div>
      </b-container>
  </b-overlay>
</template>

<script>
import {checkApi} from '@/utils/check-api-key'
export default {
  name: "Home",
  data(){
    return{
      apiKey: null,
      loading: false
    }
  },
  methods:{
    async addApiKey(){
      this.loading = true;
      await checkApi(this.apiKey)
        .then(() => {
          this.$store.dispatch('addApiKey', this.apiKey);
          this.$store.dispatch('showAlert', {
            message: 'API key با موفقیت ثبت شد.',
            variant: 'success'
          })
          this.$router.push({name: 'Map'});
        })
        .catch(error => {
          this.$store.dispatch('showAlert', {
            message: error.reason === 'empty api passed' ? 
              'وارد کردن API key الزامی است!' : 'API key وارد شده نا معتبر است!',
            variant: 'danger'
          })
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
}
</script>
