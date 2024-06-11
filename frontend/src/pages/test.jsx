import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import './custom-datepicker.css';
import axios from 'axios';



const test = () => {

  //create a invoice
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    invoiceDate: '',
    invoiceDueDate: '',
    billedBy: '',
    clientDetail: '',
    country: '',
    state: '',
    table: [{
      item: '',
      description: '',
      rate: '',
      quantity: '',
      gst: '',
      igst: '',
      cgst: '',
      sgst: ''
    }],
    amount: '',
    totalGst: '',
    total: '',
    bankDetails: {
      accountName: '',
      accountNumber: '',
      ifsc: '',
      accountType: '',
      bankName: ''
    },
    termsConditions: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/invoices', formData);
      console.log('Invoice created:', response.data);
      // Add any additional logic here, such as showing a success message
    } catch (error) {
      console.error('Error:', error);
      // Handle error, such as showing an error message to the user
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTableChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTable = [...formData.table];
    updatedTable[index][name] = value;
    setFormData({ ...formData, table: updatedTable });
  };












  const [rows, setRows] = useState([{ name: '', description: '', cost: '', qty: '', price: 0, gstPercentage: 0, igst: 0, cgst: 0, sgst: 0 }]);
  const handleAddRow = () => {
    setRows([...rows, { name: '', description: '', cost: '', qty: '', price: 0, gstPercentage: 0, igst: 0, cgst: 0, sgst: 0 }]);
  };

  const handleDeleteRow = (index) => {
    const newRows = rows.filter((row, i) => i !== index);
    setRows(newRows);
  };

  const handelPrint = () => {
    window.print();
  };

  //Get a client by Name
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}api/clients`);
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const handleClientChange = (event) => {
    const selectedClientId = event.target.value;
    const selectedClientData = clients.find(client => client.clientName === selectedClientId);
    setSelectedClient(selectedClientData);
    setFormData({
      ...formData,
      clientDetail: selectedClientId, // Assuming clientDetail field expects clientName
      // You can add other client details here if needed
    });
  };


  return (

    <form onSubmit={handleSubmit}>
      <div>

        <div className="print_invoice" style={{ marginTop: "-4px" }}>
          <div className="" style={{ borderBottom: "1px solid #A9A9A9" }}>
            <h5 className="card-title mb-0 fw-bold">INVOICE</h5>
          </div>
          <div className=" d-flex justify-content-between mb-2" style={{ marginTop: "5px" }}>
            <div className="">
              <div className="d-flex">
                <span className="fw-bold text-muted">Invoice No # : </span>
                <input
                  className=""
                  style={{ marginLeft: "0.8rem", border: "none" }}
                  value={formData.invoiceNumber} onChange={handleChange}
                />
              </div>
              <div className="d-flex">
                <span className="fw-bold text-muted"> Invoice Date : </span>
                <DatePicker className="date1" value={formData.invoiceDate} onChange={handleChange} />
                {/* <div style={{ marginLeft: "10px" }}>{format( 'MMMM dd, yyyy')}</div> */}
              </div>
              <div className="d-flex">
                <span className="fw-bold text-muted">Due Date : </span>
                <DatePicker className="date2" value={formData.invoiceDueDate} onChange={handleChange} />
                {/* <div style={{ marginLeft: "32px" }}>{format( 'MMMM dd, yyyy')}</div> */}
              </div>
            </div>
            <img id="image" style={{ width: "13rem", height: "2.5rem" }} src="Images/techninza-logo.png" alt="logo" />
          </div>


          <div className="d-flex  justify-content-between">
            <div style={{ width: "49%" }}>
              <div className="p-3 rounded" style={{ backgroundColor: "lavender" }}>
                <h2 className="h5 text-primary mb-2" style={{ backgroundColor: "lavender" }}>Billed By</h2>
                <textarea className="fw-semibold" value={formData.billedBy} onChange={handleChange} style={{ backgroundColor: "lavender", border: "none" }} rows="9" defaultValue={"Gazetinc Technology LLP \n\n3rd Floor, Rana Tower, Opp: Mahindra Aura, \nNew Palam Vihar, Phase I, Gurugram, Haryana, \nIndia - 122017 \n\nGSTIN: 06AATFG8894M1Z8 \nPAN: AATFG8894M \nEmail:vinay@techninza.in"} />
              </div>
            </div>


            <div style={{ width: "49%" }}>
              <div className="mb-1 client-search" style={{ marginTop: "-2rem" }}>
                <select className="form-select" aria-label="Default select Project Category" onChange={handleClientChange}>
                  <option value="" selected>Search Client</option>
                  {clients.map(client => (
                    <option key={client._id} value={client.clientName}>{client.clientName}</option>
                  ))}
                </select>
              </div>
              <div className="p-3 rounded" style={{ backgroundColor: "lavender", height: "16.3rem" }}>
                <h2 className="h5 text-primary mb-2" style={{ backgroundColor: "lavender" }}>Billed To</h2>

                {selectedClient && (
                  <div style={{ backgroundColor: "lavender" }}>
                    <p style={{ backgroundColor: "lavender" }} className="fw-bold">{selectedClient.businessName}</p>
                    <p style={{ backgroundColor: "lavender" }} className="mt-3 fw-bold">{selectedClient.clientAddress}</p>
                    <p style={{ backgroundColor: "lavender" }} className="mt-3 fw-bold">GSTIN : {selectedClient.clientGst}</p>
                    <p style={{ backgroundColor: "lavender" }} className="fw-bold">Phone No. : {selectedClient.clientPhone}</p>
                    <p style={{ backgroundColor: "lavender" }} className="fw-bold">Email : {selectedClient.clientEmail}</p>
                  </div>
                )}
              </div>
            </div>

          </div>
          <div className="d-flex justify-content-around mt-2 ">
            <div className="d-flex">
              <span className="fw-bold" style={{ textWrap: "nowrap", padding: "8px" }}>Country of Supply :</span>
              <select
                id="country-select"
                className="form-control"
                style={{ backgroundColor: "white", border: "none" }}

              >
                <option value="" defaultValue={'India'}>Select Country</option>
                <option value="India"> India</option>
              </select>
            </div>
            <div className="d-flex">
              <span className="fw-bold" style={{ textWrap: "nowrap", padding: "8px" }}>Place of Supply :</span>
              <select
                id="state-select"
                className="form-control"
                style={{ backgroundColor: "white", border: "none" }}
              >
                <option value="">Select State</option>
                <option value="Delhi"> Delhi</option>

              </select>
            </div>
          </div>
          <div className="a4-height" style={{ marginTop: "-20px" }}>

            <table className="items border-light">
              <tbody >
                <tr >
                  <th style={{ background: "#650bfd", color: "white" }} className="border-secondary">Item</th>
                  <th style={{ background: "#650bfd", color: "white" }} className="border-secondary">Description</th>
                  <th style={{ width: 100, background: "#650bfd", color: "white" }} className="border-secondary">Rate</th>
                  <th style={{ width: 70, background: "#650bfd", color: "white" }} className="border-secondary">Quantity</th>
                  <th style={{ width: 60, background: "#650bfd", color: "white" }} className="border-secondary">GST %</th>
                  <th style={{ width: 100, background: "#650bfd", color: "white" }} className="border-secondary">IGST</th>
                  <th style={{ width: 100, background: "#650bfd", color: "white" }} className="border-secondary">CGST</th>
                  <th style={{ width: 100, background: "#650bfd", color: "white" }} className="border-secondary">SGST</th>
                </tr>
                <tr className="item-row ">
                  <td className="item-name border-secondary">
                    <div className="delete-wpr ">
                      <textarea rows="2" style={{ border: "none" }} />
                      <a className="delete" href="javascript:;" onClick={() => handleDeleteRow(index)} title="Remove row">X</a>
                    </div>
                  </td>
                  <td className="description border-secondary">
                    <textarea rows="2" style={{ border: "none" }} />
                  </td>
                  <td className="border-secondary">
                    <textarea
                      style={{ border: "none" }}
                      className="cost"

                    />
                  </td>
                  <td className="border-secondary">
                    <textarea rows="2" style={{ border: "none" }} className="qty" />
                  </td >
                  <td className="border-secondary">
                    <textarea rows="2" style={{ border: "none" }} className="gstPercentage" />
                  </td>
                  <td className="border-secondary">
                    <span className="igst">₹ </span>
                  </td>
                  <td className="border-secondary">
                    <span className="cgst">₹ </span>
                  </td>
                  <td className="border-secondary">
                    <span className="sgst">₹ </span>
                  </td>
                </tr>
                <tr id="hiderow" >
                  <td colSpan={5} className="border-secondary">
                    <a id="addrow" href="javascript:;" onClick={handleAddRow} title="Add a row">Add a row</a>
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} className="blank border-secondary"></td>
                  <td colSpan={2} className="total-line border-secondary">Amount</td>
                  <td className="total-value border-secondary">
                    <div id="subtotal">₹ </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} className="blank border-secondary"> </td>
                  <td colSpan={2} className="total-line border-secondary">Total GST</td>
                  <td className="total-value border-secondary"><div id="total-gst">₹ </div></td>
                </tr>
                <tr>
                  <td colSpan={4} className="blank border-secondary"> </td>
                  <td colSpan={2} className="total-line border-secondary fs-6 fw-bold" style={{ background: "#650bfd", color: "white" }}>Total (INR)</td>
                  <td className="total-value border-secondary fs-6 fw-bold" style={{ background: "#650bfd", color: "white" }}><div id="grand-total" style={{ background: "#650bfd", color: "white", width: "max-content" }}>₹ </div></td>
                </tr>
              </tbody>

            </table>
            {/* :
            <div style={{ height: "90px" }}></div>
          } */}
            <div style={{ width: "45%", marginTop: "-60px" }}>
              <div className="p-2 rounded" style={{ backgroundColor: "lavender", border: "none" }}>
                <h2 className="h5 text-primary" style={{ backgroundColor: "lavender", border: "none" }}>Bank Details</h2>
                <table className="items " style={{ backgroundColor: "lavender", border: "none", marginTop: "-1px" }}>
                  <tbody>
                    <tr>
                      <td colSpan={2} className="fw-bold  p-0" style={{ backgroundColor: "lavender", border: "none" }}>Account Name</td>
                      <td className="p-0" style={{ backgroundColor: "lavender", border: "none" }}><textarea style={{ backgroundColor: "lavender", border: "none" }} rows="1" defaultValue={"Gazetinc Technology LLP"} /></td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="fw-bold p-0" style={{ backgroundColor: "lavender", border: "none" }}>Account Number </td>
                      <td className="p-0" style={{ backgroundColor: "lavender", border: "none" }}><textarea style={{ backgroundColor: "lavender", border: "none" }} rows="1" defaultValue={"002105501589"} /></td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="fw-bold p-0" style={{ backgroundColor: "lavender", border: "none" }}>IFSC</td>
                      <td className="p-0" style={{ backgroundColor: "lavender", border: "none" }}><textarea style={{ backgroundColor: "lavender", border: "none" }} rows="1" defaultValue={"ICIC0000021"} /></td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="fw-bold p-0" style={{ backgroundColor: "lavender", border: "none" }}>Account Type</td>
                      <td className="p-0" style={{ backgroundColor: "lavender", border: "none" }}><textarea style={{ backgroundColor: "lavender", border: "none" }} rows="1" defaultValue={"Current"} /></td>
                    </tr>
                    <tr>
                      <td colSpan={2} className="fw-bold p-0" style={{ backgroundColor: "lavender", border: "none" }}>Bank</td>
                      <td className="p-0" style={{ backgroundColor: "lavender", border: "none" }}><textarea style={{ backgroundColor: "lavender", border: "none" }} rows="1" defaultValue={"ICICI bank"} /></td>
                    </tr>


                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ clear: "both" }} />
            <div className="footer-note mt-4 ">
              <h6 className="text-primary mb-1 bg-light">Terms and Conditions</h6>
              <textarea
                className=""
                rows="4"
                defaultValue={
                  "1. Please quote invoice number when remitting funds"
                }
              />
            </div>
          </div>
        </div>

        <div className="text-center">
          <button type="button" className="btn btn-lg btn-primary" onClick={handelPrint}>
            <i className="fa fa-print me-2" />
            Print Invoice
          </button>
        </div>
      </div>
    </form>
  )
}

export default test