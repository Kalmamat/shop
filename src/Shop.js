import React, {useEffect, } from 'react';
import data from './data'
import {Button, Card, Col, Row, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Rating from "./Rating";


const Shop = () => {
   const dispatch = useDispatch()
    const {catalog, based, rates} = useSelector((store) => store)
    const currency ={
       USD: "$",
        EUR: "€",
        RUB: "₽"
    }

    useEffect(() => {
       dispatch({type:"SET_CATALOG", catalog: data})
    },[])

    return (
        <div>
            <Row className="mb-5">
                <Col md={4}>
                    <div className="d-flex">
                        <Form.Control as ="select" className="mr-3"
                                      onChange={(e) => dispatch({type: "SORT_CATALOG", payload: e.target.value})}>
                            <option value="" disabled selected>Sort by...</option>
                            <option value="a-z">A-Z</option>
                            <option value="z-a">Z-A</option>
                            <option value="lowest">To lowest</option>
                            <option value="highest">To highest</option>
                        </Form.Control>
                        <Form.Control as ="select"
                                      onChange={(e) => dispatch({type: "GET_BASED", payload: e.target.value})}>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="RUB">RUB</option>
                        </Form.Control>
                    </div>
                </Col>
            </Row>
            <Row >
                {catalog.map(product =>
                    <Col md={3} className="mb-5">
                        <Card >
                            <Card.Img className="product-img" variant="top" src={product.image} />
                            <Card.Body>
                                <Card.Title className='product-title'>{product.title}</Card.Title>
                                <Card.Text>Price: {(product.price * rates[based]).toFixed(1)}{currency[based]}</Card.Text>
                                <Card.Text className="truncate text-gray-500 text-sm">
                                    {product.rating}
                                </Card.Text>
                                <Rating rating={product.rating} />
                                <div className="d-flex justify-content-between">
                                    <Button className="mt-3" variant="info"
                                            onClick={() => dispatch({type:"ADD_TO_CART", product})}
                                    >Add to cart</Button>
                                    <span  onClick={() =>  dispatch({type: "ADD_TO_FAVORITES", product})}> <i className="fas fa-heart" ></i></span>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
        </div>
    );
};

export default Shop;