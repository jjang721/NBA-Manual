import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getAthlete, deleteAthlete } from '../api/AthleteService';


const AthleteInfo = ({ updateAthlete, updateImage }) => {
    const inputRef = useRef();
    const [athlete, setAthlete] = useState({
        id: '',
        name: '',
        team: '',
        position: '',
        ppg: '',
        rpg: '',
        apg: '',
        photoUrl: '',

    });

    const { id } = useParams();

    const fetchAthlete = async (id) => {
        try {
            const { data } = await getAthlete(id);
            setAthlete(data);

        } catch (error) {
            console.log(error);
        }
    };
    const handleDeleteAthlete = async (id) => {
        try {
            await deleteAthlete(id);
            // console.log(response.data);
            // Optionally perform additional actions after successful deletion
        } catch (error) {
            console.error('Error deleting athlete:', error);
            // Handle error if needed
        }
    };


    const selectImage = () => {
        inputRef.current.click();

    };
    const updatePhoto = async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file, file.name);
            formData.append('id', id);
            await updateImage(formData);
            setAthlete((prev) => ({ ...prev, photoUrl: `${prev.photoUrl}&updated_at=${new Date().getTime()}` }));

        } catch (error) {
            console.log(error);
        }

    };
    const onChange = (event) => {
        setAthlete({ ...athlete, [event.target.name]: event.target.value });
    };

    const onUpdateAthlete = async (event) => {
        event.preventDefault();
        await updateAthlete(athlete);        
        fetchAthlete(id);
        //toastSuccess('Contact Updated');
    };

    useEffect(() => {
        fetchAthlete(id);
    }, []);

    return (
        <>
            <Link to={'/athletes'} className='link'><i className='bi bi-arrow-left'></i> Back to athletes</Link>
            <div className='profile'>
                <div className='profile__details'>
                    <img src={athlete.photoUrl} alt={`Image of ${athlete.name}`} />
                    <div className='profile_metadata'>
                        <p className='profile__name'>{athlete.name}</p>
                        <p className='profile__muted'></p>
                        <button onClick={selectImage} className='btn'> Change photo</button>
                    </div>

                </div>
                <div className='profile__settings'>
                    <div>
                        <form onSubmit={onUpdateAthlete} className="form">
                            <div className="user-details">
                                <input type="hidden" defaultValue={athlete.id} name="id" required />
                                <div className="input-box">
                                    <span className="details">Name</span>
                                    <input type="text" value={athlete.name} onChange={onChange} name="name" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Team</span>
                                    <input type="text" value={athlete.team} onChange={onChange} name="team" required />
                                </div>
                                {/* <div className="input-box">
                                    <span className="details">Position</span>
                                    <input type="text" value={athlete.position} onChange={onChange} name="position" required />
                                </div> */}
                                <div className="input-box">
                                    <span className="details">PPG</span>
                                    <input type="text" value={athlete.ppg} onChange={onChange} name="ppg" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">RPG</span>
                                    <input type="text" value={athlete.rpg} onChange={onChange} name="rpg" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">APG</span>
                                    <input type="text" value={athlete.apg} onChange={onChange} name="apg" required />
                                </div>
                            </div>
                            <div className="form_footer">
                                <button type="submit" className="btn">Save</button>
                                 <button onClick={handleDeleteAthlete} className="btn">Delete</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <form style={{ display: 'none' }}>
                <input type='file' ref={inputRef} onChange={(event) => updatePhoto(event.target.files[0])}
                    name='file' accept='image/*' />
            </form>
    </>
  )
}

export default AthleteInfo
