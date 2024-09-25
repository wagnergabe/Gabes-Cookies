import { Helmet }  from 'react-helmet-async';

const Meta = ({ title, description }) => {

  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Helmet>
  )
}

Meta.defaultProps = {
    title: 'Welcome to my Cookie Shop',
    description: 'Homemade cookies for everyone',
};

export default Meta;
