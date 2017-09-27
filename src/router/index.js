import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout'
import sideNavBasic from '@/components/side_nav/sideNavBasic'
import sideNavConsole from '@/components/side_nav/sideNavConsole'
import sideNavOrder from '@/components/side_nav/sideNavOrder'
import sideNavUser from '@/components/side_nav/sideNavUser'
import positionMonitor from '@/components/content/positionMonitor'
import guyuData from '@/components/content/guyuData'
import carList from '@/components/content/carList'
import driverList from '@/components/content/driverList'
import newOrder from '@/components/content/newOrder'
import orderManager from '@/components/content/orderManager'
import register from '@/components/content/register'
import stockManager from '@/components/content/stockManager'
import userCenter from '@/components/content/userCenter'
import propertyManage from '@/components/content/propertyManage'
import periodPaymentList from '@/components/function_part/periodPaymentList'
import periodPaymentGeneralList from '@/components/function_part/periodPaymentGeneralList'
import driverDetail from '@/components/function_part/driverDetail'

Vue.use(Router)

export default new Router({
  model: 'history',
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'console',
          component: sideNavConsole,
          redirect: '/console/position',
          children: [
            {
              path: 'position',
              component: positionMonitor
            },
            {
              path: 'guyu_data',
              component: guyuData
            }
          ]
        },
        {
          path: 'basic',
          component: sideNavBasic,
          redirect: '/basic/driver_list',
          children: [
            {
              path: 'driver_list',
              component: driverList
            },
            {
              path: 'car_list',
              component: carList
            },
            {
              path: 'property_manage',
              component: propertyManage,
              redirect: '/basic/property_manage/period_payment_general_list',
              children: [
                {
                  path: 'period_payment_general_list',
                  component: periodPaymentGeneralList
                },
                {
                  path: 'period_payment_list/:co_model_type/:date',
                  name: 'period-payment-list',
                  component: periodPaymentList
                },
                {
                  path: 'driver_detail/:id',
                  name: 'driver-detail',
                  component: driverDetail
                }
              ]
            }
          ]
        },
        {
          path: 'order',
          component: sideNavOrder,
          redirect: '/order/new_order',
          children: [
            {
              path: 'new_order',
              component: newOrder
            },
            {
              path: 'order_manager',
              component: orderManager
            },
            {
              path: 'stock_manager',
              component: stockManager
            }
          ]
        },
        {
          path: 'user',
          component: sideNavUser,
          redirect: '/user/user_center',
          children: [
            {
              path: 'user_center',
              component: userCenter
            },
            {
              path: 'register',
              component: register
            }
          ]
        }
      ]
    }
  ]
})
