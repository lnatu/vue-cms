import Home from '@/components/home/Index';
import HomePage from '@/components/pages/Home';
import Login from '@/components/pages/Login';
import PageNotFound from '@/components/pages/PageNotFound';
// Import user
import UserCreate from '@/components/user/Create';
import UserEdit from '@/components/user/Edit';
import UserList from '@/components/user/List';
import UserDetail from '@/components/user/UserDetail';
import UserStart from '@/components/user/Start';
// Import supplier
import SupplierStart from '@/components/supplier/Start';
import SupplierList from '@/components/supplier/List';
import SupplierCreate from '@/components/supplier/Create';
import SupplierDetail from '@/components/supplier/SupplierDetail';
import SupplierEdit from '@/components/supplier/Edit';
// Import product
import ProductStart from '@/components/product/Start';
import ProductList from '@/components/product/List';
import ProductCreate from '@/components/product/Create';
import ProductDetail from '@/components/product/ProductDetail';
import ProductEdit from '@/components/product/Edit';
// Import category
import CategoryStart from '@/components/category/Start';
import CategoryList from '@/components/category/List';
import CategoryCreate from '@/components/category/Create';
// Import order
import OrderStart from '@/components/order/OrderStart';
import OrderList from '@/components/order/OrderList';
import OrderCreate from '@/components/order/OrderCreate';
import OrderDetail from '@/components/order/OrderDetail';
// Import purchase
import PurchaseStart from '@/components/purchase/PurchaseStart';
import PurchaseList from '@/components/purchase/PurchaseList';
import PurchaseCreate from '@/components/purchase/PurchaseCreate';
// Import group
import GroupStart from '@/components/group/GroupStart';
import GroupList from '@/components/group/GroupList';
import GroupCreate from '@/components/group/GroupCreate';
import GroupEdit from '@/components/group/GroupEdit';

export const routes = [
  {
    path: '/',
    component: Home,
    name: 'home'
  },
  {
    path: '/users',
    component: UserStart,
    meta: { onlyAuthUser: true },
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
      },
      {
        path: ':id',
        component: UserDetail,
        name: 'userDetail'
      },
      {
        path: 'edit/:id',
        component: UserEdit,
        name: 'userEdit'
      }
    ]
  },
  {
    path: '/supplier',
    component: SupplierStart,
    meta: { onlyAuthUser: true },
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
      },
      {
        path: 'edit/:id',
        component: SupplierEdit,
        name: 'supplierEdit'
      },
      {
        path: ':id',
        component: SupplierDetail,
        name: 'supplierDetail'
      }
    ]
  },
  {
    path: '/products',
    component: ProductStart,
    meta: { onlyAuthUser: true },
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
      },
      {
        path: 'edit/:id',
        component: ProductEdit,
        name: 'productEdit'
      },
      {
        path: ':id',
        component: ProductDetail,
        name: 'productDetail'
      }
    ]
  },
  {
    path: '/categories',
    component: CategoryStart,
    meta: { onlyAuthUser: true },
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
  },
  {
    path: '/orders',
    component: OrderStart,
    meta: { onlyAuthUser: true },
    children: [
      {
        path: 'list',
        component: OrderList,
        name: 'orderList'
      },
      {
        path: 'create',
        component: OrderCreate,
        name: 'orderCreate'
      },
      {
        path: ':id',
        component: OrderDetail,
        name: 'orderDetail'
      }
    ]
  },
  {
    path: '/purchases',
    component: PurchaseStart,
    meta: { onlyAuthUser: true },
    children: [
      {
        path: 'list',
        component: PurchaseList,
        name: 'purchaseList'
      },
      {
        path: 'create',
        component: PurchaseCreate,
        name: 'purchaseCreate'
      }
    ]
  },
  {
    path: '/groups',
    component: GroupStart,
    meta: { onlyAuthUser: true },
    children: [
      {
        path: 'list',
        component: GroupList,
        name: 'groupList'
      },
      {
        path: 'create',
        component: GroupCreate,
        name: 'groupCreate'
      },
      {
        path: 'edit/:id',
        component: GroupEdit,
        name: 'groupEdit'
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: PageNotFound
  }
];
