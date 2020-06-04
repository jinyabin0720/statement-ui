// import Vue from 'vue'
// import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
//
// Vue.use(Router)
//
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })
import Vue from 'vue'
import Router from 'vue-router'
import baseRouter from "./baseRouter.js" //末级路由（完全自定义)
Vue.use(Router)

var link = () => import('@/views/layout/link') // 路由索引
var layout = () => import('@/views/layout/layout') // 主页框架
var frame = () => import('@/views/layout/frame') // 菜单框架

/* 根据末级路由，克隆高级路由，主要用来区分name属性 */
function routerConvert(routers, prefix) {
  var routerList = [];
  if (Array.isArray(routers)) {
    routerList = JSON.parse(JSON.stringify(routers));
    for (let i = 0, len = routers.length; i < len; i++) {
      if (prefix && routerList[i].name) {
        routerList[i].name = prefix + "_" + routerList[i].name;
      }
      for (var k in routers[i]) {
        if (typeof routers[i][k] == "function") {
          routerList[i][k] = routers[i][k]
        }
      }
    }
  }
  return routerList;
}

/* 自动添加多级路由 */
function multiRouters(rList) {
  return [{
    path: '/',
    component: link,
    children: [{
      path: 'layout',
      component: layout,
      children: [{
        path: 'frame',
        component: frame,
        children: routerConvert(rList, "layout_frame")
      }]
    }, //一级路由（自动添加顶部导航和侧边栏）
      {
        path: 'layout',
        component: layout,
        children: routerConvert(rList, "layout")
      }, //二级路由（自动添加顶部导航）
      {
        path: 'frame',
        component: frame,
        children: routerConvert(rList, "frame")
      }, //二级路由（自动添加侧边栏）
      ...rList //末级路由（完全自定义）
    ]
  }]
}

Vue.prototype.pageLink = link; //主页布局插件存储在vue原型链上，方便动态添加子路由
Vue.prototype.pageLayout = layout; //主页布局插件存储在vue原型链上，方便动态添加子路由
Vue.prototype.pageFrame = frame; //主页布局插件存储在vue原型链上，方便动态添加子路由
Vue.prototype.multiRouters = multiRouters; //动态添加多级路由的方法
/* 二级路由（自动添加侧边栏） */
var frameRouter = {
  path: 'frame',
  component: frame,
  children: routerConvert(baseRouter, "frame")
}
/* 二级路由（自动添加顶部导航） */
var layoutRouter = {
  path: 'layout',
  component: layout,
  children: routerConvert(baseRouter, "layout")
};
/* 一级路由（自动添加顶部导航和侧边栏） */
var layoutFrameRouter = {
  path: 'layout',
  component: layout,
  children: [{
    path: 'frame',
    component: frame,
    children: routerConvert(baseRouter, "layout_frame")
  }]
};
/* 路由配置 */
const routerOptions = {
  mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [{
    path: '/',
    component: link,
    redirect: '/layout/home' //测试环境默认首页
  },
    {
      path: '/',
      component: link,
      children: [
        layoutFrameRouter, //一级路由（自动添加顶部导航和侧边栏）
        layoutRouter, //二级路由（自动添加顶部导航）
        frameRouter, //二级路由（自动添加侧边栏）
        ...baseRouter //末级路由（完全自定义）
      ]
    }
  ]
};

//alert(JSON.stringify(routerOptions));
const router = new Router(routerOptions);

export default router;
