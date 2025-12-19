import { useState } from "react";
import useRole from "../../Hooks/useRole";
import LoadingSpinner from "../../Util/LoadingSpinner";
import BoostModal from "../../Components/Modal/BoostModal";
import Swal from "sweetalert2";
import axios from "axios";
import EditUserModal from "../../Components/Modal/EditUserModal";
import { useQuery } from "@tanstack/react-query";
import InvoiceModal from "../../Components/Modal/InvoiceModal";

/* -----------------------------------------------------
   Main Profile Component
------------------------------------------------------*/
const Profile = () => {
  const [userData, isRoleLoading] = useRole();
  const [selectedPayment, setSelectedPayment] = useState(null);
  let [isEditUserOpen, setIsEditUserOpen] = useState(false);

  const { _id: id, name, email, image, isPremium, isBlocked, role } = userData;

  /* -----------------------------------------------------
     Handle Edit Profile
  ------------------------------------------------------*/
  const closeEditUserModal = () => {
    setIsEditUserOpen(false);
  };
  /* -----------------------------------------------------
     Handle Subscribe Payment 
  ------------------------------------------------------*/

  const handleSubscribe = () => {
    Swal.fire({
      title: "Please Pay $1000 ",
      text: "For Subscription",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Proceed To Pay",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const paymentInfo = {
          type: "subscribe",
          userId: id,
          name,
          email,
          image,
          role,
        };
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/create-checkout-session`,
          paymentInfo
        );
        window.location.href = data.url;
      }
    });
  };

  const { isPending, data: allPayments = [] } = useQuery({
    queryKey: ["allPayment", email],
    queryFn: async () => {
      const result = await axios(
        `${import.meta.env.VITE_API_URL}/payments/${email}`
      );
      return result.data;
    },
  });
  console.log(allPayments);
  const totalPayment = allPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );
  if (isPending || isRoleLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 space-y-6 w-full mx-auto">
      {/* Blocked Banner */}
      {isBlocked && (
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
            src={image}
            className="w-20 h-20 rounded-full border"
            alt="avatar"
          />

          <div>
            <h2 className="text-2xl font-semibold flex items-center gap-3">
              {name}

              {/* Premium Badge */}
              {isPremium && (
                <span className="px-2 py-1 bg-amber-600 text-white text-xs font-bold rounded-md">
                  PREMIUM
                </span>
              )}
            </h2>

            <p className="text-gray-600">{email}</p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3">
          <div>
            <label className="text-gray-600">Email</label>
            <p className="font-medium">{email}</p>
          </div>

          <div>
            <label className="text-gray-600">Role</label>
            <p className="font-medium capitalize ">{role}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          {/* Edit Button */}
          <button
            onClick={() => setIsEditUserOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Edit Profile
          </button>

          {/* Subscribe Button */}
          {!isPremium && !isBlocked && (
            <button
              onClick={handleSubscribe}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Subscribe (1000৳)
            </button>
          )}
        </div>
      </div>
      {/* TABLE */}
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Tranx Id</th>
              <th>Paid By</th>
              <th>Payment For</th>
              <th>Amount</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {allPayments.map((payment, i) => (
              <tr key={payment._id}>
                <th>{i + 1}</th>
                <td>{payment.transectionId}</td>
                <td className="lowercase">{payment.paidBy}</td>
                <td className="capitalize">{payment.paymentType}</td>
                <td>{payment.amount}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline"
                    onClick={() => setSelectedPayment(payment)}
                  >
                    View Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th>Total Payments:</th>
              <th>{totalPayment}</th>
            </tr>
          </tfoot>
        </table>
      </div>
      {/* -----------------------------------------------------
          EDIT MODAL
      ------------------------------------------------------*/}
      <EditUserModal
        closeModal={closeEditUserModal}
        isOpen={isEditUserOpen}
        userData={userData}
      />

      {selectedPayment && (
        <InvoiceModal
          payment={selectedPayment}
          onClose={() => setSelectedPayment(null)}
        />
      )}
    </div>
  );
};

export default Profile;
