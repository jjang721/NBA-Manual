import React from 'react'
import Athlete from './Athlete'

const AthleteList = ({ data,currentPage,getAllAthletes}) => {
  return (
    <main className='main'>
        {data?.content?.length === 0 && <div>No athletes yet...</div>}
        <ul className='athlete__list'>
            {data?.content?.length > 0 && data.content.map(athlete => 
            <Athlete athlete={athlete} key={athlete.id} />)}
        </ul>

        {data?.content?.length > 0 && data?.totalPages > 1 &&
        <div className='pagination'>
            <a onClick={() => getAllAthletes(currentPage - 1)} className={0 === currentPage ? 'disabled' : ''}>
                &laquo;
            </a>
            { data && [...Array(data.totalPages).keys()].map((page,index) => 
            <a onClick={() => getAllAthletes(page)} className={currentPage === page ? 'active' : ''} key = {page}>{page + 1}</a>)}
            <a onClick={() => getAllAthletes(currentPage + 1)} className={data.totalPages === currentPage + 1 ? 'disabled' : ''}>
                &raquo;
            </a>
        </div>
        
        }

    </main>
  )
}

export default AthleteList
