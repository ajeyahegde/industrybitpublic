import React, { Fragment } from 'react'
import { Switch, Route } from 'react-router-dom'

import LogIn from 'src/views/Auth/LogIn'
import PasswordReset from 'src/views/Auth/PasswordReset'
import Profile from 'src/views/Profile'
import Dashboard from 'src/views/Dashboard'

import Header from 'src/components/Header'

import AuthGuard from 'src/components/AuthGuard'
import GuestGuard from 'src/components/GuestGuard'

export const renderRoutes = (routes = []) => (
    <Switch>
        {routes.map((route, i) => {
            const Guard = route.guard || Fragment
            const Layout = route.layout || Fragment
            const Component = route.component

            return (
                <Route
                    key={i}
                    path={route.path}
                    exact={route.exact}
                    render={(props) => (
                        <Guard>
                            <Layout>
                                {route.routes ? (
                                    renderRoutes(route.routes)
                                ) : (
                                    <Component {...props} />
                                )}
                            </Layout>
                        </Guard>
                    )}
                />
            )
        })}
    </Switch>
)

const routes = [
    {
        exact: true,
        guard: GuestGuard,
        path: '/login',
        component: LogIn,
    },
    {
        exact: true,
        guard: GuestGuard,
        path: '/reset',
        component: PasswordReset,
    },
    {
        path: '/',
        guard: AuthGuard,
        layout: Header,
        routes: [
            {
                exact: true,
                path: '/',
                component: Dashboard,
            },
            {
                exact: true,
                path: '/settings',
                component: Profile,
            },
        ],
    },
]

export default routes
