import React, { useState, useEffect } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt } from '@fortawesome/free-solid-svg-icons'

const PopUpContent = styled.div`
  background-color: #000;
  border: 1px solid #007bff;
  position: fixed;
  bottom: 70px;
  right: 20px;
  padding: 10px;
  max-width: 300px;
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s; /* Add animation for popup */
  /* Make the content scrollable */
  max-height: 500px; /* Adjust the maximum height as needed */
  overflow: auto; /* Enable vertical scrolling if content exceeds the max height */

  /* Style the scrollbar */
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: #007bff #000; /* Firefox */
  &::-webkit-scrollbar {
    width: 7px; /* Width of the scrollbar */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #007bff; /* Color of the scrollbar thumb */
    border-radius: 0px; /* Rounded corners for the thumb */
  }
  ul {
    list-style: disc; /* Style for unordered lists (bulleted) */
    padding-left: 20px; /* Adjust the left padding as needed */

    li {
      margin: 5px 0; /* Adjust the margin between list items */
      color: #fff; /* Text color for list items */
    }
`

const ToggleButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 20px;
  right: 20px;
  transition: all 0.3s; /* Add a smooth transition */
  z-index: 999; /* Ensure the button is above other content */
  &::after {
    content: ' Upcoming CTF'; /* Initially show the "+" and "Upcoming" text */
    display: none; /* Hide the text */
  }
  &:hover {
    width: 200px; /* Expand the button width on hover */
    
    border-radius: 2%;
    &::after {
      display: block; /* Show the text on hover */
      transition: opacity 0.3s; /* Add a smooth fade-in animation for the text */
      opacity: 1; /* Make the text fully visible */
    }
  }
`

const MinimizeButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 8px 10px;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  line-height: 0;
`
const UpcomingContestsPopup = ({ isVisible, upcomingContests, toggleContentVisibility }) => {
  return (
    <div>
    <ToggleButton onClick={toggleContentVisibility}>  <FontAwesomeIcon icon={faBolt} />
</ToggleButton>
    <PopUpContent isVisible={isVisible}>
    <MinimizeButton onClick={toggleContentVisibility}>-</MinimizeButton>

      {upcomingContests.length > 0
        ? (
        <div>
          {upcomingContests.slice(0, 10).map((contest) => (
            <div key={contest.id}>
              <h5>
                <a href={contest.url} target="_blank" rel="noopener noreferrer">
                  {contest.title}
                </a>
              </h5>
              <p>Start: {moment(contest.start).format('D MMMM YYYY')}</p>
              <p>Format: {contest.format}</p>
              <hr />
            </div>
          ))}
        </div>
          )
        : (
        <p>No upcoming contests available.</p>
          )}
    </PopUpContent></div>
  )
}

export default UpcomingContestsPopup
