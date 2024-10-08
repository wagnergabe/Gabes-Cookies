import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  Image,
  ListGroup,
  Button,
  Card,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from '../components/Meta';
import { useDispatch, useSelector } from "react-redux";
import {
  useGetCookieDetailsQuery,
  useCreateReviewMutation,
} from "../slices/cookiesApiSlice";
import { addToCart } from "../slices/cartSlice";
import { toast } from "react-toastify";

const CookieScreen = () => {
  const { id: cookieId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: cookie,
    isLoading,
    refetch,
    error,
  } = useGetCookieDetailsQuery(cookieId);

  const [createReview, { isLoading: LoadingCookieReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...cookie, qty }));
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({ cookieId, rating, comment }).unwrap();
      refetch();
      toast.success("Review submitted successfully");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error(err.data.message)
    }
    }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data.message || error.error}</Message>
      ) : (
        <>
          <Meta title={cookie.name} />
          <Row>
            <Col md={3}>
              <Image
                src={cookie.image}
                alt={cookie.name}
                className="card-image"
              />
            </Col>
            <Col>
              <ListGroup>
                <ListGroup.Item>
                  <h3>{cookie.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={cookie.rating}
                    text={`${cookie.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${cookie.price}</ListGroup.Item>
                <ListGroup.Item>{cookie.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col>
              <Card>
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${cookie.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {cookie.countInStock > 0
                          ? "Ready to bake"
                          : "Don't wanna bake this"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {cookie.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(cookie.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={cookie.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className = 'review'>
            <Col md={6}>
            <h2 className = "d-flex justify-content-center">Reviews</h2>
            {cookie.reviews.length === 0 && <Message>No Reviews</Message>}
            <ListGroup>
                {cookie.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                    </ListGroup.Item>
                ))}
                <ListGroup.Item>
                    <h4>Write a Review!</h4>
                    {LoadingCookieReview && <Loader />}
                    
                    {userInfo ? (
                        <Form onSubmit={ submitHandler}>
                            <Form.Group controlId='rating'>
                                <Form.Label>Rating</Form.Label>
                                <Form.Control
                                    as='select'
                                    value={rating}
                                    onChange={(e) => setRating(Number(e.target.value))}
                                >
                                    <option value={1}>1 - Ugh</option>
                                    <option value={2}>2 - Meh</option>
                                    <option value={3}>3 - MMMM!</option>
                                    <option value={4}>4 - MMM HMMM!</option>
                                    <option value={5}>5 - &#127926;At Last&#127926;</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId='comment'>
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                    as='textarea'
                                    row='3'
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Button
                                disabled={LoadingCookieReview}
                                type='submit'
                                variant='primary'
                            >
                                Submit
                            </Button>
                        </Form>
                    ) : (
                        <Message>
                            Please <Link to='/login'>sign in</Link> to write a review {' '}
                        </Message>
                    )}
                </ListGroup.Item>
            </ListGroup>
            </Col>

          </Row>
        </>
      )}
    </>
  );
};

export default CookieScreen;
