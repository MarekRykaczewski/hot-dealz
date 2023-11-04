import { updateEmail } from "firebase/auth";
import { FormEvent, useState } from "react";
import { UserAuth } from "../../../context/AuthContext";

function ProfileEmail() {
  const { user: authUser } = UserAuth();
  const [editEmail, setEditEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      // Update email in Firebase Authentication
      if (authUser) {
        await updateEmail(authUser, newEmail);
      }

      // Clear input field
      setNewEmail("");

      // Hide editEmail
      setEditEmail(false);

      // Show success message to user
      alert("Email updated successfully!");

      // Refresh page
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between mb-10">
      <div className="flex flex-col md:mr-10">
        <span className="font-bold">e-mail</span>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full md:w-[300px]"
      >
        {!editEmail ? (
          <span className="text-blue-700">{authUser?.email}</span>
        ) : (
          <input
            onChange={(e) => setNewEmail(e.target.value)}
            className="border p-1 rounded-lg"
            placeholder={authUser?.email!}
            type="text"
            name=""
            id=""
          />
        )}
        <div className="flex flex-col md:flex-row gap-4">
          <button
            type="button"
            onClick={() => setEditEmail(!editEmail)}
            className="self-center py-1 border rounded-2xl w-full md:w-[250px] hover:bg-gray-100 hover:text-orange-500 transition"
          >
            {editEmail ? "Cancel" : "Change Email"}
          </button>
          {editEmail && (
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
  );
}

export default ProfileEmail;
