import nProgress from 'nprogress'

export default (router) => {
  router.beforeEach((to, from, next) => {
    nProgress.start()
    next()
  })

  //afterEach will automatically call the done function
  router.afterEach(nProgress.done)
}
