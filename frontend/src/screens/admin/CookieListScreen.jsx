import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaTimesCircle, FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { useGetCookiesQuery, useCreateCookieMutation } from "../../slices/cookiesApiSlice";
import { toast } from "react-toastify"



const CookieListScreen = () => {

    const { data: cookies, error, isLoading, refetch } = useGetCookiesQuery();

    const [createCookie, { isloading: loadingCreate }] = useCreateCookieMutation();

    // console.log(cookies)
    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            // DELETE COOKIE
        }
    }

    const createCookieHandler = async() => {
        if (window.confirm('Are you sure?')) {
            try {
                await createCookie();
                refetch()
            } catch (error) {
                toast.error(error?.data?.message || error.message)
            }
    }
}

  return (
    <>
    <Row className='align-items-center'>
    <Col>
    <h1>Cookies</h1>
    </Col>
    <Col className='text-end'>
    <Button className='m-3 btn-sm' onClick={createCookieHandler}>
        <FaEdit /> Create Cookie
    </Button>
    </Col>
    </Row>
    {loadingCreate && <Loader />}
    {isLoading ? ( <Loader /> ) : error ? ( <Message variant='danger'>{error}</Message> ) : ( 
        <>
        <Table hover striped responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {cookies.map((cookie) => (
                    <tr key={cookie._id}>
                        <td>{cookie._id}</td>
                        <td>{cookie.name}</td>
                        <td>${cookie.price}</td>
                        <td>
                            <LinkContainer to={`/admin/cookie/${cookie._id}/edit`}>
                                <Button variant='light' className='btn-sm '>
                                    <FaEdit />
                                </Button>
                            </LinkContainer>
                            <Button variant='danger' className='btn-sm' onClick={() =>deleteHandler(cookie._id) }>
                                <FaTrash />
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </>
    )}
    </>
  )
}

export default CookieListScreen