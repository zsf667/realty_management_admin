import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

// 全局路由前置守卫，每次路径访问前都会触发
router.beforeEach(async (to, from, next) => {
  // start progress bar  开始进度条
  NProgress.start()

  // set page title  设置页面标题
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in   判断用户是否已登录
  const hasToken = getToken()

  if (hasToken) {
    const res = await store.dispatch('user/checkToken')
    if(res){
      next()
    }else{
      next(`/login`)
      return;
    }
    if (to.path === '/login') {
      // if is logged in, redirect to the home page  如果已登录，依旧访问登录页，则重定向到主页
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info  获取用户信息
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // remove token and go to login page to re-login  删除token令牌并转到登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token */
    // 判断去的路径是不是login
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly  在免费登录白名单中，直接进入
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // 其他没有访问权限的页面被重定向到登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar  完成进度条
  NProgress.done()
})
