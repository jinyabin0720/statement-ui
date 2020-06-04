export default [
  {
    path: 'login', //登录页
    component: () => import('@/views/login/login')
  },
  {
    path: 'home',   // 首页
    component: () => import('@/views/homepage/homepage'),
    meta: {
      title: '首页'
    }
  },
  {
    path: 'error',
    component: () => import('@/views/homepage/404')
  },
  //收款页面
  {
    path: 'statement',
    component: ()=> import('@/views/manage/Statement.vue')
  },
  // {
  //   path:'template',
  //   component: ()=> import('@/views/manage/Template.vue')
  // },
  //利润页面
  {
    path:'statementProfit',
    component: ()=> import('@/views/manage/StatementProfit.vue')
  },
  //  报表模板展示页面
  {
    path:'testEcharts',
    component: ()=> import('@/views/manage/TestEcharts.vue')
  },
  //报表展示测试页面
  {
    path:'statementTemplate',
    component: ()=> import('@/views/manage/StatementTemplate.vue')
  }


];

