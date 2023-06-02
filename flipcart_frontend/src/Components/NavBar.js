import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { FaCartArrowDown, FaArrowDown } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { SEARCH_ITEM } from '../gql/Queries';
import Index from './Index';
import DarkMode from '../Pages/DarkLightMode/DarkMode';


const NavBar = () => {

  const navigate = useNavigate();
  const [searchData, setSearchData] = useState('');
  const [hideProduct, sethideProduct] = useState(true);
  const [searchProduct, { data, error, loading }] = useLazyQuery(SEARCH_ITEM, {
    variables: {
      searchItem: searchData
    },
    fetchPolicy: 'network-only', 
  });

  useEffect(() => {
    
    if (searchData.length !== 0) {
      searchProduct();
      sethideProduct(false);
    } else {
      sethideProduct(true);
    }
  },[searchData]);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data) {
    console.log("data======", data);
  }




  const logoutData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('UserData');
    localStorage.removeItem('userData');

    navigate('/login')
  }
  const handleChange = (e) =>{
    setTimeout(() => {
    setSearchData(e.target.value);

    },1000);
    // const query= e.target.value;
    // setSearchData(query);
    // searchProduct({variables:{query}});
  }


  return (
    <div>

      <div className="bg-color">
        <div className="row py-2 justify-content-center">
          <div className="col-auto d-flex">
            <Link to="/" className='text-decoration-none'><h3 className='text-white'>FlipKart</h3></Link>

            {/* search product */}
            <input type="search" placeholder='Animi sed aut unde ' value={searchData} className='mx-3 p-1' size="50"  onChange={handleChange} />

            <Link to="/login"><button className='text-primary px-5 py-2 border-0 '>Login</button></Link>
            <p className='text-white fw-bold mt-1 ms-3'>Become a Seller</p>
            <p className='text-white mx-4 fw-bold mt-1  '>More<FaArrowDown className='ms-1' /></p>
            <Link to="/addcartdata"><p className='text-white fs-5 fw-bold logoutbtn' ><FaCartArrowDown className='fs-4 me-2' />Cart</p></Link>
            <p className='text-white fw-bold mt-1 ms-5 logoutbtn' onClick={() => { logoutData() }}>Logout</p>
            <DarkMode/>


          </div>

        </div>
      </div>

     <div className="container">
     <div className='row ' hidden={hideProduct}>
       <div className="col-9 mx-auto">
       {
          data &&
          data.searchItem.map(({name,_id}) => {
        
             return <Link to={`/product/${_id}`} className='text-decoration-none'><p className=''>{name}</p></Link>
          })
        }
       </div>
      </div>
     </div>
    </div>
  )
}

export default NavBar
