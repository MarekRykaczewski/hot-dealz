import React, { useState } from 'react';
import { AiFillWarning } from 'react-icons/ai';
import { UserAuth } from '../../../context/AuthContext';
import Modal from '../../../components/Modal';

function ProfileConfirmDeleteModal({ open, onClose }) {
  const { userData } = UserAuth();
  const [confirmationInput, setConfirmationInput] = useState('');

  const handleChanges = (e) => {
    setConfirmationInput(e.target.value);
  }

  return (
    <Modal open={open} onClose={onClose}>
			<div className="bg-red-100 w-full h-full p-6 rounded-xl">
				<div className="flex items-center gap-3 mb-4">
					<AiFillWarning className="text-red-700" size={28} />
					<h1 className="text-red-700 text-xl font-bold">Delete your account?</h1>
				</div>
				<span className="text-red-700 font-medium text-md">Doing so will permanently delete this account</span>
				</div>
				<div className="flex flex-col mt-5">
					<span className="mb-4">Confirm you want to delete this account by typing your username: <b> {userData.username} </b> </span>
					<input onChange={(e) => handleChanges(e)} className="border self-start p-1 w-80 mb-4" type="text" placeholder={userData.username} />
				<div className="self-center w-full flex gap-3 justify-between">
					<button onClick={onClose} className="py-1 border rounded-2xl w-[250px] hover:bg-gray-100">Cancel</button>
					<button disabled={confirmationInput === userData.username ? true : false} className={`${confirmationInput !== userData.username ? 'bg-gray-300 hover:bg-gray-300 text-gray-500' : 'text-red-700 border border-red-700'} py-1  rounded-2xl w-[250px] hover:bg-red-100 transition-all duration-300`}>Delete</button>
				</div>
			</div>
    </Modal>
  );
}

export default ProfileConfirmDeleteModal;
