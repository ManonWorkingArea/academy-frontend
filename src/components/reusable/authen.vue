<script>
import {useRoute} from 'vue-router';
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

export default {
	name: 'Authen',
    computed: {
    },
	components: {
	},
	mounted() {
    this.checkAuth();
	},
	updated() {
	},
	methods: {
        async checkAuth()
        {
            const route      = useRoute();
            const auth       = route.meta.auth;
            const page       = route.name;
            let accessToken  = cookies.get("userToken");
            let hasLogin     = cookies.get("hasLogin");

            console.log("Auth:",auth)
            console.log("Token:",accessToken)
            
            if(page!="Login")
            {
                if(auth) {
                    if(accessToken==="" || accessToken ===null) {
                        this.$router.replace({path: '/member/login'});
                        this.$store.commit('increment',false)
                        console.log("หน้า "+page+" สมาชิก ไม่มี Token / Auth Request :",this.$store.state.auth)
                    }  else {
                        this.$store.commit('increment',true)
                        console.log("หน้า "+page+" สมาชิก มี Token / Auth Request :",this.$store.state.auth)
                    }
                }
                else
                {
                    this.$store.commit('increment',true)
                    console.log("หน้า "+page+" ทั่วไป ไม่มี Token / Auth Request :",this.$store.state.auth)
                }
            }
            else
            {
                if(hasLogin)
                {
                    this.$router.replace({path: '/'});
                    this.$store.commit('increment',false)
                    console.log("หน้า "+page+" สมาชิก Login แล้ว / Auth Request :",this.$store.state.auth)
                }
                else
                {
                    this.$store.commit('increment',true)
                    console.log("หน้า "+page+" สมาชิก ยังไม่ได้ Login / Auth Request :",this.$store.state.auth)
                }
            } 
        },
    },
    setup() { 
    },
};
</script>

<template>
<div></div>
</template>