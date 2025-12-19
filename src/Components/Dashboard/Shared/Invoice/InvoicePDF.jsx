// InvoicePDF.jsx
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 12, fontFamily: "Helvetica" },
  header: { textAlign: "center", marginBottom: 20 },
  logo: { width: 60, height: 60, marginBottom: 10 },
  title: { fontSize: 20, fontWeight: "bold" },
  section: { marginBottom: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: { fontWeight: "bold" },
  table: { marginTop: 20, borderTop: 1, borderBottom: 1, paddingVertical: 10 },
  footer: { marginTop: 40, textAlign: "center", fontSize: 10, color: "#555" },
});

const InvoicePDF = ({ payment }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        {/* Optional logo */}
        {/* <Image src="/path/to/logo.png" style={styles.logo} /> */}
        <Text style={styles.title}>Invoice</Text>
        <Text>Date: {new Date(payment.createdAt).toLocaleDateString()}</Text>
      </View>

      {/* Recipient Info */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.label}>Transaction ID:</Text>
          <Text>{payment.transectionId}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Paid By:</Text>
          <Text>{payment.paidBy}</Text>
        </View>
      </View>

      {/* Payment Details */}
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.label}>Payment Type:</Text>
          <Text>{payment.paymentType}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Amount:</Text>
          <Text>${payment.amount}</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Thank you for your payment!</Text>
        <Text>For support, contact admin@example.com</Text>
      </View>
    </Page>
  </Document>
);

export default InvoicePDF;
