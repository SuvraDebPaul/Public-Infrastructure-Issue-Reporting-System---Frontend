import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Util/LoadingSpinner";
import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "../Shared/Invoice/InvoicePDF";
import InvoiceModal from "../../Modal/InvoiceModal";

const AllPayments = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentType, setPaymentType] = useState("");
  const [month, setMonth] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  const { isLoading, data: allPayments = [] } = useQuery({
    queryKey: ["all-payments"],
    queryFn: async () => {
      const result = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/payments`
      );
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // FILTER LOGIC
  const filteredPayments = allPayments
    .filter((p) => (paymentType ? p.paymentType === paymentType : true))
    .filter((p) =>
      month ? new Date(p.createdAt).getMonth() + 1 === Number(month) : true
    )
    .filter((p) =>
      searchEmail
        ? p.paidBy.toLowerCase().includes(searchEmail.toLowerCase())
        : true
    );

  const sortedPayments = [...filteredPayments].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const totalPayment = filteredPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0
  );

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm m-2 p-2">
        <div className="p-4">
          <h3 className="text-2xl font-bold mb-3">All Payments</h3>

          {/* FILTERS */}
          <div className="flex gap-4 mb-4">
            {/* Payment Type Filter */}
            <select
              className="select select-bordered"
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="subscribe">Subscription</option>
              <option value="boost">Boost</option>
            </select>

            {/* Month Filter */}
            <select
              className="select select-bordered"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="">All Months</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("en", { month: "long" })}
                </option>
              ))}
            </select>

            {/* Search by Email */}
            <input
              type="text"
              placeholder="Search by email"
              className="input input-bordered"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
            />
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
                {sortedPayments.map((payment, i) => (
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
        </div>
      </div>
      {selectedPayment && (
        <InvoiceModal
          payment={selectedPayment}
          onClose={() => setSelectedPayment(null)}
        />
      )}
    </>
  );
};

export default AllPayments;
