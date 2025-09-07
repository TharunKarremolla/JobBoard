import axios from "axios"
import { useEffect, useState } from "react"
import upload from './upload.png';
import styles from './profile.module.css';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;

export default function Profile() {
  const [data, setData] = useState({});
  const [bio, setBio] = useState('');
  const [file, setFile] = useState(null); // local file for upload
  const [preview, setPreview] = useState(null); // preview before upload
  const [profilePic, setProfilePic] = useState(null); // uploaded image URL from backend

  // handle file selection
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);

    if (selected) {
      setPreview(URL.createObjectURL(selected)); // local preview
    }
  };

  // fetch user data
const fetch_users = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/users/");
      setData(res.data.user);
      setBio(res.data.bio)
      if (res.data.profile_pic) {
        console.log("profile already set")
        setProfilePic(res.data.profile_pic); // set from backend
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetch_users();
  }, []);

  // upload file
  const handleUpload = async () => {
    await getCSRFToken();
    const csrfToken = Cookies.get("csrftoken");
    console.log("csrfff :", csrfToken);

    if (!file) {
      alert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const res = await axios.post("http://127.0.0.1:8000/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": csrfToken,
        },
        withCredentials: true,
      });

      console.log("Upload success:", res.data);
      setProfilePic(res.data.profile_pic); // update with uploaded pic path
      alert("Profile picture uploaded!");
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  const addBio = async() => {
    await getCSRFToken();
    const csrfToken = Cookies.get('csrftoken')
    const res = await axios.post("http://127.0.0.1:8000/addBio/",{bio},{
      withCredentials : true,
      headers : {
          "Content-Type" : "application/json",
            "X-CSRFToken": csrfToken,
      }
    })
    
  }



  // get csrf token
  const getCSRFToken = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/csrf/");
      console.log("csrf :", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.profDiv}>
      {/* Profile Picture Section */}
<div style={{ textAlign: "center", marginBottom: "20px" }}>
  <img
    src={preview ? preview : profilePic ? `http://127.0.0.1:8000${profilePic}` : upload}
    alt="Profile"
    style={{
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "2px solid #ddd"
    }}
  />
</div>


      <input type="text" value={data.username || ""} readOnly />
      <br />
      <input type="text" value={data.email || ""} readOnly />
      <br />
      <input
        type="text"
        placeholder="Bio..."
        value={bio || ""}
        onChange={(e) => setBio(e.target.value)}
      />
      <br />
      <button onClick={addBio}>Edit Bio</button>
      <br />

      <input type="file" onChange={handleFileChange} />
      <br />
      <button onClick={handleUpload}>Save</button>
    </div>
  );
}
