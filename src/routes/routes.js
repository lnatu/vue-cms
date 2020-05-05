import Home from '@/components/home/Index';
// Import user
import UserCreate from '@/components/user/Create';
import UserList from '@/components/user/List';
import UserStart from '@/components/user/Start';
// Import supplier
import SupplierStart from '@/components/supplier/Start';
import SupplierList from '@/components/supplier/List';
import SupplierCreate from '@/components/supplier/Create';
// Import product
import ProductStart from '@/components/product/Start';
import ProductList from '@/components/product/List';
import ProductCreate from '@/components/product/Create';
// Import category
import CategoryStart from '@/components/category/Start';
import CategoryList from '@/components/category/List';
import CategoryCreate from '@/components/category/Create';

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
  },
  {
    path: '/products',
    component: ProductStart,
    children: [
      {
        path: 'list',
        component: ProductList,
        name: 'productList'
      },
      {
        path: 'create',
        component: ProductCreate,
        name: 'productCreate'
      }
    ]
  },
  {
    path: '/categories',
    component: CategoryStart,
    children: [
      {
        path: 'list',
        component: CategoryList,
        name: 'categoryList'
      },
      {
        path: 'create',
        component: CategoryCreate,
        name: 'categoryCreate'
      }
    ]
  }
];
