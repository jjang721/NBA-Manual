import React from 'react'
import '../index.css';
import 'animate.css'

const Header = ({toggleModal, numberOfAthletes}) => {
  return (
    <header className='header'>
        <div className='container'>
            <div className = 'list_left'>Athlete List ({numberOfAthletes})</div>
            <p className='bruh'>Welcome to the NBA Learner's Manual!</p>
            <button className = 'btn'>ML model</button>
            <button onClick={() => toggleModal(true)} className='btn'>
                <i class='bi-plus-square'></i>
                Add New Player
            </button>
        </div>
    </header>
  )
}

export default Header
