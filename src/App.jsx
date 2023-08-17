import { useEffect, useState } from 'react';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
const initialData = [
    {
        id: 1,
        name: '珍珠奶茶',
        description: '香濃奶茶搭配QQ珍珠',
        price: 50,
    },
    {
        id: 2,
        name: '冬瓜檸檬',
        description: '清新冬瓜配上新鮮檸檬',
        price: 45,
    },
    {
        id: 3,
        name: '翡翠檸檬',
        description: '綠茶與檸檬的完美結合',
        price: 55,
    },
    {
        id: 4,
        name: '四季春茶',
        description: '香醇四季春茶，回甘無比',
        price: 45,
    },
    {
        id: 5,
        name: '阿薩姆奶茶',
        description: '阿薩姆紅茶搭配香醇鮮奶',
        price: 50,
    },
    {
        id: 6,
        name: '檸檬冰茶',
        description: '檸檬與冰茶的清新組合',
        price: 45,
    },
    {
        id: 7,
        name: '芒果綠茶',
        description: '芒果與綠茶的獨特風味',
        price: 55,
    },
    {
        id: 8,
        name: '抹茶拿鐵',
        description: '抹茶與鮮奶的絕配',
        price: 60,
    },
];
function App() {
    const [products, setProducts] = useState(initialData);
    const [carts, setCarts] = useState([]);
    const [total, setTotal] = useState(0);
    const [orders, setOrders] = useState([]);

    const handleSumTotal = (data) => data.map((item) => item.price * item.quantity).reduce((arr, cur) => arr + cur, 0);

    const handleAddCart = (value) => {
        const index = carts.findIndex((item) => item.id === value.id);
        if (index === -1) {
            // 商品不存在時新增商品
            setCarts([...carts, value]);
            setTotal(handleSumTotal([...carts, value]));
        } else {
            // 判斷如果加入進來的商品有 id 相同就只更改商品數量
            const checkList = carts.map((item) =>
                item.id === value.id ? { ...item, quantity: (item.quantity += value.quantity) } : item
            );
            setCarts(checkList);
            setTotal(handleSumTotal(checkList));
        }
    };

    const updateCartQuantity = (value) => {
        const newList = carts.map((item) =>
            item.id === value.id
                ? {
                      ...item,
                      quantity: value.quantity,
                  }
                : item
        );
        setCarts(newList);
        setTotal(handleSumTotal(newList));
    };

    const handleCreateOrder = (value) => {
        setOrders([...orders, ...value]);
        setCarts([]);
    };

    const handleOrderPayment = (value) => {
        const updateOrders = orders.map((item) => (item.orderId === value.orderId ? { ...item, isPaid: true } : item));
        setOrders(updateOrders);
    };

    return (
        <div className='container py-5'>
            <div className='row'>
                <div className='col-6'>
                    <Products data={products} onClick={handleAddCart} />
                </div>
                <div className='col-6'>
                    <Cart
                        data={carts}
                        updateCartQuantity={updateCartQuantity}
                        total={total}
                        handleCreateOrder={handleCreateOrder}
                    />
                </div>
                <div className='col-12'>
                    <Orders data={orders} handleOrderPayment={handleOrderPayment} />
                </div>
            </div>
        </div>
    );
}

export default App;
