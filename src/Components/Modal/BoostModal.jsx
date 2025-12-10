import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";

const BoostModal = ({ closeModal, isOpen, issue }) => {
  const { user } = useAuth();
  const { email, displayName } = user;
  const {
    _id: id,
    tittle,
    category,
    location,
    priority,
    boosted,
    boostPaidBy,
    image,
    description,
  } = issue;
  const handlePayment = async () => {
    const paymentInfo = {
      id,
      tittle,
      category,
      location,
      image,
      priority,
      boosted,
      boostPaidBy,
      email,
      displayName,
      description,
    };
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/create-checkout-session`,
      paymentInfo
    );
    window.location.href = data.url;
    console.log(data.url);
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none "
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
          >
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-center leading-6 text-gray-900"
            >
              Please Confirm Your Payment For Boosting The Priority Of $100
            </DialogTitle>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Issue: {issue.tittle}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Category: {issue.category}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Location: {issue.location}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">Price: $ 100</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Upvaote Counts: {issue.upvotes}
              </p>
            </div>
            <div className="flex mt-2 justify-around">
              <button
                type="button"
                className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                onClick={handlePayment}
              >
                Pay
              </button>
              <button
                type="button"
                className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default BoostModal;
