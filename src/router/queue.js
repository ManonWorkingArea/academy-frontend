export default {
    // Member Router // ------------------------------------------
    path: '/queue',
    component: '',
    children: [
    {
        name: 'Member',
        path: '',
        meta: 
        {
            title: 'สมาชิก',
            type: 'page',
            auth: false,
        },
        component: () => import('../views/standard/member/Dashboard.vue'),
    },
    {
        name: 'Process',
        path: 'process',
        meta: 
        {
            title: 'ประวัติสมาชิก',
            parent: 'สมาชิก',
            type: 'page',
            auth: false,
        },
        component: () => import('../views/standard/member/Profile.vue'),
    },
    {
        name: 'Login',
        path: 'login',
        meta: 
        {
            title: 'เข้าสู่ระบบ',
            parent: 'สมาชิก',
            type: 'page',
            auth: false,
        },
        component: () => import('../views/standard/member/Login.vue'),
    },
    {
        name: 'Forgot',
        path: 'forgot',
        meta: 
        {
            title: 'ลืมรหัสผ่าน',
            parent: 'สมาชิก',
            type: 'page',
            auth: false,
        },
        component: () => import('../views/standard/member/Forgot.vue'),
    }, 
    {
        name: 'Register',
        path: 'register',
        meta: 
        {
            title: 'ลงทะเบียน',
            parent: 'สมาชิก',
            type: 'page',
            auth: false,
        },
        component: () => import('../views/standard/member/Register.vue'),
    }]
}
