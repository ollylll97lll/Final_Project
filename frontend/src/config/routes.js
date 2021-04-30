import {CartScreen, Home, ProductScreen} from '../screens/index';
import LoginScreen from '../screens/LoginScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import OrderListScreen from '../screens/OrderListScreen';
import OrderScreen from '../screens/OrderScreen';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';
import PlaceOrderScreen from '../screens/PlaceOrderScreen';
import ProductEditScreen from '../screens/ProductEditScreen.';
import ProductListScreen from '../screens/ProductListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ShippingAddressScreen from '../screens/ShippingAddressScreen';

const configroutes = [
    {
        path : '/' ,
        exact: 'true',
        component: Home,
        fallback: <body>...Loading</body>,
        routes: [
            {
                path:'/#',
                exact: 'false',                
                component: Home,
                fallback: <body>...Loading</body>
            },
            {
                path:'/homepage',
                exact: 'false',
                component: Home,
                fallback: <body>...Loading</body>
            }
        ]
    },
    {
        path: '/products/:id',
        exact: 'false',
        component: ProductScreen,
        fallback: <body>...Loading</body>
    },
    {
        path: '/cart/:id?',
        exact: 'false',
        component: CartScreen,
        fallback: <body>...Loading</body>
    },
    {
        path: '/login',
        exact: 'false',
        component: LoginScreen,
        fallback: <body>...Loading</body>
    },
    {
        path: '/register',
        exact: 'false',
        component: RegisterScreen,
        fallback: <body>...Loading</body>
    },
    {
        path: '/shipping',
        exact: 'false',
        component: ShippingAddressScreen,
        fallback: <body>...Loading</body>
    }
    ,
    {
        path: '/payment',
        exact: 'false',
        component: PaymentMethodScreen,
        fallback: <body>...Loading</body>
    },
    {
        path: '/placeorder',
        exact: 'false',
        component: PlaceOrderScreen,
        fallback: <body>...Loading</body>
    },
    {
        path: '/order/:id',
        exact: 'false',
        component: OrderScreen,
        fallback: <body>...Loading</body>
    },
    {
        path: '/orderhistory',
        exact: 'false',
        component: OrderHistoryScreen,
        fallback: <body>...Loading</body>
    },
];

const privateroutes = [
    {
        path: '/profile',
        exact: 'true',
        component: ProfileScreen,
        fallback: <body>...Loading</body>
    }
]
const adminroutes = [
    {
        path: '/productlist',
        exact: 'true',
        component: ProductListScreen,
        fallback: <body>...Loading</body>
    },
    {
        path: '/product/:id/edit',
        exact: 'true',
        component: ProductEditScreen,
        fallback: <body>...Loading</body>
    },
    {
        path: '/orderlist',
        exact: 'true',
        component: OrderListScreen,
        fallback: <body>...Loading</body>
    }
]
export  {configroutes, privateroutes, adminroutes};