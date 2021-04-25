import React from 'react';
import {Alert, Button, Card, Col, ListGroup, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import Rating from "./Rating";


const Favourites = () => {
    const {favorite, based, rates} = useSelector((store) => store)
    const currency = {
        USD: "$",
        EUR: "€",
        RUB: "₽"
    }
    const dispatch = useDispatch()

    return (
        <div>
            {
                favorite.length === 0 ?
                    <Alert variant="info">
                        Здесь  пусто!
                    </Alert> :
                    <>
                        <Row>
                            {favorite.map(product =>
                                    <Col md={3} key={product.id}>
                                        <Card className='mb-4'>
                                            <Card.Img variant="top" src={product.image} className='product-img' />
                                            <Card.Body>
                                                <Card.Title>{product.title}</Card.Title>
                                                <Card.Text>
                                                    Price: {(product.price * rates[based]).toFixed(2)}{currency[based]}
                                                </Card.Text>
                                                <Rating rating={product.rating} color='white' />

                                                <div className='d-flex justify-content-between align-items-center'>
                                                    {/*<Button variant="secondary"*/}
                                                    {/*        onClick={() => dispatch({type: "ADD_TO_CART", product})}>*/}
                                                    {/*    add to cart*/}
                                                    {/*</Button>*/}

                                                    <span  className='heart'
                                                           onClick={() =>  dispatch({type: "REMOVE_FROM_FAVOURITE",id:product.id})}
                                                    >

                            <i className="far fa-heart">

                            </i>
                        </span>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                            )}
                        </Row>
                    </>
            }

        </div>
    );
};

export default Favourites;