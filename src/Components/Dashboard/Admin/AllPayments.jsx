import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../Util/LoadingSpinner";

const AllPayments = () => {
  const axiosSecure = useAxiosSecure();
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
  const totalPayment = allPayments.reduce((sum, payment) => {
    return sum + payment.amount;
  }, 0);

  const sortedPayments = [...allPayments].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  // console.log(allPayments);
  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm m-2 p-2">
        <div className="p-4">
          <h3 className="text-2xl font-bold mb-3"> All Payments</h3>
          <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>SL No.</th>
                  <th>Tranx Id</th>
                  <th>Paid By</th>
                  <th>Payment For</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {sortedPayments.map((payment, i) => (
                  <tr key={payment._id}>
                    <th>{i + 1}</th>
                    <td className="capitalize">{payment.transectionId}</td>
                    <td className="lowercase">{payment.paidBy}</td>
                    <td className="capitalize">{payment.paymentType}</td>
                    <td className="capitalize">{payment.amount}</td>
                  </tr>
                ))}
              </tbody>
              <tbody>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>Total Payments:</th>
                  <th>{totalPayment}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllPayments;
