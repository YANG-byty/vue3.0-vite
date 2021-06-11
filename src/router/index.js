import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home/Home.vue'

const routes = [
  {
    path: '/',
    redirect: '/home/welcome',
  },
  {
    path: '/home',
    component: Home,
    meta: { title: 'welcome' },
    children: [
      {
        path: 'welcome',
        component: () => import('../components/welcome.vue'),
        meta: { title: 'welcome', index: 'welcome' }
      },
      {
        path: 'menu',
        component: () => import('../views/System/Menu.vue'),
        meta: { title: '系统菜单', index: 'menu' }
      },
      {
        path: 'department',
        component: () => import('../views/System/Department.vue'),
        meta: { title: '部门管理', index: 'department' }
      },
      {
        path: 'params',
        component: () => import('../views/System/Params.vue'),
        meta: { title: '码表管理', index: 'params' }
      },
      {
        path: 'deviceInfo',
        component: () => import('../views/EssentialData/DeviceInfo.vue'),
        meta: { title: '设备信息', index: 'deviceInfo' }
      },
      {
        path: 'greenblankroad',
        component: () => import('../views/EssentialData/Greenblankroad.vue'),
        meta: { title: '绿化空白路段', index: 'greenblankroad' }
      },
      {
        path: 'worktype',
        component: () => import('../views/EssentialData/Worktype.vue'),
        meta: { title: '施工类型', index: 'worktype' }
      },
      {
        path: 'bridge',
        component: () => import('../views/EssentialData/Structure/Bridge.vue'),
        meta: { title: '桥梁', index: 'bridge' }
      },
      {
        path: 'side',
        component: () => import('../views/EssentialData/Structure/Side.vue'),
        meta: { title: '边坡路堤挡墙', index: 'side' }
      },
      {
        path: 'hub',
        component: () => import('../views/EssentialData/Structure/Hub.vue'),
        meta: { title: '互通枢纽', index: 'hub' }
      },
      {
        path: 'repairworkmain',
        component: () => import('../views/DailyMaintenance/Repairworkmain.vue'),
        meta: { title: '小修', index: 'repairworkmain' }
      },
      {
        path: 'specialConserve',
        component: () => import('../views/SpecialConserve/SpecialConserve.vue'),
        meta: { title: '专项养护', index: 'specialConserve' }
      },
      {
        path: 'costBudget',
        component: () => import('../views/CostBudget/CostBudget.vue'),
        meta: { title: '专项养护', index: 'costBudget' }
      },
      {
        path: 'emergencyResponse',
        component: () => import('../views/EmergencyResponse/EmergencyResponse.vue'),
        meta: { title: '专项养护', index: 'emergencyResponse' }
      },
      {
        path: 'statisticsExamine',
        component: () => import('../views/StatisticsExamine/StatisticsExamine.vue'),
        meta: { title: '专项养护', index: 'statisticsExamine' }
      },
      {
        path: 'dayworkmain',
        component: () => import('../views/Construction/Dayworkmain.vue'),
        meta: { title: '台班登记', index: 'dayworkmain' }
      },
      {
        path: 'propact',
        component: () => import('../views/Construction/Propact.vue'),
        meta: { title: '工程合同', index: 'propact' }
      },
      {
        path: 'orderSheet',
        component: () => import('../views/Construction/OrderSheet.vue'),
        meta: { title: '任务指令单', index: 'orderSheet' }
      },
      {
        path: 'requestsheet',
        component: () => import('../views/Construction/Requestsheet.vue'),
        meta: { title: '施工申请单', index: 'requestsheet' }
      },
      {
        path: 'carroadmain',
        component: () => import('../views/Patrol/Carroadmain.vue'),
        meta: { title: '施工申请单', index: 'carroadmain' }
      },
      {
        path: 'circleabsence',
        component: () => import('../views/WorkExamine/Circleabsence.vue'),
        meta: { title: '施工申请单', index: 'circleabsence' }
      },
      {
        path: 'template',
        component: () => import('../views/DreamSend/Template.vue'),
        meta: { title: '施工申请单', index: 'template' }
      },
    ]
  },
  {
    path: '/401',
    name: '401',
    component: () => import('../views/ErrorPage/401.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/ErrorPage/404.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
