<script>

// Component
import Authen from '@/components/reusable/authen.vue';

// Plugin
import { useCookies } from "vue3-cookies";

export default {
  name: 'ContactUs',
  inject: ['apiServer'],
  data() {
    return {
      username: '',
      password: '',
      showPassword: false,
      passwordFieldType: "password",
      activeBlock: false
    }
  },
  components: {
    Authen
  },
  methods: {
    async login() {
        try 
        {
          this.activeBlock = true;
          const resAPI = await fetch(this.apiServer + "user/login",
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              email: this.username,
              password: this.password
            })
          });

          const finalRes   = await resAPI.json();

          if(finalRes.success)
          {
            //toast.success("เข้าสู่ระบบเรียบร้อยแล้ว.....", {timeout:1000});
            let userToken = finalRes.token;
            this.cookies.set("userToken", userToken);
            this.cookies.set("hasLogin", true);
            console.log("Login",finalRes)
            this.$swal({
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 2000,
                icon: 'success',
                title: 'แจ้งเตือน',
                text: 'เข้าสู่ระบบเรียบร้อยแล้ว',
            }).then(() => 
            {
              window.location.href = "/member"
            });
          }
          else
          {
            this.$swal({
            title: 'เกิดข้อผิดพลาด',
            text: finalRes.error,
            icon: 'error',
            confirmButtonText: 'ตกลง'
            }).then(() => {
              this.activeBlock = false;
            })
          }
        } 
        catch (error) 
        {
          console.log(error)
        }
    },
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
      this.show = !this.show;
      this.$refs.btnToggle.innerText = this.show?'ซ่อน':'แสดง';
    }
  },
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
 
  mounted() {
    // let my_cookie_value = this.cookies.get("myCoookie");
    // console.log(my_cookie_value);
  }
}
</script>

<template>
  <Authen/>

  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">เข้าสู่ระบบ</h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        หรือ
        <a href="register" class="font-medium text-indigo-600 hover:text-indigo-500">ลงทะเบียนสมาชิกใหม่</a>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 container" :class="[(activeBlock?'isblock' : 'isunblock')]">
        <form class="space-y-6" @submit.prevent="login">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">อีเมล์/ชื่อผู้ใช้งาน</label>
            <div class="mt-1">
              <input v-model="username" name="username" placeholder="ชื่อผู้ใช้" type="email" autocomplete="email" required class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">รหัสผ่าน</label>
            <div class="mt-1">
              <div class="relative w-full">
                <div class="absolute inset-y-0 right-0 flex items-center px-2">
                  <input class="hidden js-password-toggle" id="toggle" type="checkbox" />
                  <label class="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label" for="toggle" @click="switchVisibility" ref="btnToggle">แสดง</label>
                </div>
                <input v-model="password" id="password" name="password" placeholder="รหัสผ่าน" :type="passwordFieldType" autocomplete="off" class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"/>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">จำข้อมูลของฉัน</label>
            </div>

            <div class="text-sm">
              <a href="forgot" class="font-medium text-indigo-600 hover:text-indigo-500">ลืมรหัสผ่าน?</a>
            </div>
          </div>

          <div>
            <button type="submit" class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">เข้าสู่ระบบ</button>
          </div>
        </form>

      </div>
    </div>
  </div>

</template>