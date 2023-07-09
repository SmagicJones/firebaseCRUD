import { useState, useEffect } from "react";
import Header from "./components/Header";
import { Auth } from "./components/auth";
import { db, auth, storage } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import "./App.css";

import { ref, uploadBytes } from "firebase/storage";

function App() {
  const [movieList, setMovieList] = useState([]);

  // new movie states

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieAward, setIsNewMovieAward] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedReleaseDate, setUpdatedReleaseDate] = useState(0);

  const moviesCollectionRef = collection(db, "movies");

  // file upload states
  const [fileUpload, setFileUpload] = useState(null);

  const getMovieList = async () => {
    // read data from db and set movielist
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAward: isNewMovieAward,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    try {
      await deleteDoc(movieDoc);
    } catch (err) {
      console.error(err);
    }
  };

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    try {
      await updateDoc(movieDoc, { title: updatedTitle });
    } catch (err) {
      console.error(err);
    }
  };

  const updateReleaseDate = async (id) => {
    const movieDoc = doc(db, "movies", id);
    try {
      await updateDoc(movieDoc, { releaseDate: updatedReleaseDate });
    } catch (err) {
      console.error(err);
    }
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch(err){
      console.error(err)
    }
  };

  return (
    <>
      <Header />
      <Auth />
      <div>
        <h2>Add a movie</h2>
        <label htmlFor="movieTitle">Movie Title: </label>
        <input
          id="movieTitle"
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <label htmlFor="releaseDate">Release Date: </label>
        <input
          id="releaseDate"
          type="number"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <label htmlFor="receivedAward">Received Award: </label>
        <input
          id="receivedAward"
          type="checkbox"
          checked={isNewMovieAward}
          onChange={(e) => setIsNewMovieAward(e.target.checked)}
        />
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {movieList.map((movie) => (
          <div>
            <h1
              key={movie.title}
              style={{ color: movie.receivedAward ? "green" : "red" }}
            >
              {movie.title}
            </h1>
            <p>Date: {movie.releaseDate}</p>
            <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

            <label htmlFor="update-title">New Title: </label>
            <input
              id="update-title"
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateMovieTitle(movie.id)}>
              Update Title
            </button>

            <label htmlFor="updateReleaseDate">Update Release Date: </label>
            <input
              id="updateReleaseDate"
              type="number"
              onChange={(e) => setUpdatedReleaseDate(e.target.value)}
            />
            <button onClick={() => updateReleaseDate(movie.id)}>
              Update release date
            </button>
          </div>
        ))}
      </div>
      <div>
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}>Upload file</button>
      </div>
    </>
  );
}

export default App;
