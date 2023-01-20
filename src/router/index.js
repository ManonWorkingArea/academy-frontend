import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/standard/home/Index.vue';
import memberRoutes 	from './member';
import courseRoutes 	from './course';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
		meta: 
		{
			layout: 'Default',
			title: 'หน้าหลัก',
			type: 'page',
			auth: false,
		},
	},
	{
		path: '/assign',
		component: '',
		children: [
		{
			name: 'Assign',
			path: '',
			meta: 
			{
				layout: 'Default',
				title: 'ลงทะเบียนหลักสูตร',
				type: 'page',
				auth: true,
			},
			component: () => import('../views/standard/home/Index.vue'),
		},
		{
			name: 'Checkout',
			path: 'checkout',
			meta: 
			{
				layout: 'Default',
				title: 'ชำระเงิน',
				parent: 'ลงทะเบียนหลักสูตร',
				type: 'page',
				auth: true,
			},
			component: () => import('../views/standard/home/Index.vue'),
		}, 
		{
			name: 'Pay',
			path: 'pay',
			meta: 
			{
				layout: 'Default',
				title: 'จ่ายเงิน',
				parent: 'ลงทะเบียนหลักสูตร',
				type: 'page',
				auth: true,
			},
			component: () => import('../views/standard/home/Index.vue'),
		}, 
		{
			name: 'Bill',
			path: 'bill',
			meta: 
			{
				layout: 'Default',
				title: 'ใบเสร็จ',
				parent: 'ลงทะเบียนหลักสูตร',
				type: 'page',
				auth: false,
			},
			component: () => import('../views/standard/home/Index.vue'),
		}]
	},
	{
		path: '/about',
		name: 'About',
		component: () => import('../views/standard/home/Index.vue'),
		meta: 
		{
			layout: 'Default',
			title: 'เกี่ยวกับเรา',
			type: 'page',
			auth: false,
		},
	},
	{
		path: '/faq',
		name: 'FAQ',
		component: () => import('../views/standard/home/Index.vue'),
		meta: 
		{
			layout: 'Default',
			title: 'คำถามที่พบบ่อย',
			type: 'page',
			auth: false,
		},
	},
	{
		path: '/plan',
		name: 'Plan',
		component: () => import('../views/standard/home/Index.vue'),
		meta: 
		{
			layout: 'Default',
			title: 'แผนฝึกอบรม',
			type: 'page',
			auth: false,
		},
	},
	{
		path: '/projects',
		name: 'Projects',
		component: () => import('../views/standard/home/Index.vue'),
		meta: 
		{
			layout: 'Default',
			title: 'โครงการ',
			type: 'page',
			auth: true,
		},
	},
	{
		path: '/projects/single-project',
		name: 'Single Project',
		component: () => import('../views/standard/home/Index.vue'),
		meta: 
		{
			layout: 'Default',
			title: 'รายละเอียด',
			parent: 'โครงการ',
			type: 'post',
			auth: true,
		},
	},
	{
		path: '/contact',
		name: 'Contact',
		component: () => import('../views/cms/Contact.vue'),
		meta: 
		{
			layout: 'Default',
			title: 'ติดต่อเรา',
			type: 'page',
			auth: false,
		},
	},
	{
		path: '/page/:slug/:id',
		name: 'Page',
		component: () => import('../views/cms/page/Page.vue'),
		meta: 
		{
			layout: 'Default',
			type: 'page',
			auth: false,
		},
	},
	{
		path: '/form',
		name: 'Form',
		component: () => import('../views/form/LoginForm.vue'),
		meta: 
		{
			layout: 'Default',
			type: 'form',
			auth: false,
		},
	},
	{
		path: '/queue',
		name: 'Queue',
		component: () => import('../views/queue/Process.vue'),
		meta: 
		{
			layout: 'Blank',
			type: 'blank',
			auth: false,
		},
	},
	memberRoutes,
	courseRoutes
];


const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
	scrollBehavior() {
		document.getElementById('app').scrollIntoView();
	},
});

export default router;

/**
 * Below code will display the component/active page title
 * Powered by: Leng Chhinghor
 */

// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
	// This goes through the matched routes from last to first, finding the closest route with a title.
	// e.g., if we have `/some/deep/nested/route` and `/some`, `/deep`, and `/nested` have titles,
	// `/nested`'s will be chosen.
	const nearestWithTitle = to.matched
		.slice()
		.reverse()
		.find((r) => r.meta && r.meta.title);

	// Find the nearest route element with meta tags.
	const nearestWithMeta = to.matched
		.slice()
		.reverse()
		.find((r) => r.meta && r.meta.metaTags);

	const previousNearestWithMeta = from.matched
		.slice()
		.reverse()
		.find((r) => r.meta && r.meta.metaTags);

	// If a route with a title was found, set the document (page) title to that value.
	if (nearestWithTitle) {
		//document.title = nearestWithTitle.meta.title;
	} else if (previousNearestWithMeta) {
		//document.title = previousNearestWithMeta.meta.title;
	}

	// Remove any stale meta tags from the document using the key attribute we set below.
	Array.from(
		document.querySelectorAll('[data-vue-router-controlled]')
	).map((el) => el.parentNode.removeChild(el));

	// Skip rendering meta tags if there are none.
	if (!nearestWithMeta) return next();

	// Turn the meta tag definitions into actual elements in the head.
	nearestWithMeta.meta.metaTags
		.map((tagDef) => {
			const tag = document.createElement('meta');

			Object.keys(tagDef).forEach((key) => {
				tag.setAttribute(key, tagDef[key]);
			});

			// We use this to track which meta tags we create so we don't interfere with other ones.
			tag.setAttribute('data-vue-router-controlled', '');

			return tag;
		})
		// Add the meta tags to the document head.
		.forEach((tag) => document.head.appendChild(tag));
	this.pageId = to.params.id
	next();
});
