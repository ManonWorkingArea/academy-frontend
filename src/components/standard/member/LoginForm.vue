<script>
import FormWrapper from '../../../utils/FormWrapper.vue'
import StorageManager from '../../../utils/storage/Storage';

export default {
    name: 'LoginForm',
    components: {
        FormWrapper
    },
    data() {

        return {
            storage: new StorageManager("sessionStorage"),
            email: '',
            phone: '',
            password: '',
            datareturn: '',
            loadingText: 'กำลังตรวจสอบข้อมูลบัญชี',
        }
    },
    methods: {
        setData(key) {
            const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1;
            this.storage.set(key, generateRandomNumber());
        },
        removeData(key) {
            this.storage.remove(key);
        },
        getData(key) {

            (async () => {
                try {
                    this.datareturn = await this.storage.get(key);
                    console.log("datareturn", this.datareturn);
                } catch (error) {
                    console.error(error);
                }
            })();

        },
        onSuccess(response) {
            console.log('Success!', response.localId)
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

<template>
<!-- Section 1 -->
<section class="w-full px-8 py-28 bg-gray-100 xl:px-8">
    <div class="max-w-5xl mx-auto">
        <div class="flex flex-col items-center md:flex-row">

            <div class="w-full space-y-5 md:w-3/5 md:pr-16">
                <p class="font-medium text-blue-500 uppercase">Building Businesses</p>
                <h2 class="text-2xl font-extrabold leading-none text-black sm:text-3xl md:text-5xl">
                    Changing The Way People Do Business.
                </h2>
                <p class="text-xl text-gray-600 md:pr-16">Learn how to engage with your visitors and teach them about your mission. We're revolutionizing the way customers and businesses interact.</p>

                <div>
                    {{datareturn}}
                    <button @click="setData('key1')">Set Data</button>
                    <button @click="getData('key1')">Get Data</button>
                    <button @click="removeData('key1')">Remove Data</button>
                    <br> -- <br>
                    {{datareturn}}
                    <button @click="setData('key2')">Set Data</button>
                    <button @click="getData('key2')">Get Data</button>
                    <button @click="removeData('key2')">Remove Data</button>
                </div>

            </div>

            <div class="w-full mt-16 md:mt-0 md:w-2/5">
                <div class="relative z-10 h-auto p-8 py-10 overflow-hidden bg-white border-b-2 border-gray-300 shadow-2xl px-7 rounded-none">
                    <h3 class="mb-6 text-2xl font-medium text-center">Sign in to your Account</h3>

                        <form-wrapper ref="formWrapper" url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDODKwE1BfZOj9ieB6pisJm-p2MmudWLSw" 
                        :success-callback="onSuccess" 
                        :error-callback="onError" 
                        :loading-text="loadingText" class="space-y-6">

                        <input type="text" v-model="email" name="email" placeholder="ชื่อผู้ใช้" class="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 focus:ring focus:ring-blue-500 focus:outline-none rounded-none">
                        <input type="password" v-model="password" id="password" name="password" placeholder="รหัสผ่าน" class="block w-full px-4 py-3 mb-4 border border-2 border-transparent border-gray-200 focus:ring focus:ring-blue-500 focus:outline-none rounded-none">
                        <div class="block">
                            <button class="w-full px-3 py-4 font-medium text-white bg-blue-600 rounded-none">Log Me In</button>
                        </div>
                        <p class="w-full mt-4 text-sm text-center text-gray-500">Don't have an account? <a href="#_" class="text-blue-500 underline">Sign up here</a></p>

                        </form-wrapper>

                </div>
            </div>

        </div>
    </div>
</section>
</template>
