import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import FormContainer from '../../components/FormContainer'
import { useGetCookieDetailsQuery, useUpdateCookieMutation } from '../../slices/cookiesApiSlice'

const CookieEditScreen = () => {

    const { id: cookieId } = useParams()

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [countInStock, setCountInStock] = useState(0)

    const { data: cookie, error, isLoading, refetch } = useGetCookieDetailsQuery(cookieId)
    
    const [updateCookie, { isLoading: loadingUpdate }] = useUpdateCookieMutation()

    const navigate = useNavigate()

    useEffect(() => {
        if (cookie) {
            setName(cookie.name)
            setPrice(cookie.price)
            setImage(cookie.image)
            setDescription(cookie.description)
            setCountInStock(cookie.countInStock)
        }
    }, [cookie])

    const submitHandler = async (e) => {
    e.preventDefault();
    const updatedCookie = {
        cookieId,
        name,
        price,
        image,
        description,
        countInStock,
    };

    const result = await updateCookie(updatedCookie)
    if (result.error) {
        toast.error(result.error.message)
    } else {
        toast.success('Cookie updated')
        navigate('/admin/cookielist')
    }
    }

    return (
        <>
            <Link to='/admin/cookielist' className='btn btn-primary my-3'>
                Back to Cookie List
            </Link>
            <FormContainer>
                <h1>Edit Cookie</h1>
                {loadingUpdate && <Loader />}
    
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Form onSubmit={ submitHandler}>
                        <Form.Group controlId='name' className="my-2">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='price' className="my-2">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='description' className="my-2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId='countInStock' className="my-2">
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter count in stock'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            />
                        </Form.Group>
                    <Button 
                    type='submit'
                    variant='primary'
                    className = 'my-2'>
                    Update

                    </Button>

                    </Form>
                )}
            </FormContainer>
        </>
    );
}

export default CookieEditScreen