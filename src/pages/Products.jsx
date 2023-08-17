import { useEffect } from 'react';

const Products = ({ data, onClick }) => {
    return (
        <div>
            <h2>產品列表</h2>
            <ul>
                {data?.map((item) => (
                    <li key={item.id} className='mb-1'>
                        <div className='d-flex justify-content-center align-items-center'>
                            <div style={{ width: `100px` }}>{item.name}</div>
                            <div className='flex-grow-1 '>{item.description}</div>
                            <div className='pe-4'>$NT {item.price}</div>
                            <div>
                                <button
                                    type='button'
                                    className='btn btn-dark btn-sm'
                                    onClick={() => onClick({ ...item, quantity: 1 })}
                                >
                                    加入購物車
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Products;
