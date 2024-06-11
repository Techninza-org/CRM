import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "datatables.net";
import "datatables.net-bs5";
import "datatables.net-responsive";

const AllInvoice = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}api/invoices`);
        setInvoices(response.data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchInvoices();
  }, []);

  const formatDateToMonthYear = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {day:'2-digit', month: 'long', year: 'numeric' }).format(date);
  };

  return (
    <>
      <div id="mytask-layout">
        <Sidebar />
        {/* main body area */}
        <div className="main px-lg-4 px-md-4">
          {/* Body: Header */}
          <Header />

          {/*Body*/}
          <div className="body d-flex py-lg-3 py-md-2">
            <div className="container-xxl">
              <div className="row align-items-center">
                <div className="border-1 mb-4">
                  <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                    <h3 className="fw-bold mb-0">ALL Invoices</h3>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <table
                  id="myProjectTable"
                  className="table table-hover align-middle mb-0"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                    <th>Invoice No.</th>
                      <th>Invoice Date</th>
                      <th>Client Name</th>
                      <th>Item</th>
                      {/* <th>Description</th> */}
                      <th>Rate</th>
                      <th>Quantity</th>
                      <th>Total Amount</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                  {invoices.map(invoice => (
                      invoice.table.map((item, index) => (
                        <tr key={`${invoice.id}-${index}`}>
                          <td>{invoice.invoiceNumber}</td>
                          <td>{formatDateToMonthYear(invoice.invoiceDate)}</td>
                          <td>{invoice.clientDetail.clientName}</td>
                          <td>{item.item}</td>
                          {/* <td>{item.description}</td> */}
                          <td>{item.rate}</td>
                          <td>{item.quantity}</td>
                          <td>{invoice.total}</td>
                          
                        </tr>
                      ))
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllInvoice;
