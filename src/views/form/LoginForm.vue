<template>
  <div class="login-form">
    <form-wrapper ref="formWrapper" url="https://dummyjson.com/auth/login" :success-callback="onSuccess" :error-callback="onError">
      <input class="block w-full py-2 px-3 border border-gray-300 rounded-md" type="text" v-model="username" name="username" placeholder="username" />
      <input class="block w-full py-2 px-3 border border-gray-300 rounded-md" type="text" v-model="phone" name="phone" placeholder="phone" />
      <input class="block w-full py-2 px-3 border border-gray-300 rounded-md" type="password" v-model="password" name="password" placeholder="password" />
      <button class="block w-full py-2 px-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-full" @click="submitForm" type="button">Submit</button>
    </form-wrapper>
  </div>
</template>

<script>

import FormWrapper from '../../utils/FormWrapper.vue'

export default {
  name: 'LoginForm',
  components: {
    FormWrapper
  },
  data() {
    return {
      username: '',
      phone: '',
      password: ''
    }
  },
  methods: {
    onSuccess(response) {
      console.log('Success!',response)
    },
    onError(error) {
      console.log('Error:', error)
    },
    submitForm(event) {
      this.$refs.formWrapper.submitForm(event)
    }
  }
}
</script>
