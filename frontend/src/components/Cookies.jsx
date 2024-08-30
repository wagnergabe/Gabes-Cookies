import { Card } from 'react-bootstrap';

const Cookies = ({ cookie }) => {
    return (
        <Card className="my-3 p-3 rounded">
        <a href={`/cookie/${cookie._id}`}>
        <Card.Img src={cookie.image} variant="top" />
        </a>

        <Card.Body>
        <a href={`/cookie/${cookie._id}`}>
        <Card.Title as="div">
        <strong>{cookie.name}</strong>
        </Card.Title>
        </a>

        <Card.Text as="h3">
        ${cookie.price}
        </Card.Text>
        </Card.Body>
        </Card> 
    )
}

export default Cookies;