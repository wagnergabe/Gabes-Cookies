import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Paginate from '../../components/Paginate';
import { useGetCookiesQuery, useCreateCookieMutation, useDeleteCookieMutation } from "../../slices/cookiesApiSlice";
import { toast } from "react-toastify"




const CookieListScreen = () => {

    const { pageNumber } = useParams();

    const { data, error, isLoading, refetch } = useGetCookiesQuery({ pageNumber});

    const [createCookie, { isloading: loadingCreate }] = useCreateCookieMutation();

    const [deleteCookie, { isLoading: loadingDelete }] = useDeleteCookieMutation();

    // console.log(cookies)
    const deleteHandler = async(id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteCookie(id);
                toast.success('Cookie gone')
                refetch()
            } catch (error) {
                toast.error(error?.data?.message || error.message)
            }
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
    {loadingDelete && <Loader />}
    {isLoading ? ( <Loader /> ) : error ? ( <Message variant='danger'>{error?.data?.message || error.message}</Message> ) : ( 
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
                {data.cookies.map((cookie) => (
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
        <Paginate pages={data.pages} page={data.page} isAdmin={true} />
        </>
    )}
    </>
  )
}

export default CookieListScreen