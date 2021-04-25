import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Table, Alert} from "react-bootstrap";

const Cart = () => {
    const {cart, rates, based}= useSelector((s) => s)
    const dispatch = useDispatch()
    const currency ={
        USD: "$",
        EUR: "€",
        RUB: "₽"
    }
    const totalPrice = cart.reduce((acc, el) => {
      return  acc +( el.quantity * el.price * rates[based])
    },0)
    return (
        <div>
            {
                cart.length === 0?
                    <Alert  variant="info">
                        Ваша корзина пуста.
                    </Alert>:
            <>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Изображение</th>
                        <th>Название</th>
                        <th>Количество</th>
                        <th>Цена за штуку</th>
                        <th>Всего</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        cart.map(product =>
                            <tr key={product.id}>
                                <td>
                                    <img src={product.image} alt="" width="47"/>
                                </td>
                                <td>{product.title}</td>
                                <td>
                                    <Button variant="secondary"
                                            onClick={() => dispatch({type:"REMOVE_FROM_CART", id: product.id})}
                                    >-</Button>
                                    <span className="px-3">{product.quantity}</span>
                                    <Button variant="secondary"
                                            onClick={() => dispatch({type:"ADD_TO_CART", product})}
                                    >+</Button>
                                </td>
                                <td>{(product.price * rates[based]).toFixed(1)}{currency[based]}</td>
                                <td>{(product.price * product.quantity * rates[based]).toFixed(1)}{currency[based]}</td>
                                <td>
                                    <Button variant='danger'
                                            onClick={() => dispatch({type: "DELETE_ITEM", id: product.id})}
                                    >Del</Button>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </Table>
                <div className="text-right">
                    <h3> Total:{totalPrice.toFixed(1)}</h3>
                </div></>
            }
        </div>
    );
};

export default Cart;