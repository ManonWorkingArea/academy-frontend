<template>
    <form @submit.prevent="submitForm">
      <slot name="form-fields"></slot>
      <loading-overlay
      :visible="loading"
      :text="spinnerText"
      :error="error"
      :keep-error="keepError"
      :close="closeOverlay"
    ></loading-overlay>
      <button type="submit" :disabled="loading">Submit</button>
    </form>
  </template>
  
  <script>
import LoadingOverlay from './LoadingOverlay.vue';
  
export default {
  components: {
    LoadingOverlay,
  },
  props: {
    formData: {
      type: Object,
      required: true,
    },
    submitUrl: {
      type: String,
      required: true,
    },
    afterSubmit: {
      type: Function,
      required: false,
    },
    loadingText: {
      type: String,
      required: false,
      default: 'Loading...',
    },
  },
  data() {
    return {
      loading: false,
      spinnerText: 'Loading...',
      error: false,
      keepError: false,
    }
  },
  methods: {
    async submitForm() {
      this.loading = true;
      try {
        // send form data to server
        await this.sendFormData();
        this.spinnerText = 'Success!';
        // execute afterSubmit callback if provided
        if (this.afterSubmit) {
          this.afterSubmit();
        }
      } catch (error) {
        this.error = true;
        this.spinnerText = 'Error sending form data';
        this.keepError = true;
        // handle error
      } finally {
        this.loading = false;
      }
    },
    closeOverlay() {
      this.loading = false;
      this.keepError = false;
    },
    async sendFormData() {
      // send form data to server
      // use this.formData as the data to send
      // you may need to adjust the structure of this.formData to match the structure expected by your server
      const response = await fetch(this.submitUrl, {
        method: 'POST',
        body: JSON.stringify(this.formData),
      });
      if (!response.ok) {
        throw new Error('Error sending form data');
      }
    }
  }
}
  </script>