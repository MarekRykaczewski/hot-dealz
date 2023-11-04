import { updatePassword } from "firebase/auth";
import { FormEvent, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { auth } from "../../../config/firebase";

function ProfilePassword() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [editPassword, setEditPassword] = useState(false);
  const [newPassword, setNewPassword] = useState<string | undefined>();
  const [newConfirmPassword, setNewConfirmPassword] = useState<
    string | undefined
  >();

  const submitData: SubmitHandler<FieldValues> = async () => {
    try {
      // Update password in Firebase Authentication
      if (auth.currentUser && newPassword) {
        await updatePassword(auth.currentUser, newPassword);
      }

      // Clear input fields
      setNewPassword(undefined);
      setNewConfirmPassword(undefined);

      // Hide editPassword
      setEditPassword(false);

      // Show success message to the user
      alert("Password updated successfully!");

      // Refresh the page
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between mb-10">
      <div className="flex flex-col md:mr-10">
        <span className="font-bold">password</span>
      </div>
      <form
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          handleSubmit(submitData)();
        }}
        className="flex flex-col gap-4 w-full md:w-[300px]"
      >
        {!editPassword ? (
          <span className="text-blue-700">...</span>
        ) : (
          <div className="flex flex-col gap-1">
            <input
              {...register("password", {
                required: true,
              })}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border p-1 rounded-lg"
              placeholder="New password"
              type="password"
            />
            <input
              {...register("confirm_password", {
                required: true,
                validate: (val) => {
                  if (watch("password") !== val) {
                    return "Your passwords do not match";
                  }
                },
              })}
              onChange={(e) => setNewConfirmPassword(e.target.value)}
              className="border p-1 rounded-lg"
              placeholder="Confirm new password"
              type="password"
            />
            <span className="text-sm text-red-500 mt-1">
              {errors.confirm_password?.message}
            </span>
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-4">
          <button
            type="button"
            onClick={() => setEditPassword(!editPassword)}
            className="self-center py-1 border rounded-2xl w-full md:w-[250px] hover:bg-gray-100 hover:text-orange-500 transition"
          >
            {editPassword ? "Cancel" : "Change Password"}
          </button>
          {editPassword && (
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

export default ProfilePassword;
