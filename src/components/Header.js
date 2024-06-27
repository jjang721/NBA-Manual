import React from 'react'
import '../index.css';

const Header = ({toggleModal, numberOfAthletes}) => {
  return (
    <header className='header'>
        <div className='container'>
            <button className = 'btn'>Athlete List ({numberOfAthletes})</button>
            <p className='bruh'>hi</p>
            <button onClick={() => toggleModal(true)} className='btn'>
                <i class='bi-plus-square'></i>
                Add New Player
            </button>
        </div>
    </header>
  )
}

export default Header
