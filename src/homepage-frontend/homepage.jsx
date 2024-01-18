import React from 'react';
import './homepage.css'

import { Icon } from '@iconify/react';
import { Link,useNavigate } from 'react-router-dom';
import logoImg from '../images/logo.png'
import billboardImg from '../images/billboard-img.jpg'
import item4Img from  '../images/item4.jpg'
import item6Img from  '../images/item6.jpg'
import item1Img from  '../images/item1.jpg'
import item2Img from  '../images/item2.jpg'
import item5Img from  '../images/item5.jpg'
import item9Img from  '../images/item9.jpg'
import item10Img from  '../images/item10.jpg'
import item8Img from  '../images/item8.jpg'
import team1Img from '../images/team1.jpg'
import team2Img from '../images/team2.jpg'
import team4Img from '../images/team4.jpg'
import team5Img from '../images/team5.jpg'



const Homepage = () => {
  return (
    <div>
        <title>TuTorFinder Homepage</title>
        <meta charSet="utf-8"></meta>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;600;700&family=Roboto+Slab&display=swap"
        rel="stylesheet"></link>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossOrigin="anonymous"></link>

        <nav className="main-menu d-flex navbar fixed-top navbar-expand-lg p-2 py-3 p-lg-4 py-lg-4 ">
            <div className="container-fluid">
                <div className="main-logo">
                    <a href="index.html">
                    <img src={logoImg} alt="logo" className="img-fluid"></img>
                    </a>
                </div>

                <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" >

                    <div className="offcanvas-header" >
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>

                <div className="offcanvas-body justify-content-end">

                <ul className="navbar-nav menu-list list-unstyled align-items-lg-center d-flex gap-md-3 mb-0">
                    <li className="nav-item">
                    <a href="index.html" className="nav-link mx-2 active">Home</a>
                    </li>
                    <li className="nav-item">
                    <a href="contact.html" className="nav-link mx-2">Contact</a>
                    </li>
                    <li className="nav-item">
                    <a href="contact.html" className="nav-link mx-2">About Us</a>
                    </li>
                </ul>

                <div className="d-none d-lg-flex align-items-center ms-5">
                    <ul className="d-flex justify-content-end  list-unstyled m-0">
                    <li>
                        <Link to="/login" className="btn btn-outline-dark mx-3 p-3">Login/Signup</Link>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
        </nav>

        <section id="hero">
            <div className="container-fluid">
            <div className="row">
                <div className="col-md-8 col-lg-3 offset-md-2 padding-large ps-lg-0 pe-lg-5">
                <h2 className="display-2 fw-semibold">Unlock Your Learning Potential with <span className="billboardtext-1">Tutor<span className='billboardtext-2'>Finder!</span></span></h2>
                <p className="secondary-font my-4 pb-2"> Personalized online tutoring by expert educators. Tailored lessons, global community, and secure learning. Elevate your education with us today!</p>
                </div>
                <div className="col-md-6 col-lg-7 d-block d-md-none d-lg-block p-0">
                <img src={billboardImg} alt="img" className="img-fluid"></img>
                </div>
            </div>
            </div>
        </section>

        <section id="top-sell" className="padding-medium">
            <div className="container">

            <div className="text-center mb-5">
                <h2 className="display-5 fw-semibold">Check our <span className="featured-course">featured courses</span></h2>
                <p className="secondary-font">Our Certified Courses That are Trusted by Students</p>
            </div>
            <div className="isotope-container row">

                <div className="item digital col-md-4 col-lg-3 my-5">
                <div className="z-1 position-absolute m-3">
                    <span className="badge text-muted bg-primary">10 Hours</span>
                </div>
                <div className="card position-relative">
                    <a href="courses-details.html"><img src={item4Img} className="img-fluid rounded-3" alt="image"></img></a>
                    <div className="card-body p-0">
                    <span className="badge text-muted bg-success mt-3 mb-1">Beginner</span>

                    <a href="courses-details.html" className='coursename'>
                        <h5 className="py-2 m-0"><strong>Introduction to Calculus</strong></h5>
                    </a>

                    <div className="card-text">
                        <span className="rating d-flex align-items-center mb-2">
                        <p className="text-muted fw-semibold m-0 me-2">Young Ho</p>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        </span>

                        <h4 className="cost">$9.00 </h4>

                        <div className="d-flex flex-wrap mt-2">
                        <a href="#" className="btn btn-outline-dark text-capitalize me-2 px-4 py-3">Enroll Now</a>
                        </div>

                    </div>

                    </div>
                </div>
                </div>
                <div className="item web col-md-4 col-lg-3 my-5">
                <div className="z-1 position-absolute m-3">
                    <span className="badge text-muted bg-primary">25 Hours</span>
                </div>
                <div className="card position-relative">
                    <a href="courses-details.html"><img src={item6Img} className="img-fluid rounded-3" alt="image"></img></a>
                    <div className="card-body p-0">

                    <span className="badge text-muted bg-success mt-3 mb-1">All Level</span>

                    <a href="courses-details.html" className='coursename'>
                        <h5 className="py-2 m-0"><strong>Language Arts Workshop</strong></h5>
                    </a>

                    <div className="card-text">
                        <span className="rating d-flex align-items-center mb-2">
                        <p className="text-muted fw-semibold m-0 me-2">Young Ho</p>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:half-star-solid" className="rating"></Icon>
                        </span>

                        <h4 className="cost">$7.00</h4>

                        <div className="d-flex flex-wrap mt-2">
                        <a href="#" className=" btn btn-outline-dark text-capitalize me-2 px-4 py-3">Enroll Now</a>
                        </div>

                    </div>

                    </div>
                </div>
                </div>
                <div className="item photo col-md-4 col-lg-3 my-5">
                <div className="z-1 position-absolute m-3">
                    <span className="badge text-muted bg-primary">40 Hours</span>
                </div>
                <div className="card position-relative">
                    <a href="courses-details.html"><img src={item1Img} className="img-fluid rounded-3" alt="image"></img></a>
                    <div className="card-body p-0">

                    <span className="badge text-muted bg-success mt-3 mb-1">Experts</span>

                    <a href="courses-details.html" className='coursename'>
                        <h5 className="py-2 m-0"><strong>Organic Chemistry</strong></h5>
                    </a>

                    <div className="card-text">
                        <span className="rating d-flex align-items-center mb-2">
                        <p className="text-muted fw-semibold m-0 me-2">Young Ho</p>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        </span>

                        <h4 className="cost">$10.00</h4>

                        <div className="d-flex flex-wrap mt-2">
                        <a href="#" className=" btn btn-outline-dark text-capitalize me-2 px-4 py-3">Enroll Now</a>
                        </div>

                    </div>

                    </div>
                </div>
                </div>
                <div className="item business col-md-4 col-lg-3 my-5">
                <div className="z-1 position-absolute m-3">
                    <span className="badge text-muted bg-primary">35 Hours</span>
                </div>
                <div className="card position-relative">
                    <a href="courses-details.html"><img src={item2Img} className="img-fluid rounded-3" alt="image"></img></a>
                    <div className="card-body p-0">

                    <span className="badge text-muted bg-success mt-3 mb-1">Beginner</span>

                    <a href="courses-details.html" className='coursename'>
                        <h5 className="py-2 m-0"><strong>Introduction to Physics</strong></h5>
                    </a>

                    <div className="card-text">
                        <span className="rating d-flex align-items-center mb-2">
                        <p className="text-muted fw-semibold m-0 me-2">Young Ho</p>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:half-star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-line" className="rating"></Icon>
                        </span>

                        <h4 className="cost">$5.00 </h4>

                        <div className="d-flex flex-wrap mt-2">
                        <a href="#" className=" btn btn-outline-dark text-capitalize me-2 px-4 py-3">Enroll Now</a>
                        </div>

                    </div>

                    </div>
                </div>
                </div>
                <div className="item video col-md-4 col-lg-3 my-5">
                <div className="z-1 position-absolute m-3">
                    <span className="badge text-muted bg-primary">45 Hours</span>
                </div>
                <div className="card position-relative">
                    <a href="courses-details.html"><img src={item5Img} className="img-fluid rounded-3" alt="image"></img></a>
                    <div className="card-body p-0">

                    <span className="badge text-muted bg-success mt-3 mb-1">All Level</span>

                    <a href="courses-details.html" className='coursename'>
                        <h5 className="py-2 m-0"><strong>Environmental Challenges and Solutions</strong></h5>
                    </a>

                    <div className="card-text">
                        <span className="rating d-flex align-items-center mb-2">
                        <p className="text-muted fw-semibold m-0 me-2">Young Ho</p>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        </span>
                        <h4 className="cost">$5.00</h4>
                        <div className="d-flex flex-wrap mt-2">
                        <a href="#" className=" btn btn-outline-dark text-capitalize me-2 px-4 py-3">Enroll Now</a>

                        </div>

                    </div>

                    </div>
                </div>
                </div>
                <div className="item web col-md-4 col-lg-3 my-5">
                <div className="z-1 position-absolute m-3">
                    <span className="badge text-muted bg-primary">50 Hours</span>
                </div>
                <div className="card position-relative">
                    <a href="courses-details.html"><img src={item10Img} className="img-fluid rounded-3" alt="image"></img></a>
                    <div className="card-body p-0">

                    <span className="badge text-muted bg-success mt-3 mb-1">Experts</span>

                    <a href="courses-details.html" className='coursename'>
                        <h5 className="py-2 m-0"><strong>World Civilizations: From Ancient Times to the Present</strong></h5>
                    </a>

                    <div className="card-text">
                        <span className="rating d-flex align-items-center mb-2">
                        <p className="text-muted fw-semibold m-0 me-2">Young Ho</p>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:half-star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-line" className="rating"></Icon>
                        </span>

                        <h4 className="cost">$7.00</h4>

                        <div className="d-flex flex-wrap mt-2">
                        <a href="#" className=" btn btn-outline-dark text-capitalize me-2 px-4 py-3">Enroll Now</a>
                        </div>
                    </div>

                    </div>
                </div>
                </div>
                <div className="item photo col-md-4 col-lg-3 my-5">
                <div className="z-1 position-absolute m-3">
                    <span className="badge text-muted bg-primary">30 Hours</span>
                </div>
                <div className="card position-relative">
                    <a href="courses-details.html"><img src={item9Img} className="img-fluid rounded-3" alt="image"></img></a>
                    <div className="card-body p-0">

                    <span className="badge text-muted bg-success mt-3 mb-1">Beginner</span>

                    <a href="courses-details.html" className='coursename'>
                        <h5 className="py-2 m-0"><strong>Introduction to Digital Art</strong></h5>
                    </a>

                    <div className="card-text">
                        <span className="rating d-flex align-items-center mb-2">
                        <p className="text-muted fw-semibold m-0 me-2">Young Ho</p>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        </span>

                        <h4 className="cost">$20.00</h4>

                        <div className="d-flex flex-wrap mt-2">
                        <a href="#" className=" btn btn-outline-dark text-capitalize me-2 px-4 py-3">Enroll Now</a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="item business col-md-4 col-lg-3 my-5">
                <div className="z-1 position-absolute m-3">
                    <span className="badge text-muted bg-primary">35 Hours</span>
                </div>
                <div className="card position-relative">
                    <a href="courses-details.html"><img src={item8Img} className="img-fluid rounded-3" alt="image"></img></a>
                    <div className="card-body p-0">

                    <span className="badge text-muted bg-success mt-3 mb-1">Intermediate</span>

                    <a href="courses-details.html" className='coursename'>
                        <h5 className="py-2 m-0"><strong>Entrepreneurship 101</strong></h5>
                    </a>

                    <div className="card-text">
                        <span className="rating d-flex align-items-center mb-2">
                        <p className="text-muted fw-semibold m-0 me-2">Young Ho</p>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:half-star-solid" className="rating"></Icon>
                        </span>

                        <h4 className="cost">$20.00</h4>
                        <div className="d-flex flex-wrap mt-2">
                        <a href="#" className=" btn btn-outline-dark text-capitalize me-2 px-4 py-3">Enroll Now</a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>

        <section id="top-sell" className="padding-medium">
            <div className="container">
            <div className="text-center mb-5">
                <h2 className="display-5 fw-semibold">Check our <span className="featured-tutor">Certified Tutors</span></h2>
                <p className="secondary-font">Our Certified Tutors That Are Trusted by Thousands of Students</p>
            </div>
            <div className="isotope-container row">
                <div className="item digital col-md-4 col-lg-3 my-5">
                <div className="card position-relative">
                    <a href="courses-details.html"><img src={team1Img} className="img-fluid rounded-3" alt="image"></img></a>
                    <div className="card-body p-0">
                    <span className="badge text-muted bg-success mt-3 mb-1">Certified</span>

                    <a href="courses-details.html" className='tutorname'>
                        <h5 className="py-2 m-0"><strong>Andrew Garfield</strong></h5>
                    </a>

                    <div className="card-text">
                        <span className="rating d-flex align-items-center mb-2">
                        <p className="text-muted fw-semibold m-0 me-2">Mathematics Tutor</p>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        </span>
                        <div className="d-flex flex-wrap mt-2">
                        <a href="#" className=" btn btn-outline-dark text-capitalize me-2 px-4 py-3">Contact Tutor</a>
                        </div>

                    </div>

                    </div>
                </div>
                </div>
                <div className="item web col-md-4 col-lg-3 my-5">

                <div className="card position-relative">
                    <a href="courses-details.html"><img src={team5Img} className="img-fluid rounded-3" alt="image"></img></a>
                    <div className="card-body p-0">

                    <span className="badge text-muted bg-success mt-3 mb-1">Certified</span>

                    <a href="courses-details.html" className='tutorname'>
                        <h5 className="py-2 m-0"><strong>May Sophia</strong></h5>
                    </a>

                    <div className="card-text">
                        <span className="rating d-flex align-items-center mb-2">
                        <p className="text-muted fw-semibold m-0 me-2">History Professor</p>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:half-star-solid" className="rating"></Icon>
                        </span>


                        <div className="d-flex flex-wrap mt-2">
                        <a href="#" className=" btn btn-outline-dark text-capitalize me-2 px-4 py-3">Contact Tutor</a>
                        </div>

                    </div>

                    </div>
                </div>
                </div>
                <div className="item photo col-md-4 col-lg-3 my-5">
                <div className="card position-relative">
                    <a href="courses-details.html"><img src={team4Img} className="img-fluid rounded-3" alt="image"></img></a>
                    <div className="card-body p-0">
                    <span className="badge text-muted bg-success mt-3 mb-1">Certified</span>

                    <a href="courses-details.html" className='tutorname'>
                        <h5 className="py-2 m-0"><strong>May Sophia</strong></h5>
                    </a>

                    <div className="card-text">
                        <span className="rating d-flex align-items-center mb-2">
                        <p className="text-muted fw-semibold m-0 me-2">Chemistry Expert</p>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        </span>
                        <div className="d-flex flex-wrap mt-2">
                        <a href="#" className=" btn btn-outline-dark text-capitalize me-2 px-4 py-3">Contact Tutor</a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="item business col-md-4 col-lg-3 my-5">
                <div className="card position-relative">
                    <a href="courses-details.html"><img src={team2Img} className="img-fluid rounded-3" alt="image"></img></a>
                    <div className="card-body p-0">

                    <span className="badge text-muted bg-success mt-3 mb-1">Certified</span>

                    <a href="courses-details.html" className='tutorname'>
                        <h5 className="py-2 m-0"><strong>Young Ho</strong></h5>
                    </a>
                    <div className="card-text">
                        <span className="rating d-flex align-items-center mb-2">
                        <p className="text-muted fw-semibold m-0 me-2">Business Mentor</p>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-solid" className="rating"></Icon>
                        <Icon icon="clarity:half-star-solid" className="rating"></Icon>
                        <Icon icon="clarity:star-line" className="rating"></Icon>
                        </span>
                        <div className="d-flex flex-wrap mt-2">
                        <a href="#" className=" btn btn-outline-dark text-capitalize me-2 px-4 py-3">Contact Tutor</a>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
        <footer id="footer">
            <div className="container padding-medium ">
            <div className="row">
                <div className="col-md-4 my-3">
                <h5 className="text-uppercase fw-bold mb-4">Contact us</h5>
                <p><Icon className="social-icon text-primary fs-5 me-2" icon="mdi:location"
                    style={{ verticalAlign: 'text-bottom' }}></Icon> <span className="fw-bold">Address: </span> 702 Nguyen Van Linh Street, Tan Hung, District 7, Ho Chi Minh City</p>
                <p><Icon className="social-icon text-primary fs-5 me-2" icon="solar:phone-bold"
                    style={{ verticalAlign: 'text-bottom' }}></Icon> <span className="fw-bold">Phone: </span>  028 3776 1300</p>
                <p><Icon className="social-icon text-primary fs-5 me-2" icon="ic:baseline-email"
                   style={{ verticalAlign: 'text-bottom' }}></Icon> <span className="fw-bold">Email: </span>
                    rmitsaigon@rmit.edu.vn
                </p>
                </div>
                <div className="col-md-2 my-3">
                <div className="footer-menu">
                    <h5 className="text-uppercase fw-bold mb-4">Links</h5>
                    <ul className="menu-list list-unstyled">
                    <li className="menu-item mb-2">
                        <a href="#" className="footer-link">Home</a>
                    </li>
                    <li className="menu-item mb-2">
                        <a href="#" className="footer-link">About us</a>
                    </li>
                    <li className="menu-item mb-2">
                        <a href="#" className="footer-link">Contact</a>
                    </li>
                    </ul>
                </div>
                </div>
                <div className="col-md-2 my-3">
                <div className="footer-menu">
                    <h5 className="text-uppercase fw-bold mb-4">Support</h5>
                    <ul className="menu-list list-unstyled">
                    <li className="menu-item mb-2">
                        <a href="#" className="footer-link">FAQs</a>
                    </li>
                    <li className="menu-item mb-2">
                        <a href="#" className="footer-link">Support</a>
                    </li>
                    </ul>
                </div>
                </div>
                {/* <!-- <div className="col-md-3 my-3">
                <div className="footer-menu">
                    <h5 className="text-uppercase fw-bold mb-4">Follow us</h5>
                    <div className="social-links mt-4">
                    <ul className="d-flex list-unstyled gap-3">
                        <li className="social">
                        <a href="#">
                            <Icon className="social-icon fs-4 me-2" icon="ri:facebook-fill"></Icon>
                        </a>
                        </li>
                        <li className="social">
                        <a href="#">
                            <Icon className="social-icon fs-4 me-2" icon="ri:twitter-fill"></Icon>
                        </a>
                        </li>
                        <li className="social">
                        <a href="#">
                            <Icon className="social-icon fs-4 me-2" icon="ri:pinterest-fill"></Icon>
                        </a>
                        </li>
                        <li className="social">
                        <a href="#">
                            <Icon className="social-icon fs-4 me-2" icon="ri:instagram-fill"></Icon>
                        </a>
                        </li>
                        <li className="social">
                        <a href="#">
                            <Icon className="social-icon fs-4 me-2" icon="ri:youtube-fill"></Icon>
                        </a>
                        </li>

                    </ul>
                    </div>
                </div>
                </div> --> */}
            </div>
            </div>
        </footer>

        <script src="./js/jquery-1.11.0.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe"
            crossorigin="anonymous"></script>
        <script src="../homepage-frontend/js/plugins.js"></script>
        <script src="../homepage-frontend/js/script.js"></script>
        <script src="https://code.iconify.design/Icon/1.0.7/Icon.min.js"></script>
    </div>
    );
};

export default Homepage;
