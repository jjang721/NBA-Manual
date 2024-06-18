import React from 'react'

const Header = ({toggleModal, numberOfAthletes}) => {
  return (
    <header className='header'>
        <div className='container'>
            <h3>Athlete List ({numberOfAthletes})</h3>
            <button onClick={() => toggleModal(true)} className='btn'>
                <i className='bi bi-plus-quare'></i>
                Add New Rookie
            </button>
        </div>
    </header>
  )
}

export default Header
