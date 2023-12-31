import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../authentication/AuthContext';
import firebase from "firebase/compat/app";
import axios from 'axios';
import '../style.css';

return(
<div>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  <title>TutorFinder</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
  <link href="dashboard.css" rel="stylesheet" type="text/css" />
  <input type="checkbox" id="nav-toggle" />
  <div className="sidebar">
    <div className="sidebar-brand">
      <p>Tutor<span>Finder</span>.</p>
    </div>
    <div className="sidebar-menu">
      <ul>           
        <li>
          <a href="course_dashboard.html"><span className="fa-solid fa-list-check" />
            <span>My Courses</span></a>
        </li>
        <li>
          <a href="category.html" className="active"><span className="fa-solid fa-magnifying-glass" />
            <span>Search courses</span></a>
        </li>
        <li>
          <a href><span className="fa-solid fa-heart" />
            <span>Saved</span></a>
        </li>
        <li>
          <a href><span className="fa-solid fa-user" />
            <span>My Account</span></a>
        </li>
      </ul>
    </div>
  </div>
  <div className="main-content">
    <header>
      <div className="header-title">
        <h1>
          <label htmlFor="nav-toggle">
            <span className="fa-solid fa-bars" />
          </label>
          Courses
        </h1>
      </div>
      <div className="user-wrapper">
        <div>
          <h4>John Doe</h4>
          <small>Student</small>
        </div>
      </div>
    </header>
    <main>
      <div className="main-container">
        <h2>Search for courses and find your <span>tutor</span></h2>
        <div className="search">
          <div className="search-wrapper">
            <div className="search-wrapper-content">
              <input type="search" placeholder="Search here" />
            </div>
          </div>
        </div>
        <div className="filter-container">
          <div className="category-head">
            <ul>
              <div className="category-title" id="all">
                <li>All</li>
                <span><i className="fas fa-border-all" /></span>
              </div>
              <div className="category-title" id="location">
                <li>Location</li>
                <span><i className="fa-solid fa-location-dot" /></span>
              </div>
              <div className="category-title" id="price">
                <li>Price</li>
                <span><i className="fas fa-coins" /></span>
              </div>
              <div className="category-title" id="university">
                <li>University</li>
                <span><i className="fas fa-landmark" /></span>
              </div>
              <div className="category-title" id="degree">
                <li>Degree level</li>
                <span><i className="fa-solid fa-graduation-cap" /></span>
              </div>
            </ul>
            <div className="tutors-collect">
              <div className="tutors-main-container">
                {/*single post*/}
                <div className="all location">
                  <div className="post-img">
                    <img src="imagies/1.jpg" alt="post" />
                  </div>
                  <div className="post-content">
                    <div className="post-content-top">
                      <span><i className="fa-solid fa-user" />Jack Richard, Phd in IT</span>
                      <span><i className="fas fa-comment" />6</span>
                    </div>
                    <h4>Web design</h4>
                    <p>This course is about this and this. 
                      You will learn a lot. Like fedwedv
                      wfecefcfcc ewfcwf frgreo ewfw wrgl wefw
                    </p>
                  </div>
                  <button type="button" className="read-btn">View all</button>
                </div>
                {/*single post ends*/}
                {/*single post*/}
                <div className="all university">
                  <div className="post-img">
                    <img src="imagies/2.jpg" alt="post" />
                  </div>
                  <div className="post-content">
                    <div className="post-content-top">
                      <span><i className="fa-solid fa-user" />Jack Richard, Phd in IT</span>
                      <span><i className="fas fa-comment" />6</span>
                    </div>
                    <h4>Web design</h4>
                    <p>This course is about this and this. 
                      You will learn a lot. Like fedwedv
                      wfecefcfcc ewfcwf frgreo ewfw wrgl wefw
                    </p>
                  </div>
                  <button type="button" className="read-btn">View all</button>
                </div>
                {/*single post ends*/}
                {/*single post*/}
                <div className="all degree">
                  <div className="post-img">
                    <img src="imagies/3.jpg" alt="post" />
                  </div>
                  <div className="post-content">
                    <div className="post-content-top">
                      <span><i className="fa-solid fa-user" />Jack Richard, Phd in IT</span>
                      <span><i className="fas fa-comment" />6</span>
                    </div>
                    <h4>Web design</h4>
                    <p>This course is about this and this. 
                      You will learn a lot. Like fedwedv
                      wfecefcfcc ewfcwf frgreo ewfw wrgl wefw
                    </p>
                  </div>
                  <button type="button" className="read-btn">View all</button>
                </div>
                {/*single post ends*/}
                {/*single post*/}
                <div className="all location">
                  <div className="post-img">
                    <img src="imagies/4.jpg" alt="post" />
                  </div>
                  <div className="post-content">
                    <div className="post-content-top">
                      <span><i className="fa-solid fa-user" />Jack Richard, Phd in IT</span>
                      <span><i className="fas fa-comment" />6</span>
                    </div>
                    <h4>Web design</h4>
                    <p>This course is about this and this. 
                      You will learn a lot. Like fedwedv
                      wfecefcfcc ewfcwf frgreo ewfw wrgl wefw
                    </p>
                  </div>
                  <button type="button" className="read-btn">View all</button>
                </div>
                {/*single post ends*/}
                {/*single post*/}
                <div className="all university">
                  <div className="post-img">
                    <img src="imagies/3.jpg" alt="post" />
                  </div>
                  <div className="post-content">
                    <div className="post-content-top">
                      <span><i className="fa-solid fa-user" />Jack Richard, Phd in IT</span>
                      <span><i className="fas fa-comment" />6</span>
                    </div>
                    <h4>Web design</h4>
                    <p>This course is about this and this. 
                      You will learn a lot. Like fedwedv
                      wfecefcfcc ewfcwf frgreo ewfw wrgl wefw
                    </p>
                  </div>
                  <button type="button" className="read-btn">View all</button>
                </div>
                {/*single post ends*/}
                {/*single post*/}
                <div className="all degree">
                  <div className="post-img">
                    <img src="imagies/5.jpg" alt="post" />
                  </div>
                  <div className="post-content">
                    <div className="post-content-top">
                      <span><i className="fa-solid fa-user" />Jack Richard, Phd in IT</span>
                      <span><i className="fas fa-comment" />6</span>
                    </div>
                    <h4>Web design</h4>
                    <p>This course is about this and this. 
                      You will learn a lot. Like fedwedv
                      wfecefcfcc ewfcwf frgreo ewfw wrgl wefw
                    </p>
                  </div>
                  <button type="button" className="read-btn">View all</button>
                </div>
                {/*single post ends*/}
                {/*single post*/}
                <div className="all location">
                  <div className="post-img">
                    <img src="imagies/6.jpg" alt="post" />
                  </div>
                  <div className="post-content">
                    <div className="post-content-top">
                      <span><i className="fa-solid fa-user" />Jack Richard, Phd in IT</span>
                      <span><i className="fas fa-comment" />6</span>
                    </div>
                    <h4>Web design</h4>
                    <p>This course is about this and this. 
                      You will learn a lot. Like fedwedv
                      wfecefcfcc ewfcwf frgreo ewfw wrgl wefw
                    </p>
                  </div>
                  <button type="button" className="read-btn">View all</button>
                </div>
                {/*single post ends*/}
                {/*single post*/}
                <div className="all university">
                  <div className="post-img">
                    <img src="imagies/2.jpg" alt="post" />
                  </div>
                  <div className="post-content">
                    <div className="post-content-top">
                      <span><i className="fa-solid fa-user" />Jack Richard, Phd in IT</span>
                      <span><i className="fas fa-comment" />6</span>
                    </div>
                    <h4>Web design</h4>
                    <p>This course is about this and this. 
                      You will learn a lot. Like fedwedv
                      wfecefcfcc ewfcwf frgreo ewfw wrgl wefw
                    </p>
                  </div>
                  <button type="button" className="read-btn">View all</button>
                </div>
                {/*single post ends*/}
                {/*single post*/}
                <div className="all degree">
                  <div className="post-img">
                    <img src="imagies/1.jpg" alt="post" />
                  </div>
                  <div className="post-content">
                    <div className="post-content-top">
                      <span><i className="fa-solid fa-user" />Jack Richard, Phd in IT</span>
                      <span><i className="fas fa-comment" />6</span>
                    </div>
                    <h4>Web design</h4>
                    <p>This course is about this and this. 
                      You will learn a lot. Like fedwedv
                      wfecefcfcc ewfcwf frgreo ewfw wrgl wefw
                    </p>
                  </div>
                  <button type="button" className="read-btn">View all</button>
                </div>
                {/*single post ends*/}
                {/*single post*/}
                <div className="all location">
                  <div className="post-img">
                    <img src="imagies/4.jpg" alt="post" />
                  </div>
                  <div className="post-content">
                    <div className="post-content-top">
                      <span><i className="fa-solid fa-user" />Jack Richard, Phd in IT</span>
                      <span><i className="fas fa-comment" />6</span>
                    </div>
                    <h4>Web design</h4>
                    <p>This course is about this and this. 
                      You will learn a lot. Like fedwedv
                      wfecefcfcc ewfcwf frgreo ewfw wrgl wefw
                    </p>
                  </div>
                  <button type="button" className="read-btn">View all</button>
                </div>
                {/*single post ends*/}
                {/*single post*/}
                <div className="all university">
                  <div className="post-img">
                    <img src="imagies/5.jpg" alt="post" />
                  </div>
                  <div className="post-content">
                    <div className="post-content-top">
                      <span><i className="fa-solid fa-user" />Jack Richard, Phd in IT</span>
                      <span><i className="fas fa-comment" />6</span>
                    </div>
                    <h4>Web design</h4>
                    <p>This course is about this and this. 
                      You will learn a lot. Like fedwedv
                      wfecefcfcc ewfcwf frgreo ewfw wrgl wefw
                    </p>
                  </div>
                  <button type="button" className="read-btn">View all</button>
                </div>
                {/*single post ends*/}
                {/*single post*/}
                <div className="all degree">
                  <div className="post-img">
                    <img src="imagies/6.jpg" alt="post" />
                  </div>
                  <div className="post-content">
                    <div className="post-content-top">
                      <span><i className="fa-solid fa-user" />Jack Richard, Phd in IT</span>
                      <span><i className="fas fa-comment" />6</span>
                    </div>
                    <h4>Web design</h4>
                    <p>This course is about this and this. 
                      You will learn a lot. Like fedwedv
                      wfecefcfcc ewfcwf frgreo ewfw wrgl wefw
                    </p>
                  </div>
                  <button type="button" className="read-btn">View all</button>
                </div>
                {/*single post ends*/}
                {/*single post*/}
                <div className="all location">
                  <div className="post-img">
                    <img src="imagies/1.jpg" alt="post" />
                  </div>
                  <div className="post-content">
                    <div className="post-content-top">
                      <span><i className="fa-solid fa-user" />Jack Richard, Phd in IT</span>
                      <span><i className="fas fa-comment" />6</span>
                    </div>
                    <h4>Web design</h4>
                    <p>This course is about this and this. 
                      You will learn a lot. Like fedwedv
                      wfecefcfcc ewfcwf frgreo ewfw wrgl wefw
                    </p>
                  </div>
                  <button type="button" className="read-btn">View all</button>
                </div>
                {/*single post ends*/}
                {/*single post*/}
                <div className="all university">
                  <div className="post-img">
                    <img src="imagies/4.jpg" alt="post" />
                  </div>
                  <div className="post-content">
                    <div className="post-content-top">
                      <span><i className="fa-solid fa-user" />Jack Richard, Phd in IT</span>
                      <span><i className="fas fa-comment" />6</span>
                    </div>
                    <h4>Web design</h4>
                    <p>This course is about this and this. 
                      You will learn a lot. Like fedwedv
                      wfecefcfcc ewfcwf frgreo ewfw wrgl wefw
                    </p>
                  </div>
                  <button type="button" className="read-btn">View all</button>
                </div>
                {/*single post ends*/}
                {/*single post*/}
                <div className="all degree">
                  <div className="post-img">
                    <img src="imagies/2.jpg" alt="post" />
                  </div>
                  <div className="post-content">
                    <div className="post-content-top">
                      <span><i className="fa-solid fa-user" />Jack Richard, Phd in IT</span>
                      <span><i className="fas fa-comment" />6</span>
                    </div>
                    <h4>Web design</h4>
                    <p>This course is about this and this. 
                      You will learn a lot. Like fedwedv
                      wfecefcfcc ewfcwf frgreo ewfw wrgl wefw
                    </p>
                  </div>
                  <button type="button" className="read-btn">View all</button>
                </div>
                {/*single post ends*/}
                {/*single post*/}
                <div className="all location">
                  <div className="post-img">
                    <img src="imagies/5.jpg" alt="post" />
                  </div>
                  <div className="post-content">
                    <div className="post-content-top">
                      <span><i className="fa-solid fa-user" />Jack Richard, Phd in IT</span>
                      <span><i className="fas fa-comment" />6</span>
                    </div>
                    <h4>Web design</h4>
                    <p>This course is about this and this. 
                      You will learn a lot. Like fedwedv
                      wfecefcfcc ewfcwf frgreo ewfw wrgl wefw
                    </p>
                  </div>
                  <button type="button" className="read-btn">View all</button>
                </div>
                {/*single post ends*/}
                {/*single post*/}
                <div className="all university">
                  <div className="post-img">
                    <img src="imagies/6.jpg" alt="post" />
                  </div>
                  <div className="post-content">
                    <div className="post-content-top">
                      <span><i className="fa-solid fa-user" />Jack Richard, Phd in IT</span>
                      <span><i className="fas fa-comment" />6</span>
                    </div>
                    <h4>Web design</h4>
                    <p>This course is about this and this. 
                      You will learn a lot. Like fedwedv
                      wfecefcfcc ewfcwf frgreo ewfw wrgl wefw
                    </p>
                  </div>
                  <button type="button" className="read-btn">View all</button>
                </div>
                {/*single post ends*/}
                {/*single post*/}
                <div className="all degree">
                  <div className="post-img">
                    <img src="imagies/3.jpg" alt="post" />
                  </div>
                  <div className="post-content">
                    <div className="post-content-top">
                      <span><i className="fa-solid fa-user" />Jack Richard, Phd in IT</span>
                      <span><i className="fas fa-comment" />6</span>
                    </div>
                    <h4>Web design</h4>
                    <p>This course is about this and this. 
                      You will learn a lot. Like fedwedv
                      wfecefcfcc ewfcwf frgreo ewfw wrgl wefw
                    </p>
                  </div>
                  <button type="button" className="read-btn">View all</button>
                </div>
                {/*single post ends*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>
)