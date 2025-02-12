import { Camera, Mail, Pen, User } from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

export default function ProfilePage() {
  const { updateProfile, isUpdatingProfile, authUser } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const [nameChange, setNameChange] = useState(authUser?.fullName || "");
  const [editName, setEditName] = useState(false);

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const imgData = reader.result;
      setSelectedImg(imgData);
      await updateProfile({ profilePic: imgData });
    };
  }


  function onChangeName(e) {
    const {value} = e.target;
    setNameChange(value);
  }

  async function saveChangeProfile() {
    try {
     
      await updateProfile({ fullName: nameChange  });
    } catch (error) {
      console.log(error);
    } finally{
      setEditName(false);
    }
  }

  function handleClickName() {
    setEditName((prev) => !prev);
  }

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>
          {/* {avatar upload section} */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/image/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover  "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${
                    isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                  }
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2 ">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <div className="relative">
                <input
                  value={nameChange}
                  onChange={onChangeName}
                  disabled={!editName}
                  placeholder={authUser?.fullName}
                  type="text"
                  className="px-4 input w-full py-2.5 bg-base-200 rounded-lg border"
                />
                <div
                  onClick={handleClickName}
                  className="absolute inset-y-0 right-0 flex justify-center items-center pr-2 cursor-pointer hover:scale-105 transition-all"
                >
                  <Pen className="w-4 h-4 text-zinc-400" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 input w-full py-2.5 bg-base-200 rounded-lg border">
                {authUser?.email}
              </p>
            </div>
            <button onClick={saveChangeProfile} className="btn btn-primary w-full">Save changes</button>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
