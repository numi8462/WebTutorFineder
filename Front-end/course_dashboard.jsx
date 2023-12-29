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
          <a href="course_dashboard.html" className="active"><span className="fa-solid fa-list-check" />
            <span>My Courses</span></a>
        </li>
        <li>
          <a href="category.html"><span className="fa-solid fa-magnifying-glass" />
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
          My courses
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
      <div className="cards">
        <div className="card-single">
          <div>
            <h1>3</h1>
            <span>Completed</span>
          </div>
          <div>
            <span className="fa-solid fa-check" />
          </div>
        </div>
        <div className="card-single">
          <div>
            <h1>2</h1>
            <span>in progress</span>
          </div>
          <div>
            <span className="fa-solid fa-fire" />
          </div>
        </div>
        <div className="card-single">
          <div>
            <h1>5</h1>
            <span>Totally</span>
          </div>
          <div>
            <span className="fa-solid fa-thumbtack" />
          </div>
        </div>
      </div>
      <div className="recent-flex">
        <div className="courses">
          <div className="card">
            <div className="card-header">
              <h3>Your courses</h3>
              <button>See all <span className="fa-solid fa-chevron-down" /></button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table width="100%">
                  <thead>
                    <tr>
                      <td>Course title</td>
                      <td>Area</td>
                      <td>Status</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><a href="course_page.html">Spanish laguage</a></td>
                      <td>Foreign language</td>
                      <td>
                        <span className="status" />
                        review
                      </td>
                    </tr>
                    <tr>
                      <td><a href="course_page.html">Intro to IT</a></td>
                      <td>Frontend</td>
                      <td>
                        <span className="status" />
                        in progress
                      </td>
                    </tr>
                    <tr>
                      <td><a href="course_page.html">UI/UX design</a></td>
                      <td>UI team</td>
                      <td>
                        <span className="status" />
                        pending
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>
)