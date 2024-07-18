import React from 'react'
import { Link } from 'react-router-dom'

const Athlete = ({ athlete }) => {
  return (
    <Link to={`/athletes/${athlete.id}`} className="athlete__item">
            <div className="athlete__header">
                <div className="athlete__image">
                    <img src={athlete.photoUrl} alt={athlete.name}  />
                </div>
                <div className="athlete__details">
                    {/* length of name */}
                    <p className="athlete_name">{athlete.name.substring(0, 30)} </p>
                    <p className="athlete_title">{athlete.title}</p>
                </div>
            </div>
            <div className="athlete__body">
                <p><i class="bi bi-microsoft-teams"></i> Team: {athlete.team} </p>
                {/* <p><i class="bi bi-backpack"></i> {athlete.position} </p> */}
                <p><i className="bi bi-geo"></i> Points per game: {athlete.ppg}</p>
                <p><i className="bi bi-telephone"></i> Rebounds per game: {athlete.rpg}</p>
                <p>{athlete.status === 'Active' ? <i className='bi bi-check-circle'></i> : 
                    <i className='bi bi-x-circle'></i>} Assists per game: {athlete.apg}</p>
            </div>
        </Link>
  )
}

export default Athlete