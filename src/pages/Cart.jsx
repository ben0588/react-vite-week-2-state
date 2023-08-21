import { useEffect, useState } from 'react';
import { BsXLg } from 'react-icons/bs';

const Cart = ({ data, updateCartQuantity, total, handleCreateOrder, onDelete }) => {
    const [text, setText] = useState('');

    return (
        <div>
            <h2>購物車列表</h2>
            {data.length === 0 ? (
                <div className='pt-3'>購物車空空如也，去逛逛～</div>
            ) : (
                <>
                    <table className='table align-middle'>
                        <thead>
                            <tr>
                                <th>品項</th>
                                <th>描述</th>
                                <th>單價</th>
                                <th>數量</th>
                                <th>小計</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>${item.price}</td>
                                    <td>
                                        <select
                                            value={item.quantity}
                                            onChange={(e) => {
                                                let newQuantity = parseInt(e.target.value);
                                                if (item.quantity >= 99) {
                                                    updateCartQuantity({ ...item, quantity: 99 });
                                                }
                                                updateCartQuantity({ ...item, quantity: newQuantity });
                                            }}
                                        >
                                            {[...Array(99)].map((_, i) => (
                                                <option value={i + 1} key={i}>
                                                    {i + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td>${item.price * item.quantity}</td>
                                    <td>
                                        <button
                                            type='button'
                                            className='btn btn-none btn-sm'
                                            onClick={() => onDelete(item.id)}
                                        >
                                            <BsXLg />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                {total ? (
                                    <td colSpan={5}>
                                        <span className='float-end fw-bolder fs-5'> 總價：$NT{total}</span>
                                    </td>
                                ) : null}
                            </tr>
                        </tfoot>
                    </table>
                    <div>
                        <label htmlFor='userMessage' className='form-label fw-bolder'>
                            填寫備註
                        </label>
                        <textarea
                            name='message'
                            id='userMessage'
                            cols='30'
                            rows='4'
                            placeholder='請填寫訂單備註'
                            className='form-control'
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        ></textarea>
                    </div>
                    <button
                        type='button'
                        className='float-end btn btn-dark w-50 btn-sm mt-3'
                        onClick={() => {
                            handleCreateOrder([
                                {
                                    orderId: new Date().getTime(),
                                    carts: data,
                                    message: text,
                                    isPaid: false,
                                    total: total,
                                },
                            ]);
                            setText('');
                        }}
                    >
                        送出訂單
                    </button>
                </>
            )}
        </div>
    );
};
export default Cart;
