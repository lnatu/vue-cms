import Home from '@/components/home/Index';
import UserCreate from '@/components/user/Create';
import UserList from '@/components/user/List';
import UserStart from '@/components/user/Start';

import SupplierStart from '@/components/supplier/Start'
import SupplierList from '@/components/supplier/List'
import SupplierCreate from '@/components/supplier/Create'

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
  },
  {
    path: '/supplier',
    component: SupplierStart,
    children: [
      {
        path: 'list',
        component: SupplierList,
        name: 'supplierList'
      },
      {
        path: 'create',
        component: SupplierCreate,
        name: 'supplierCreate'
      }
    ]
  }
];
