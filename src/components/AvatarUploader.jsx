import React, { useState } from 'react';
import axios from 'axios';

const AvatarUploader = ({ userId, onUpload }) => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('avatar', file);

    try {
      const res = await axios.post('http://localhost:5000/users/upload-avatar', formData);
      alert('Upload successful');
      if (onUpload) onUpload(res.data.avatarUrl);
    } catch (err) {
      alert('Upload failed');
      console.error(err);
    }
  };

  return (
    <div className="mt-4">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
      >
        Upload Avatar
      </button>
    </div>
  );
};

export default AvatarUploader;
