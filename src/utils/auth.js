export const authMiddleware = (to, from, next) => {
    const token = localStorage.getItem('jwt')
    if (to.matched.some(route => route.meta.requiresAuth) && (!token || token === null)) {
      next('/member/login')
    } else {
      next()
    }
  }