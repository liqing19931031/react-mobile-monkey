import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom'
import Home from '../components/index/index' // 首页
import Shop from '../components/shop/shop'
import user from '../components/user/user'
import Favorites from '../components/index/favorites'
import Receipt from '../components/index/receipt'

const routes = [ // 构建全局路由
  {
    path: '/index', // 父路由
    component: Home,
    routes: [ // 子路由
      {
        path: '/index/favorites',
        component: Favorites
      },
      {
        path: '/index/receipt',
        component: Receipt
      }
    ]
  },
  {
    path: '/Shop',
    component: Shop
  },
  {
    path: '/user',
    component: user
  }
]

const RouteWithSubRoutes = (route) => (
  <Route path={route.path} render={props => (
    // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes}/>
  )}/>
)

const BasicExample = () => (
  <Router>
    <div className='main-content'>
      <div className='clearfix'>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route}/>
        ))}
      </div>
      <footer>
        <NavLink to="/index" className='nav'>
          <i className='glyphicon-home glyphicon'></i>
          推荐
        </NavLink>
        <NavLink to="/shop" className='nav'>
          <i className='glyphicon-fenlei glyphicon'></i>
          分类
        </NavLink>
        <NavLink to="/user" className='nav'>
          <i className='glyphicon-find glyphicon'></i>
          发现
        </NavLink>
      </footer>
    </div>
  </Router>
)

export default BasicExample
