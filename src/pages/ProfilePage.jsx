import React, { useContext } from 'react';
import AvatarUploader from '../components/AvatarUploader';
import { AuthContext } from '../context/AuthContext';


const res = await axios.post(`${import.meta.env.VITE_API_URL}/users/upload-avatar`, formData);
const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  const handleAvatarUploaded = (newUrl) => {
    console.log('Avatar uploaded:', newUrl);
    // You can update avatar state if needed
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Upload Profile Picture</h2>
      <AvatarUploader userId={user?.id} onUpload={handleAvatarUploaded} />
    </div>
  );
};

export default ProfilePage;
