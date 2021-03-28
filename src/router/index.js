import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Details from '../views/Details.vue'
import Create from '../views/Create.vue'
import Tag from '../views/Tag.vue'
import RealTime from '../views/RealTime.vue'
import Auth from '../views/Auth.vue'
import Chatroom from '../views/Chatroom.vue'
import Playlists from '../views/playlists/Playlists.vue'
import UserPlaylists from '../views/playlists/UserPlaylists.vue'
import CreatePlaylist from '../views/playlists/CreatePlaylist.vue'
import PlaylistDetails from '../views/playlists/PlaylistDetails.vue'
import NotFound from '../views/NotFound.vue'
import { projectAuth } from '../firebase/config'

// auth guard
const requireAuth = (to, from, next) => {
    let user = projectAuth.currentUser
    if (!user) {
        next({ name: 'Auth' })
    } else {
        next()
    }
}

const requireNoAuth = (to, from, next) => {
    let user = projectAuth.currentUser
    if (user) {
        next({ name: 'Chatroom' })
    } else {
        next()
    }
}

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
    },
    {
        path: '/posts/:id',
        name: 'Details',
        component: Details,
        props: true
    },
    {
        path: '/create',
        name: 'Create',
        component: Create,
        props: true,
        beforeEnter: requireAuth
    },
    {
        path: '/tags/:tag',
        name: 'Tag',
        component: Tag
    },
    {
        path: '/realtime',
        name: 'RealTime',
        component: RealTime
    },
    {
        path: '/auth',
        name: 'Auth',
        component: Auth,
        beforeEnter: requireNoAuth
    },
    {
        path: '/chatroom',
        name: 'Chatroom',
        component: Chatroom,
        beforeEnter: requireAuth
    },
    {
        path: '/playlists',
        name: 'Playlists',
        component: Playlists
    },
    {
        path: '/playlists/user',
        name: 'UserPlaylists',
        component: UserPlaylists,
        beforeEnter: requireAuth
    },
    {
        path: '/playlists/create',
        name: 'CreatePlaylist',
        component: CreatePlaylist,
        beforeEnter: requireAuth,
        props: true
    },
    {
        path: '/playlists/:id',
        name: 'PlaylistDetails',
        component: PlaylistDetails,
        beforeEnter: requireAuth,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router