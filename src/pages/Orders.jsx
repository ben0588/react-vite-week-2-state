const Orders = ({ data, handleOrderPayment }) => {
    return (
        <div className='mt-3'>
            <h2>訂單列表</h2>
            {data?.map((items) => (
                <div className='border border-2 p-3 mb-3' key={items.orderId}>
                    <div>訂單編號：{items.orderId}</div>
                    <div>
                        訂單狀態：
                        {Boolean(items.isPaid) ? (
                            <span className='text-success'>已付款</span>
                        ) : (
                            <button
                                type='button'
                                onClick={() => handleOrderPayment(items)}
                                className='btn btn-sm btn-outline-dark py-0'
                            >
                                付款
                            </button>
                        )}
                    </div>
                    <div>訂單備註：{items.message}</div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>品項</th>
                                <th>單價</th>
                                <th>數量</th>
                                <th>小計</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items?.carts?.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>$NT{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>$NT{item.quantity * item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={4}>
                                    <span className='fs-4 fw-bolder'>訂單總金額：$NT{items.total}</span>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            ))}
        </div>
    );
};
export default Orders;
