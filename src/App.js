import { useState } from 'react';
import './App.css';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCor0T-Q5ZovS59WNJMO4eV50lMYB97JgU",
  authDomain: "counter-quicksell.firebaseapp.com",
  projectId: "counter-quicksell", 
  storageBucket: "counter-quicksell.appspot.com",
  messagingSenderId: "905168739659",
  appId: "1:905168739659:web:2fdf2bd2defb1b20009cce"
  };
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

function App() {
  const [image, setImage] = useState('');
  const [imgurl, setImgurl] = useState(''); 
  const fileSelectedHandler = (e) => {
    setImage(e.target.files[0])
  }

  
  const fileUploadHandler = () => {

      const name="123"+Date.now();
  
      // make ref to your firebase storage and select images folder
      const storageRef = storage.ref('/images/'+ name);
  
      // put file to firebase 
      const uploadTask = storageRef.put(image);
  
      // all working for progress bar that in html
      // to indicate image uploading... report
      uploadTask.on('state_changed', function(snapshot){
        const progress = 
         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          const uploader = document.getElementById('uploader');
          uploader.value=progress;
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING:
              console.log('Upload is running');
              break;
          }
      }, function(error) {console.log(error);
      }, function () {
  
           // get the uploaded image url back
           uploadTask.snapshot.ref.getDownloadURL().then(
            function (downloadURL) {
            console.log('File available at', downloadURL);
            setImgurl(downloadURL);  
           console.log(downloadURL);
          document.getElementById('submit_link').removeAttribute('disabled');
        });
      });
  } 

  return (
    <div className='home-page'>
      {/* <div>Upload Percentage - <span id='uploader'></span></div> */}
      <br/>

      <label className='image-label' for="avatar">Upload an image:</label>
      <input type="file"
       id="avatar" name="avatar"
       accept="image/png, image/jpeg" 
       onChange={fileSelectedHandler} />
       <button id='submit_link' onClick={fileUploadHandler}>Upload</button>
       {  imgurl &&
        <img className='image-preview' src={imgurl} alt="img" />
       }
    </div>
  );
}

export default App;
