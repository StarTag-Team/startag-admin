import React from 'react'

import Dashboard from '@admin/components/dashboard'
import ResourcesLayout from '@admin/containers/resources-layout'
import RemoveLayout from '@admin/containers/remove-layout'
import Profile from '@admin/containers/profile'

import components from './components'

import listRoutes from './list'

export default (location, root) => {
    let resources = ['categories', 'products', 'orders', 'users', 'clients', 'attributes', 'attribute-sets', 'tabs', 'tab-sets', 'statuses', 'roles', 'photos']
    let routes = [{
        path: root,
        exact: true,
        component: Dashboard
    }, {
        path: root + 'profile',
        exact: true,
        component: () => <Profile
            location={location}
            resources='photos'
        />
    }]
    listRoutes.forEach(route => {
        routes.push({
            path: root + route.resource,
            exact: true,
            component: () => <ResourcesLayout
                path={location}
                title={route.title}
                columns={route.columns}
                filters={route.filters}
            />
        })
    })
    resources.forEach(resource => {
        routes.push({
            path: root + resource + '/create',
            exact: true,
            component: () => React.createElement(components[resource.charAt(0).toUpperCase() + resource.slice(1) + 'Create'])
        })
        routes.push({
            path: root + resource + '/:id',
            exact: true,
            component: () => React.createElement(components[resource.charAt(0).toUpperCase() + resource.slice(1) + 'Edit'], {location: location})
        })
        routes.push({
            path: root + resource + '/:id/delete',
            exact: true,
            component: () => <RemoveLayout
                location={location}
                resources={resource}
            />
        })
    })
    return routes
}


/*
import React from 'react'

import Dashboard from '@admin/components/dashboard'
import ResourcesLayout from '@admin/containers/resources-layout'
import RemoveLayout from '@admin/containers/remove-layout'
import Profile from '@admin/containers/profile'

import CategoriesEdit from '@admin/components/editPages/categories'
import ProductsEdit from '@admin/components/editPages/products'
import UsersEdit from '@admin/components/editPages/users'
import RolesEdit from '@admin/components/editPages/roles'
import ClientsEdit from '@admin/components/editPages/clients'
import OrdersEdit from '@admin/components/editPages/orders'
import AttributesEdit from '@admin/components/editPages/attributes'
import AttributeSetsEdit from '@admin/components/editPages/attribute-sets'
import TabsEdit from '@admin/components/editPages/tabs'
import TabSetsEdit from "../../components/editPages/tab-sets"
import StatusEdit from "../../components/editPages/statuses"

import listRoutes from './list'
import CategoriesCreate from "../../components/createPages/categories"
import ProductsCreate from "../../components/createPages/products"
import OrdersCreate from "../../components/createPages/orders"
import UsersCreate from "../../components/createPages/users"
import ClientsCreate from "../../components/createPages/clients"
import AttributesCreate from "../../components/createPages/attributes"
import AttributeSetsCreate from "../../components/createPages/attribute-sets"
import TabsCreate from "../../components/createPages/tabs"
import TabSetsCreate from "../../components/createPages/statuses"
import RolesCreate from "../../components/createPages/roles"

export default (location, root) => {
    let resources = ['categories', 'products', 'orders', 'users', 'clients', 'attributes', 'attribute-sets', 'tabs', 'tab-sets', 'statuses', 'roles']
    let routes = [
        {
            path: root,
            exact: true,
            component: Dashboard
        }, {
            path: root + 'roles/create',
            exact: true,
            component: () => <RolesCreate/>
        }, {
            path: root + 'categories/:id',
            exact: true,
            component: () => <CategoriesEdit
                location={location}
            />
        }, {
            path: root + 'products/:id',
            exact: true,
            component: () => <ProductsEdit
                location={location}
            />
        }, {
            path: root + 'users/:id',
            exact: true,
            component: () => <UsersEdit
                location={location}
            />
        }, {
            path: root + 'roles/:id',
            exact: true,
            component: () => <RolesEdit
                location={location}
            />
        }, {
            path: root + 'clients/:id',
            exact: true,
            component: () => <ClientsEdit
                location={location}
            />
        }, {
            path: root + 'orders/:id',
            exact: true,
            component: () => <OrdersEdit
                location={location}
            />
        }, {
            path: root + 'attributes/:id',
            exact: true,
            component: () => <AttributesEdit
                location={location}
            />
        }, {
            path: root + 'attribute-sets/:id',
            exact: true,
            component: () => <AttributeSetsEdit
                location={location}
            />
        }, {
            path: root + 'tabs/:id',
            exact: true,
            component: () => <TabsEdit
                location={location}
            />
        }, {
            path: root + 'tab-sets/:id',
            exact: true,
            component: () => <TabSetsEdit
                location={location}
            />
        }, {
            path: root + 'statuses/:id',
            exact: true,
            component: () => <StatusEdit
                location={location}
            />
        }, {
            path: root + 'categories/:id/delete',
            exact: true,
            component: () => <RemoveLayout
                location={location}
                resources='categories'
            />
        }, {
            path: root + 'products/:id/delete',
            exact: true,
            component: () => <RemoveLayout
                location={location}
                resources='products'
            />
        }, {
            path: root + 'users/:id/delete',
            exact: true,
            component: () => <RemoveLayout
                location={location}
                resources='users'
            />
        }, {
            path: root + 'clients/:id/delete',
            exact: true,
            component: () => <RemoveLayout
                location={location}
                resources='clients'
            />
        }, {
            path: root + 'roles/:id/delete',
            exact: true,
            component: () => <RemoveLayout
                location={location}
                resources='roles'
            />
        }, {
            path: root + 'orders/:id/delete',
            exact: true,
            component: () => <RemoveLayout
                location={location}
                resources='orders'
            />
        }, {
            path: root + 'attributes/:id/delete',
            exact: true,
            component: () => <RemoveLayout
                location={location}
                resources='attributes'
            />
        }, {
            path: root + 'attribute-sets/:id/delete',
            exact: true,
            component: () => <RemoveLayout
                location={location}
                resources='attribute-sets'
            />
        }, {
            path: root + 'tabs/:id/delete',
            exact: true,
            component: () => <RemoveLayout
                location={location}
                resources='tabs'
            />
        }, {
            path: root + 'tab-sets/:id/delete',
            exact: true,
            component: () => <RemoveLayout
                location={location}
                resources='tab-sets'
            />
        }, {
            path: root + 'statuses/:id/delete',
            exact: true,
            component: () => <RemoveLayout
                location={location}
                resources='statuses'
            />
        }, {
            path: root + 'photos/:id/delete',
            exact: true,
            component: () => <RemoveLayout
                location={location}
                resources='photos'
            />
        }, {
            path: root + 'profile',
            exact: true,
            component: () => <Profile
                location={location}
                resources='photos'
            />
        }
    ]
    listRoutes.forEach(route => {
        routes.push({
            path: root + route.resource,
            exact: true,
            component: () => <ResourcesLayout
                path={location}
                title={route.title}
                columns={route.columns}
                filters={route.filters}
            />
        })
    })
    resources.forEach(resource => {
        if (resource === 'attribute-sets') {}
        routes.push({
            path: root + resource + '/create',
            exact: true,
            component: () => <{resource.charAt(0).toUpperCase() + resource.slice(1) + 'Create'}/>
        })
    })
    console.log(routes)
    return routes
}*/