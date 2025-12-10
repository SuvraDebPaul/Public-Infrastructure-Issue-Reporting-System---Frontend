import React, { useState } from "react";

/* -----------------------------------------------------
   Main Profile Component
------------------------------------------------------*/
const Profile = () => {
  // Dummy user data (replace with API data)
  const [user, setUser] = useState({
    name: "Suvra Deb Paul",
    email: "suvra@example.com",
    phone: "01712345678",
    premium: false,
    blocked: false,
    avatar: "https://via.placeholder.com/120",
  });

  const [showEdit, setShowEdit] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  /* -----------------------------------------------------
     Handle Save Profile
  ------------------------------------------------------*/
  const handleSave = () => {
    setUser(editedUser);
    setShowEdit(false);
    // TODO: axios.put("/update-profile", editedUser)
  };

  /* -----------------------------------------------------
     Handle Subscribe Payment (Dummy)
  ------------------------------------------------------*/
  const handleSubscribe = () => {
    // TODO: Integrate actual payment gateway
    alert("Redirecting to payment gateway...");

    setTimeout(() => {
      alert("Payment Success! You’re now a Premium User.");
      setUser((prev) => ({ ...prev, premium: true }));
    }, 1200);
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      {/* Blocked Banner */}
      {user.blocked && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg border border-red-300">
          ⚠️ <strong>Your account is currently blocked.</strong>
          <br />
          Please contact authorities for support.
        </div>
      )}

      {/* Profile Card */}
      <div className="border rounded-xl bg-white shadow-sm p-6 space-y-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            className="w-20 h-20 rounded-full border"
            alt="avatar"
          />

          <div>
            <h2 className="text-2xl font-semibold flex items-center gap-3">
              {user.name}

              {/* Premium Badge */}
              {user.premium && (
                <span className="px-2 py-1 bg-yellow-400 text-white text-xs font-bold rounded-full">
                  PREMIUM
                </span>
              )}
            </h2>

            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3">
          <div>
            <label className="text-gray-600">Email</label>
            <p className="font-medium">{user.email}</p>
          </div>

          <div>
            <label className="text-gray-600">Phone</label>
            <p className="font-medium">{user.phone}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          {/* Edit Button */}
          <button
            onClick={() => setShowEdit(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Edit Profile
          </button>

          {/* Subscribe Button */}
          {!user.premium && !user.blocked && (
            <button
              onClick={handleSubscribe}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Subscribe (1000৳)
            </button>
          )}
        </div>
      </div>

      {/* -----------------------------------------------------
          EDIT MODAL
      ------------------------------------------------------*/}
      {showEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg space-y-4">
            <h2 className="text-xl font-semibold">Edit Profile</h2>

            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={editedUser.name}
              onChange={(e) =>
                setEditedUser({ ...editedUser, name: e.target.value })
              }
            />

            <input
              type="email"
              className="w-full border px-3 py-2 rounded"
              value={editedUser.email}
              onChange={(e) =>
                setEditedUser({ ...editedUser, email: e.target.value })
              }
            />

            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={editedUser.phone}
              onChange={(e) =>
                setEditedUser({ ...editedUser, phone: e.target.value })
              }
            />

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowEdit(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
