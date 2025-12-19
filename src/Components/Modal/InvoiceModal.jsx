// InvoiceModal.jsx
import React from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "../../Components/Dashboard/Shared/Invoice/InvoicePDF";

const InvoiceModal = ({ payment, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-end">
      <div className="bg-white rounded-lg p-4 w-3/4 h-3/4 flex flex-col">
        <h2 className="text-xl font-bold mb-2">Invoice Preview</h2>

        {/* PDF Preview */}
        <div className="flex-1 border">
          <PDFViewer width="100%" height="100%">
            <InvoicePDF payment={payment} />
          </PDFViewer>
        </div>

        {/* Download Button */}
        <div className="mt-4 flex justify-end gap-4">
          <PDFDownloadLink
            document={<InvoicePDF payment={payment} />}
            fileName={`invoice-${payment.transectionId}.pdf`}
          >
            {({ loading }) =>
              loading ? (
                <button className="btn btn-sm">Generating...</button>
              ) : (
                <button className="btn btn-sm btn-primary">Download PDF</button>
              )
            }
          </PDFDownloadLink>

          <button className="btn btn-sm" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;
