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
      <div className="course-card">
        <div className="tutor-pp">
          <img src="imagies/1.jpg" alt="profile picture" />
        </div>
        <div className="tutor-info">
          <div className="tutor-info-top">
            <span><i className="fa-solid fa-user" />Jack Richard, Phd in IT</span>
            <span><i className="fas fa-comment" />6</span>
          </div>
          <h4>Web design</h4>
          <p>This course is about this and this. 
            You will learn a lot. Like fedwedv
            wfecefcfcc ewfcwf frgreo ewfw wrgl wefw
            This course is about this and this. 
            You will learn a lot. Like fedwedv
            wfecefcfcc ewfcwf frgreo ewfw wrgl wefw
            This course is about this and this. 
            You will learn a lot. Like fedwedv
            wfecefcfcc ewfcwf frgreo ewfw wrgl wefw
            This course is about this and this. 
            You will learn a lot. Like fedwedv
            wfecefcfcc ewfcwf frgreo ewfw wrgl wefw
          </p>
          <span className="price">$10 per hour</span>
        </div>
        <div className="buttons">
          <button type="button">Add to favorite</button>
          <button type="button">Contact the tutor</button>
        </div>
      </div>
    </main>
  </div>
</div>

)