import React from 'react'

import Media from '@admin/containers/media'
import Dashboard from '@admin/components/dashboard'
import ResourcesLayout from '@admin/containers/resources-layout'
import Categories from '@admin/components/createPages/categories'
import Products from '@admin/components/createPages/products'
import Orders from '@admin/components/createPages/orders'
import Users from '@admin/components/createPages/users'
import Clients from '@admin/components/createPages/clients'
import Attributes from '@admin/components/createPages/attributes'
import AttributeSets from '@admin/components/createPages/attribute-sets'
import Tabs from '@admin/components/createPages/tabs'
import TabSets from '@admin/components/createPages/tab-sets'
import Statuses from '@admin/components/createPages/statuses'
import Roles from '@admin/components/createPages/roles'

export default (location, route) => [
    {
        path: route,
        exact: true,
        component: Dashboard
    }, {
        path: route + 'photos',
        exact: true,
        component: () => <Media
            path={location}
            title='Лента фотографий'
        />
    }, {
        path: route + 'statuses',
        exact: true,
        component: () => <ResourcesLayout
            path={location}
            columns={[{
                name: 'ЗАГОЛОВОК',
                key: 'title'
            }]}
            title='Список статусов'
        />
    }, {
        path: route + 'tab-sets',
        exact: true,
        component: () => <ResourcesLayout
            path={location}
            columns={[{
                name: 'НАЗВАНИЕ',
                key: 'title'
            }]}
            title='Список наборов табов'
        />
    }, {
        path: route + 'tabs',
        exact: true,
        component: () => <ResourcesLayout
            path={location}
            columns={[
                {
                    name: 'ЗАГОЛОВОК',
                    key: 'title'
                }, {
                    name: 'ТИП',
                    key: ''
                }, {
                    name: 'ОБЯЗАТЕЛЬНЫЙ',
                    key: ''
                }
            ]}
            title='Список табов'
        />
    }, {
        path: route + 'attribute-sets',
        exact: true,
        component: () => <ResourcesLayout
            path={location}
            columns={[{
                name: 'НАЗВАНИЕ',
                key: 'title'
            }]}
            title='Список наборов атрибутов'
        />
    }, {
        path: route + 'attributes',
        exact: true,
        component: () => <ResourcesLayout
            path={location}
            columns={[
                {
                    name: 'НАЗВАНИЕ',
                    key: 'title'
                }, {
                    name: 'ТИП',
                    key: 'attrType'
                }, {
                    name: 'ОБЯЗАТЕЛЬНЫЙ',
                    key: 'isRequired'
                }, {
                    name: 'ПОКАЗЫВАТЬ В ФИЛЬТРЕ',
                    key: 'showInFilter'
                }
            ]}
            title='Список атрибутов'
        />
    }, {
        path: route + 'orders',
        exact: true,
        component: () => <ResourcesLayout
            path={location}
            columns={[
                {
                    name: 'ДАТА',
                    key: 'creationDate'
                }, {
                    name: 'СТАТУС',
                    key: ['status', 'title']
                }, {
                    name: 'СУММА',
                    key: 'total'
                }
            ]}
            title='Список заказов'
        />
    }, {
        path: route + 'clients',
        exact: true,
        component: () => <ResourcesLayout
            path={location}
            columns={[
                {
                    name: 'ИМЯ',
                    key: 'name'
                }, {
                    name: 'ПОЧТА',
                    key: 'email'
                }, {
                    name: 'ТЕЛЕФОН',
                    key: 'phone'
                }
            ]}
            title='Список клиентов'
        />
    }, {
        path: route + 'roles',
        exact: true,
        component: () => <ResourcesLayout
            path={location}
            columns={[{
                name: 'НАЗВАНИЕ',
                key: 'name'
            }]}
            title='Список ролей'
        />
    }, {
        path: route + 'users',
        exact: true,
        component: () => <ResourcesLayout
            path={location}
            columns={[
                {
                    name: 'ПОЛЬЗОВАТЕЛЬ',
                    key: 'name'
                }, {
                    name: 'ПОЧТА',
                    key: 'email'
                }, {
                    name: 'РОЛЬ',
                    key: ['role', 'name']
                }
            ]}
            title='Список пользователей'
        />
    }, {
        path: route + 'categories',
        exact: true,
        component: () => <ResourcesLayout
            path={location}
            columns={[
                {
                    name: 'ЗАГОЛОВОК',
                    key: 'title'
                }
            ]}
            title='Список категорий'
        />
    }, {
        path: route + 'products',
        exact: true,
        component: () => <ResourcesLayout
            path={location}
            columns={[
                {
                    name: 'АРТИКУЛ',
                    key: 'sku'
                }, {
                    name: 'ТОВАР',
                    key: 'title'
                }, {
                    name: 'КАТЕГОРИИ',
                    key: 'id'
                }, {
                    name: 'ЦЕНА',
                    key: 'price'
                }, {
                    name: 'АКТИВНЫЙ',
                    key: 'isActive'
                }
            ]}
            title='Список продуктов'
        />
    }, {
        path: route + 'categories/create',
        exact: true,
        component: () => <Categories/>
    }, {
        path: route + 'products/create',
        exact: true,
        component: () => <Products/>
    }, {
        path: route + 'orders/create',
        exact: true,
        component: () => <Orders/>
    }, {
        path: route + 'users/create',
        exact: true,
        component: () => <Users/>
    }, {
        path: route + 'clients/create',
        exact: true,
        component: () => <Clients/>
    }, {
        path: route + 'attributes/create',
        exact: true,
        component: () => <Attributes/>
    }, {
        path: route + 'attribute-sets/create',
        exact: true,
        component: () => <AttributeSets/>
    }, {
        path: route + 'tabs/create',
        exact: true,
        component: () => <Tabs/>
    }, {
        path: route + 'tab-sets/create',
        exact: true,
        component: () => <TabSets/>
    }, {
        path: route + 'statuses/create',
        exact: true,
        component: () => <Statuses/>
    }, {
        path: route + 'roles/create',
        exact: true,
        component: () => <Roles/>
    }

]