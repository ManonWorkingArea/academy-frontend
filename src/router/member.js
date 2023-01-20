export default {
    // Member Router // ------------------------------------------
    path: '/member',
    component: '',
    children: [
    {
        name: 'Member',
        path: '',
        meta: 
        {
            layout: 'Default',
            title: 'สมาชิก',
            type: 'page',
            auth: true,
        },
        component: () => import('../views/standard/member/Dashboard.vue'),
    },
    {
        name: 'Profile',
        path: 'profile',
        meta: 
        {
            layout: 'Default',
            title: 'ประวัติสมาชิก',
            parent: 'สมาชิก',
            type: 'page',
            auth: true,
        },
        component: () => import('../views/standard/member/Profile.vue'),
    },
    {
        name: 'Login',
        path: 'login',
        meta: 
        {
            layout: 'Default',
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
            layout: 'Default',
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
            layout: 'Default',
            title: 'ลงทะเบียน',
            parent: 'สมาชิก',
            type: 'page',
            auth: false,
        },
        component: () => import('../views/standard/member/Register.vue'),
    }]
}
