import Home from '@/components/home/Index';
import UserCreate from '@/components/user/Create';
import UserList from '@/components/user/List';
import UserStart from '@/components/user/Start';

export const routes = [
  {
    path: '/',
    component: Home,
    name: 'home'
  },
  {
    path: '/user',
    component: UserStart,
    children: [
      {
        path: 'list',
        component: UserList,
        name: 'userList'
      },
      {
        path: 'create',
        component: UserCreate,
        name: 'userCreate'
      }
    ]
  }
];
