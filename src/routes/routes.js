import Home from '@/components/home/Index';
// Import user
import UserCreate from '@/components/user/Create';
import UserList from '@/components/user/List';
import UserDetail from '@/components/user/UserDetail';
import UserStart from '@/components/user/Start';
// Import supplier
import SupplierStart from '@/components/supplier/Start';
import SupplierList from '@/components/supplier/List';
import SupplierCreate from '@/components/supplier/Create';
import SupplierDetail from '@/components/supplier/SupplierDetail';
// Import product
import ProductStart from '@/components/product/Start';
import ProductList from '@/components/product/List';
import ProductCreate from '@/components/product/Create';
import ProductDetail from '@/components/product/ProductDetail';
// Import category
import CategoryStart from '@/components/category/Start';
import CategoryList from '@/components/category/List';
import CategoryCreate from '@/components/category/Create';
// Import order
import OrderStart from '@/components/order/OrderStart';
import OrderList from '@/components/order/OrderList';
import OrderCreate from '@/components/order/OrderCreate';
// Import purchase
import PurchaseStart from '@/components/purchase/PurchaseStart';
import PurchaseList from '@/components/purchase/PurchaseList';
import PurchaseCreate from '@/components/purchase/PurchaseCreate';
// Import group
import GroupStart from '@/components/group/GroupStart';
import GroupList from '@/components/group/GroupList';
import GroupCreate from '@/components/group/GroupCreate';

export const routes = [
  {
    path: '/',
    component: Home,
    name: 'home'
  },
  {
    path: '/users',
    component: UserStart,
    children: [
      {
        path: 'list',
        component: UserList,
        name: 'userList'
      },
      {
        path: ':id',
        component: UserDetail,
        name: 'userDetail'
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
        path: ':id',
        component: SupplierDetail,
        name: 'supplierDetail'
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
      }
    ]
  },
  {
    path: '/purchases',
    component: PurchaseStart,
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
      }
    ]
  }
];
