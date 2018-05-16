import Media from '@containers/media'
import Dashboard from '@components/dashboard'

export default basePath => [
    {
        path: '/photos',
        exact: true,
        component: Media
    }, {
        path: '/',
        exact: true,
        component: Dashboard
    }
]