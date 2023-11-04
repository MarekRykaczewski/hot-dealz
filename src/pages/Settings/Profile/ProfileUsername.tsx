import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../config/firebase";
import { UserAuth } from "../../../context/AuthContext";

function ProfileUsername() {
  const { user, userData } = UserAuth();
  const [editUsername, setEditUsername] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  const handleUsernameChange = async (event: {
    preventDefault: () => void;
  }) => {
    if (!user) return;
    event.preventDefault();

    try {
      // Update the user's username in Firestore
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        username: newUsername,
      });

      // Clear input field and hide the editUsername field
      setNewUsername("");
      setEditUsername(false);

      // Show a success message to the user
      alert("Username updated successfully!");

      // Refresh the page
      location.reload();
    } catch (error) {
      console.error(error);
      alert(
        "An error occurred while updating your username. Please try again later."
      );
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between mb-10">
        <div className="flex flex-col md:mr-10">
          <span className="font-bold"> username </span>
        </div>
        <form
          onSubmit={handleUsernameChange}
          className="flex flex-col gap-4 w-full md:w-[300px]"
        >
          {!editUsername ? (
            <span className="text-blue-700"> {userData.username} </span>
          ) : (
            <input
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="border p-1 rounded-lg"
              placeholder={userData.username}
              type="text"
            />
          )}
          <div className="flex flex-col md:flex-row gap-4">
            <button
              type="button"
              onClick={() => setEditUsername(!editUsername)}
              className="self-center py-1 border rounded-2xl w-full md:w-[250px] hover:bg-gray-100 hover:text-orange-500 transition"
            >
              {editUsername ? "Cancel" : "Change Username"}
            </button>
            {editUsername && (
              <button
                type="submit"
                className="self-center py-1 border rounded-2xl w-full md:w-[250px] hover:bg-gray-100 hover:text-orange-500 transition"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileUsername;
