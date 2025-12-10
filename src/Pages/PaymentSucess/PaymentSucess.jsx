import axios from "axios";
import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import BoxContainer from "../../Util/BoxContainer";
import { FaMoneyCheckAlt } from "react-icons/fa";

const PaymentSucess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axios.post(`${import.meta.env.VITE_API_URL}/payment/success`, {
        sessionId,
      });
    }
  }, [sessionId]);

  return (
    <BoxContainer className="flex items-center justify-center h-screen">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body items-center text-center space-y-6">
          <FaMoneyCheckAlt size={100} color="green" />
          <h2 className="card-title text-3xl">Payment Received</h2>
          <div className="card-actions">
            <Link className="btn btn-success">Go To Boost History</Link>
          </div>
        </div>
      </div>
    </BoxContainer>
  );
};

export default PaymentSucess;
