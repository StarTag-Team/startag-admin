import React from 'react'

import Media from '@containers/media'
import Dashboard from '@components/dashboard'
import ResourcesLayout from '@containers/resources-layout'

export default basePath => [
    {
        path: '/',
        exact: true,
        component: Dashboard
    }, {
        path: '/photos',
        exact: true,
        component: Media
    }, {
        path: '/statuses',
        exact: true,
        component: () => <ResourcesLayout
            path={basePath}
            columns={[{
                name: 'ЗАГОЛОВОК',
                key: 'title'
            }]}
            title='Список статусов'
        />
    }, {
        path: '/tab-sets',
        exact: true,
        component: () => <ResourcesLayout
            path={basePath}
            columns={[{
                name: 'НАЗВАНИЕ',
                key: 'title'
            }]}
            title='Список наборов табов'
        />
    }, {
        path: '/tabs',
        exact: true,
        component: () => <ResourcesLayout
            path={basePath}
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
        path: '/attribute-sets',
        exact: true,
        component: () => <ResourcesLayout
            path={basePath}
            columns={[{
                name: 'НАЗВАНИЕ',
                key: 'title'
            }]}
            title='Список наборов атрибутов'
        />
    }, {
        path: '/attributes',
        exact: true,
        component: () => <ResourcesLayout
            path={basePath}
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
        path: '/orders',
        exact: true,
        component: () => <ResourcesLayout
            path={basePath}
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
        path: '/clients',
        exact: true,
        component: () => <ResourcesLayout
            path={basePath}
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
        path: '/roles',
        exact: true,
        component: () => <ResourcesLayout
            path={basePath}
            columns={[{
                name: 'НАЗВАНИЕ',
                key: 'name'
            }]}
            title='Список ролей'
        />
    }, {
        path: '/users',
        exact: true,
        component: () => <ResourcesLayout
            path={basePath}
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
        path: '/categories',
        exact: true,
        component: () => <ResourcesLayout
            path={basePath}
            columns={[
                {
                    name: 'ЗАГОЛОВОК',
                    key: 'title'
                }
            ]}
            title='Список категорий'
        />
    }, {
        path: '/products',
        exact: true,
        component: () => <ResourcesLayout
            path={basePath}
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
    }
]