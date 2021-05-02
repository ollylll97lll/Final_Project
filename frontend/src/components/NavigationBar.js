import React, { useEffect, useState } from 'react'
import '../css/Navigation.css'
import { Link, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { signout } from '../actions/userActions';
import SearchBox from './SearchBox';
import { listProductCategories } from '../actions/productActions';

function NavigationBar() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin;

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const [searchbar, setSearchBar] = useState(false);

  const showSearchBar = (e) => {
    setSearchBar(!searchbar)
  }

  const handleScroll = () => {
    // set the current position 
    const currentScrollpos = window.pageYOffset;
    // if the current position < prev position
    // => scrolling up 
    // show navbar
    setVisible((prevScrollPos > currentScrollpos))
    setPrevScrollPos(currentScrollpos)
  };

  const signoutHandler = () => {
    dispatch(signout());
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [prevScrollPos, visible, handleScroll]);

  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch])


  const seenheight = {
    top: 0,
    transition: "top 200ms ease"
  }
  const noheight = {
    top: -150 + "px",
    transition: "top 200ms ease"
  }
  return (
    <div>
      <header id="header-fixed-banner" role="banner" style={visible ? seenheight : noheight}>
        {/* <!-- MAIN LOGO --> */}
        <div className="logo" role="link" >
          <Link to="/" tabIndex="1">And.Above</Link>
        </div>

        <nav>
          {/* <!-- LOCATION AND CONTACT NAVBAR --> */}
          <ul className="secondary-header-nav-bar locator-nav-bar">
            <li className="header-nav-list-item"><a href="https://goo.gl/maps/k2XnHgPCLg1syVoo7">
              <svg className="header-icons" viewBox="0 0 144 198.45" >
                <use xlinkHref="../SVGs/location-icon.svg#Layer_2" />
              </svg>
              <span>Viet Nam</span>
            </a></li>
            <li className="header-nav-list-item"><a href="https://www.instagram.com/and.above/">
              <svg className="header-icons" viewBox="0 0 15 15" >
                <use xlinkHref="#svg-instagram" />
              </svg>
              <span> Instagram</span>
            </a></li>
          </ul>

          {/* <!-- PAGES NAVIGATION BAR --> */}
          <ul className="main-header-nav-bar">
            <li className="header-nav-list-item">
              <div className="main-header-nav-items">
                <Link to="/collections">LATEST COLLECTION</Link>
              </div>
            </li>

            <li className="header-nav-list-item">
              <div className="main-header-nav-items">
                <Link to="/search/category/top/name/all">TOPS</Link>
              </div>
            </li>

            <li className="header-nav-list-item">
              <div className="main-header-nav-items">
                <Link to="/search/category/bottom/name/all">BOTTOMS</Link>
              </div>
            </li>

            <li className="header-nav-list-item">
              <div className="main-header-nav-items">
                <Link to="/search/category/accessories/name/all">ACCESSORIES</Link>
              </div>
            </li>

            <li className="header-nav-list-item">
              <div className="main-header-nav-items">
                <Link to="/">SOCIAL</Link>
              </div>
            </li>

          </ul>

          {/* <!-- CUSTOMER NAV BAR --> */}
          {
            userInfo && userInfo.isAdmin ? (
              <ul className="secondary-header-nav-bar customer-nav-bar"><li className="header-nav-list-item">
                <Dropdown>
                  <Dropdown.Toggle id="nonedropdown">
                    <Link to="#admin">Welcome back, Administrator</Link>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item><Link to="/#signout" onClick={signoutHandler}>Sign Out</Link></Dropdown.Item>
                    <Dropdown.Item><Link to="/dashboard">Order History</Link></Dropdown.Item>
                    <Dropdown.Item><Link to="/productlist">Product List </Link></Dropdown.Item>
                    <Dropdown.Item><Link to="/orderlist">Order List </Link></Dropdown.Item>
                    <Dropdown.Item><Link to="/userlist">User List</Link></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown></li></ul>
            ) : userInfo ? (
              <ul className="secondary-header-nav-bar customer-nav-bar">



                <li className="header-nav-list-item"><Link to="/saved"><span>Saved</span></Link></li>
                <li className="header-nav-list-item"><Link to="/cart">
                  <svg className="header-icons"> <use xlinkHref="#svg-icon-shopping-bag" /></svg>
                  {
                    cartItems.length > 0 && (
                      <sup className="badge">{cartItems.length}</sup>
                    )
                  }
                </Link></li>

                <li className="header-nav-list-item"><Dropdown>
                  <Dropdown.Toggle id="nonedropdown">
                    <Link to="/#">Hello, {userInfo.name}</Link>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item><Link to="/#signout" onClick={signoutHandler}>Sign Out</Link></Dropdown.Item>
                    <Dropdown.Item><Link to="/orderhistory">Order History</Link></Dropdown.Item>
                    <Dropdown.Item><Link to="/profile">Profile </Link></Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown></li>
              </ul>

            )
              : (<ul className="secondary-header-nav-bar customer-nav-bar"><li className="header-nav-list-item"><Link to="/login"><span>Sign In</span></Link></li>
                <li className="header-nav-list-item"><Link to="/cart">
                  <svg className="header-icons"> <use xlinkHref="#svg-icon-shopping-bag" /></svg>
                  {
                    cartItems.length > 0 && (
                      <sup className="badge">{cartItems.length}</sup>
                    )
                  }
                </Link></li>
              </ul>)

          }
          {/* <!-- SVG THROUGH EXTERNAL FILE --> */}

        </nav>

        {/* <!-- SEARCH ICON SVG --> */}
        <div className="header-search-button">
          {/* <!-- SVG THROUGH <SYMBOL> TAG USE --> */}
          <a onClick={showSearchBar} > <svg id="search-icon"> <use xlinkHref="#svg-icon-search-circle" /> </svg> </a>
        </div>


        <svg display="none">
          <symbol viewBox="0 0 15 15" id="svg-icon-shopping-bag">
            <title>shopping-bag</title>
            <g fill="currentColor">
              <path d="M13,4.2h-2.4l0-2c0-1.1-1.3-2-3-2s-3,0.8-3,2l0,2H1.9c-1,0-1.6,0.5-1.6,1.2l0.5,7.8h13.4l0.6-7.7
                     C14.8,4.7,14,4.2,13,4.2z M6.1,2.2c0.1-0.1,0.6-0.5,1.5-0.5c0.9,0,1.4,0.3,1.5,0.5l0,2h-3L6.1,2.2z M12.8,11.7H2.2L1.8,5.8
                        c0,0,0.1,0,0.1,0H13c0.1,0,0.2,0,0.2,0L12.8,11.7z">
              </path>
            </g>
          </symbol>
          <symbol viewBox="0 0 33 33" id="svg-icon-search-circle">
            <title>search-circle</title>
            <g id="search-circle-search" fill="currentColor">
              <path d="M14.90625,19.2484472 C12.75,19.2484472 10.96875,17.3850932 10.96875,15.1490683 C10.96875,12.9130435 12.75,11.0496894 14.90625,11.0496894 C17.0625,11.0496894 18.84375,12.9130435 18.84375,15.1490683 C18.9375,17.3850932 17.15625,19.2484472 14.90625,19.2484472 Z M20.0625,18.3167702 C20.625,17.3850932 20.90625,16.2670807 20.90625,15.1490683 C20.90625,11.7018634 18.28125,9 14.90625,9 C11.625,9 9,11.7018634 9,15.1490683 C9,18.5031056 11.625,21.2981366 14.90625,21.2981366 C16.21875,21.2981366 17.53125,20.8322981 18.46875,20.0869565 L22.3125,24 L24,22.5093168 L20.0625,18.3167702 Z" id="search-circle-search1">
              </path>
              <path d="M16.5,0 C7.38644476,0 0,7.38644476 0,16.5 C0,25.6135552 7.38644476,33 16.5,33 C25.6135552,33 33,25.6121856 33,16.5 C33,7.38781439 25.6121856,0 16.5,0 Z M16.5,30.4223458 C8.81086578,30.4223458 2.57765419,24.1905039 2.57765419,16.5 C2.57765419,8.80949614 8.80949614,2.57765419 16.5,2.57765419 C24.1905039,2.57765419 30.4223458,8.80949614 30.4223458,16.5 C30.4223458,24.1905039 24.1891342,30.4223458 16.5,30.4223458 Z" id="search-circle-search2">
              </path>
            </g>
          </symbol>
          <symbol viewBox="0 0 15 15" id="svg-instagram">
            <title>Instagram</title>
            <g id="Layer_2" data-name="Layer 2" fill="currentColor">
              <g id="background" fill="currentColor">
                <path d="M163.93,1.5H55.07A53.58,53.58,0,0,0,1.5,55.07V163.93A53.58,53.58,0,0,0,55.07,217.5H163.93a53.58,53.58,0,0,0,53.57-53.57V55.07A53.58,53.58,0,0,0,163.93,1.5ZM109.5,170.72a61.22,61.22,0,1,1,61.22-61.22A61.22,61.22,0,0,1,109.5,170.72Zm72-119.22a15,15,0,1,1,15-15A15,15,0,0,1,181.5,51.5Z" />
              </g>
            </g>
          </symbol>
        </svg>

      </header>
      {searchbar
        ? <Route render={ ({history}) => (<SearchBox history={history} style={{ display: "block" }} />) }/>
        : <></>
      }
    </div>
  );
};
export default NavigationBar;