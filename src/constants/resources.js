import React from 'react'

import DashboardIcon from 'material-ui/svg-icons/action/home'
import CategoriesIcon from 'material-ui/svg-icons/action/bookmark'
import ProductsIcon from 'material-ui/svg-icons/action/list'
import UsersIcon from 'material-ui/svg-icons/social/people'
import RolesIcon from 'material-ui/svg-icons/image/control-point'
import ClientsIcon from 'material-ui/svg-icons/action/verified-user'
import OrdersIcon from 'material-ui/svg-icons/editor/attach-money'
import AttributesIcon from 'material-ui/svg-icons/action/view-list'
import SetOfAttributesIcon from 'material-ui/svg-icons/action/stars'
import TabsIcon from 'material-ui/svg-icons/action/tab'
import SetOfTabsIcon from 'material-ui/svg-icons/action/view-agenda'
import StatusesIcon from 'material-ui/svg-icons/communication/stay-current-portrait'
import PhotosIcon from 'material-ui/svg-icons/image/collections'

const resources = [
    {
        name: 'Главная страница',
        link: 'dashboard',
        icon: <DashboardIcon/>
    },
    {
        name: 'Категории',
        link: 'categories',
        icon: <CategoriesIcon/>
    },
    {
        name: 'Продукты',
        link: 'products',
        icon: <ProductsIcon/>
    },
    {
        name: 'Заказы',
        link: 'orders',
        icon: <OrdersIcon/>
    },
    {
        name: 'Пользователи',
        link: 'users',
        icon: <UsersIcon/>
    },
    {
        name: 'Клиенты',
        link: 'clients',
        icon: <ClientsIcon/>
    },
    {
        name: 'Атрибуты',
        link: 'attributes',
        icon: <AttributesIcon/>
    },
    {
        name: 'Набор атрибутов',
        link: 'attribute-sets',
        icon: <SetOfAttributesIcon/>
    },
    {
        name: 'Табы',
        link: 'tabs',
        icon: <TabsIcon/>
    },
    {
        name: 'Набор табов',
        link: 'tab-sets',
        icon: <SetOfTabsIcon/>
    },
    {
        name: 'Статусы',
        link: 'statuses',
        icon: <StatusesIcon/>
    },
    {
        name: 'Роли',
        link: 'roles',
        icon: <RolesIcon/>
    },
    {
        name: 'Медиа',
        link: 'photos',
        icon: <PhotosIcon/>
    },
]

export default resources