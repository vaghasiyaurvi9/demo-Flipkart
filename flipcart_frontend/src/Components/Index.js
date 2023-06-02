import React, { useState } from 'react'
import NavBar from './NavBar'
import Category from './Category'

import Owlcarosel from './Owlcarosel'
import { useQuery } from '@apollo/client'
import { GET_ALL_PRODUCT } from '../gql/Queries'
import { Link } from 'react-router-dom'
import Footer from './Footer'

const Index = () => {
  const pageSize = 6;
  const [page, setPage] = useState(0);
  const { loading, error, data } = useQuery(GET_ALL_PRODUCT, {
    variables: {
      limit: pageSize,
      offset: page * pageSize,
      // page: 1,
      // pageSize: 1

    }
  });


  if (loading) return <h5>loading...</h5>

  if (error) {
    console.log(error);
  }
  if (data) {
    console.log(data);
  }
  const products = data.products;

  return (
    <div>
      <NavBar />
      <Category />
      <Owlcarosel />

      <div className="container">
        <div className="row mt-5">
          {
            data.products.map((productdata, index) => {
              return (
                <div className="col-4 mb-4" key={index}>
                  <img src={productdata.url} alt="" className='imgsize' />
                  <div className='p-2'>
                    <p className=' mt-1 text-primary'> Name:  {productdata.name}</p>

                    <p className=''> Price: from {productdata.price}*</p>
                    <span className=''>Brand:  {productdata.brand}</span>
                    <p className='text-truncate'>{productdata.productDetail}</p>
                    <Link to={`/product/${productdata._id}`}> <button className='btn btn-outline-primary mt-2  fw-bold'>View More</button></Link>
                  </div>


                </div>
              )
            })
          }
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-2 text-center mx-auto">
            <button className='me-2 btn btn-outline-primary' disabled={!page} onClick={() => setPage((prev) => prev - 1)}>previous</button>
            <button className='btn btn-outline-primary' disabled={!products.length} onClick={() => setPage((prev) => prev + 1)} >next</button>
          </div>
        </div>
      </div>



      <Footer />
    </div>
  )
}

export default Index


