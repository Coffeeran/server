import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/layout'
import sideNavBasic from '@/components/side_nav/sideNavBasic'
import sideNavConsole from '@/components/side_nav/sideNavConsole'
import sideNavOrder from '@/components/side_nav/sideNavOrder'
import sideNavUser from '@/components/side_nav/sideNavUser'
import dataReport from '@/components/content/dataReport'
import bankData from '@/components/content/bankData'
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
import addOrUpdateDriver from '@/components/content/addOrUpdateDriver'
import addOrUpdateCar from '@/components/content/addOrUpdateCar'
import login from '@/components/login'
import paymentList from '@/components/content/paymentList'

Vue.use(Router)

export default new Router({
  model: 'history',
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: '/basic',
      children: [
        {
          path: 'console',
          component: sideNavConsole,
          meta: {
            requireAuth: true
          },
          redirect: '/console/data_report',
          children: [
            {
              path: 'data_report',
              component: dataReport,
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'bank_data',
              component: bankData,
              meta: {
                requireAuth: true
              }
            }
          ]
        },
        {
          path: 'basic',
          component: sideNavBasic,
          meta: {
            requireAuth: true
          },
          redirect: '/basic/driver_list',
          children: [
            {
              path: 'driver_list',
              name: 'driver-list',
              component: driverList,
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'car_list',
              component: carList,
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'property_manage',
              component: propertyManage,
              meta: {
                requireAuth: true
              },
              redirect: '/basic/property_manage/period_payment_general_list',
              children: [
                {
                  path: 'period_payment_general_list',
                  component: periodPaymentGeneralList,
                  meta: {
                    requireAuth: true
                  }
                },
                {
                  path: 'period_payment_list/:co_model_type/:date/branch/:branch',
                  name: 'period-payment-list',
                  component: periodPaymentList,
                  meta: {
                    requireAuth: true
                  }
                },
                {
                  path: 'driver_detail/:id',
                  name: 'driver-detail',
                  component: driverDetail,
                  meta: {
                    requireAuth: true
                  }
                }
              ]
            },
            {
              path: 'add_or_update_driver/:id',
              name: 'add-or-update-driver',
              component: addOrUpdateDriver,
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'add_or_update_car/:id',
              name: 'add-or-update-car',
              component: addOrUpdateCar,
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'payment_list',
              name: 'payment-list',
              component: paymentList,
              meta: {
                requireAuth: true
              }
            }
          ]
        },
        {
          path: 'order',
          component: sideNavOrder,
          meta: {
            requireAuth: true
          },
          redirect: '/order/new_order',
          children: [
            {
              path: 'new_order',
              component: newOrder,
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'order_manager',
              component: orderManager,
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'stock_manager',
              component: stockManager,
              meta: {
                requireAuth: true
              }
            }
          ]
        },
        {
          path: 'user',
          component: sideNavUser,
          meta: {
            requireAuth: true
          },
          redirect: '/user/user_center',
          children: [
            {
              path: 'user_center',
              component: userCenter,
              meta: {
                requireAuth: true
              }
            },
            {
              path: 'register',
              component: register,
              meta: {
                requireAuth: true
              }
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})

