export default {
    path: '/course',
    component: '',
    children: [
    {
        name: 'Course',
        path: '',
        meta: 
        {
            layout: 'Default',
            title: 'หลักสูตร',
            type: 'page',
            auth: false,
        },
        component: () => import('../views/standard/course/List.vue'),
    },
    {
        name: 'Detail',
        path: 'detail/:slug/:id',
        meta: 
        {
            layout: 'Default',
            title: 'รายละเอียด',
            parent: 'หลักสูตร',
            type: 'page',
            auth: false,
        },
        component: () => import('../views/standard/course/Single.vue'),
    }, 
    {
        name: 'Enroll',
        path: 'enroll/:id',
        meta: 
        {
            layout: 'Default',
            title: 'รายละเอียด',
            parent: 'หลักสูตร',
            type: 'page',
            auth: false,
        },
        component: () => import('../views/standard/course/Enroll.vue'),
    }, 
    {
        name: 'Thank',
        path: 'thank',
        meta: 
        {
            layout: 'Default',
            title: 'รายละเอียด',
            parent: 'หลักสูตร',
            type: 'page',
            auth: false,
        },
        component: () => import('../views/standard/course/Thank.vue'),
    }, 
    {
        name: 'Play',
        path: 'play/:id/:ep',
        meta: 
        {
            layout: 'Default',
            title: 'เข้าเรียน',
            parent: 'หลักสูตร',
            type: 'page',
            auth: true,
        },
        component: () => import('../views/standard/course/Play.vue'),
    },
    {
        name: 'Assign',
        path: 'assign/:id',
        meta: 
        {
            layout: 'Default',
            title: 'ลงทะเบียนหลักสูตร',
            parent: 'หลักสูตร',
            type: 'page',
            auth: true,
        },
        component: () => import('../views/standard/home/Index.vue'),
    },
    {
        name: 'Certification',
        path: 'certification',
        meta: 
        {
            layout: 'Default',
            title: 'ใบรับรอง',
            parent: 'หลักสูตร',
            type: 'page',
            auth: true,
        },
        component: () => import('../views/standard/course/Certification.vue'),
    }, 
    {
        name: 'Exam',
        path: 'exam/:id',
        meta: 
        {
            layout: 'Default',
            title: 'แบบทดสอบ',
            parent: 'หลักสูตร',
            type: 'page',
            auth: true,
        },
        component: () => import('../views/standard/course/Exam.vue'),
    }]
}