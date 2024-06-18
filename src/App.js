import { useEffect, useRef, useState } from 'react';
import './App.css';
import Header from './components/Header';
import AthleteList from './components/AthleteList';
import AthleteInfo from './components/AthleteInfo';
import { getAthletes, saveAthlete, updatePhoto } from './api/AthleteService';
import { Routes, Route, Navigate } from 'react-router-dom';
import { toastError } from './api/ToastService';
import { ToastContainer } from 'react-toastify';



function App() {
  const modalRef = useRef();
  const fileRef = useRef();
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [file, setFile] = useState(undefined);
  const [values, setValues] = useState({
    id: '',
    name: '',
    team: '',
    position: '',
    ppg: '',
    rpg: '',
    apg: '',

  });


  const getAllAthletes = async (page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const { data } = await getAthletes(page, size);
      setData(data);

    } catch (error) {
      console.log(error);
    }
  };

  const updateAthlete = async (athlete) => {
    try {
      const { data } = await saveAthlete(athlete);
      console.log(data);

    } catch (error) {
      console.log(error);
    }
  };
  const updateImage = async (formData) => {
    try {
      const { data: photoUrl } = await updatePhoto(formData);
    
    } catch (error) {
      console.log(error);
    }
   
  };
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    console.log(values);
  };

  const handleNewAthlete = async (event) => {
    event.preventDefault(); //to prevent refreshing a page
    try {
      const { data } = await saveAthlete(values);
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('id', data.id);
      const { data: photoUrl } = await updatePhoto(formData);
      toggleModal(false);
      setFile(undefined);
      fileRef.current.value = null;
      setValues({
        id: '',
        name: '',
        team: '',
        position: '',
        ppg: '',
        rpg: '',
        apg: '',
      })
      getAllAthletes();
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };


  const toggleModal = show => show ? modalRef.current.showModal() : modalRef.current.close();

  useEffect(() => {
    getAllAthletes();
  }, []);

  return (
    <>
    <Header toggleModal={toggleModal} numberOfAthletes={data.totalElements}/>
      <main className='main'>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Navigate to={'/athletes'} />} />
            <Route path="/athletes" element={<AthleteList data={data} currentPage={currentPage}
              getAllAthletes={getAllAthletes} />} />
            <Route path="/athletes/:id" element={<AthleteInfo updateAthlete={updateAthlete} updateImage={updateImage}
              />} />
          </Routes>
        </div>
      </main>

    {/* Modal */}
    <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>New Contact</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={handleNewAthlete}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Name</span>
                <input type="text" value={values.name} onChange={onChange} name='name' required />
              </div>
              <div className="input-box">
                <span className="details">Team</span>
                <input type="text" value={values.team} onChange={onChange} name='team' required />
              </div>
              <div className="input-box">
                <span className="details">Position</span>
                <input type="text" value={values.position} onChange={onChange} name='position' required />
              </div>
              <div className="input-box">
                <span className="details">PPG</span>
                <input type="text" value={values.ppg} onChange={onChange} name='ppg' required />
              </div>
              <div className="input-box">
                <span className="details">RPG</span>
                <input type="text" value={values.rpg} onChange={onChange} name='rpg' required />
              </div>
              <div className="input-box">
                <span className="details">APG</span>
                <input type="text" value={values.apg} onChange={onChange} name='apg' required />
              </div>
              <div className="file-input">
                <span className="details">Profile Photo</span>
                <input type="file" onChange={(event) => setFile(event.target.files[0])} ref={fileRef} name='photo' required />
              </div>
            </div>
            <div className="form_footer">
              <button onClick={() => toggleModal(false)} type='button' className="btn btn-danger">Cancel</button>
              <button type='submit' className="btn">Save</button>
            </div>
          </form>
        </div>
      </dialog>
      <ToastContainer />
    </>


  );
}

export default App;
