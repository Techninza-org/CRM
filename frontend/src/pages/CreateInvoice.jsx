import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const CreateInvoice = () => {


  const [rows, setRows] = useState([{ name: '', description: '', cost: '', qty: '', price: 0, gstPercentage: 0, igst: 0, cgst: 0, sgst: 0 }]);
  const [total, setTotal] = useState({ subtotal: 0, gstTotal: 0, grandTotal: 0 });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('0224');

  

  const handleInvoiceNumberChange = (e) => {
    setInvoiceNumber(e.target.value);
  };

  const generateNextInvoiceNumber = () => {
    const currentNumber = parseInt(invoiceNumber, 10);
    const nextNumber = (currentNumber + 1).toString().padStart(4, '0');
    setInvoiceNumber(nextNumber);
  };

  const handleAddRow = () => {
    setRows([...rows, { name: '', description: '', cost: '', qty: '', price: 0, gstPercentage: 0, igst: 0, cgst: 0, sgst: 0 }]);
  };

  const handleDeleteRow = (index) => {
    const newRows = rows.filter((row, i) => i !== index);
    setRows(newRows);
  };

  const handleInputChange = (e, index, field) => {
    const { value } = e.target;
    const newRows = rows.map((row, i) => {
      if (i === index) {
        const updatedRow = { ...row, [field]: value };
        if (field === 'cost' || field === 'qty' || field === 'gstPercentage') {
          const cost = parseFloat(updatedRow.cost.replace(/,/g, '')) || 0; // Remove commas for calculation
          const qty = parseInt(updatedRow.qty, 10) || 0;
          const gstPercentage = parseFloat(updatedRow.gstPercentage) || 0;
          const gstAmount = (cost * qty * gstPercentage) / 100;
          let igst, cgst, sgst;
          if (selectedState === 'HR') {
            igst = 0;
            cgst = gstAmount / 2;
            sgst = gstAmount / 2;
          } else {
            igst = gstAmount;
            cgst = 0;
            sgst = 0;
          }
          updatedRow.price = cost * qty;
          updatedRow.igst = igst;
          updatedRow.cgst = cgst;
          updatedRow.sgst = sgst;
        }
        return updatedRow;
      }
      return row;
    });
    setRows(newRows);
    updateTotal(newRows);
  };

  const handleBlur = (e, index, field) => {
    const { value } = e.target;
    const formattedValue = value.replace(/,/g, ',');
    const newRows = rows.map((row, i) => {
      if (i === index) {
        const updatedRow = { ...row, [field]: parseFloat(formattedValue).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) };
        return updatedRow;
      }
      return row;
    });
    setRows(newRows);
  };

  const formatNumber = (number) => {
    return number.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const updateTotal = (newRows) => {
    const subtotal = newRows.reduce((acc, row) => acc + row.price, 0);
    const gstTotal = newRows.reduce((acc, row) => acc + row.igst + row.cgst + row.sgst, 0);
    const grandTotal = subtotal + gstTotal;
    setTotal({ subtotal, gstTotal, grandTotal });
  };

  // Initial calculation
  useEffect(() => {
    updateTotal(rows);
  }, [rows]);


  useEffect(() => {
    const newSubtotal = rows.reduce((acc, row) => acc + row.price, 0);
    const newGstTotal = rows.reduce((acc, row) => acc + row.igst + row.cgst + row.sgst, 0);
    const newGrandTotal = newSubtotal + newGstTotal;
    setTotal({ subtotal: newSubtotal, gstTotal: newGstTotal, grandTotal: newGrandTotal });
  }, [rows]);

  useEffect(() => {
    fetch("https://api.countrystatecity.in/v1/countries", {
      method: 'GET',
      headers: {
        'X-CSCAPI-KEY': 'eUNnUGVIam1VVXVqOFdKWWtzc0I1REM5cFVnZWtaTEEyM1l5ZE1JMw=='
      }
    })
      .then(response => response.json())
      .then(data => {
        setCountries(data);
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountry}/states`, {
        method: 'GET',
        headers: {
          'X-CSCAPI-KEY': 'eUNnUGVIam1VVXVqOFdKWWtzc0I1REM5cFVnZWtaTEEyM1l5ZE1JMw=='
        }
      })
        .then(response => response.json())
        .then(data => {
          setStates(data);
        })
        .catch(error => console.error('Error fetching states:', error));
    } else {
      setStates([]);
    }
  }, [selectedCountry]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setSelectedState('');
  };

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handelPrint = () => {
    window.print();
    generateNextInvoiceNumber();
  };

  useEffect(() => {
    generateNextInvoiceNumber();
  }, []);

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
                <div className="border-0 mb-4">
                  <div className="card-header py-3 no-bg bg-transparent d-flex align-items-center px-0 justify-content-between border-bottom flex-wrap">
                    <h3 className="fw-bold mb-0">Create Invoice</h3>
                  </div>
                </div>
              </div>
              {/* <!-- Row end  --> */}
              <div className="row g-3">
                <div className="col-12">
                  <div className="card print_invoice" style={{ border: "1px solid #A9A9A9" }}>
                    <div className="card-header fs-4" style={{ borderBottom: "1px solid #A9A9A9" }}>
                      <h5 className="card-title mb-0 fw-bold">INVOICE</h5>
                    </div>
                    <div className="card-body">
                      <div className="card p-3">
                        <div className="pb-2 d-flex justify-content-between">
                          <div className="row">
                            <div className="d-flex p-1">
                              <span className="fw-bold text-muted">Invoice No # : </span>
                              <input
                                className="p-1"
                                style={{ marginLeft: "0.8rem", border: "none" }}
                                value={invoiceNumber}
                                onChange={handleInvoiceNumberChange}
                              />
                            </div>
                            <div className="d-flex p-1">
                              <span className="fw-bold text-muted"> Invoice Date : </span>
                              <input className="p-1" style={{ marginLeft: "0.7rem", border: "none" }} type="date" />
                            </div>
                            <div className="d-flex p-1">
                              <span className="fw-bold text-muted">Due Date : </span>
                              <input className="p-1" style={{ marginLeft: "2rem", border: "none" }} type="date" />
                            </div>




                          </div>



                          <img id="image" style={{ width: "13rem", height: "2.5rem" }} src="Images/techninza-logo.png" alt="logo" />

                        </div>


                        <div className="row">
                          <div className="col-md-6 mb-3 mb-md-0">
                            <div className="p-3 rounded" style={{ backgroundColor: "lavender" }}>
                              <h2 className="h5 text-primary mb-2" style={{ backgroundColor: "lavender" }}>Billed By</h2>
                              <textarea className="fw-semibold" style={{ backgroundColor: "lavender", border: "none" }} rows="10" defaultValue={"Gazetinc Technology LLP \n\n3rd Floor, Rana Tower, Opp: Mahindra Aura, \nNew Palam Vihar, Phase I, Gurugram, Haryana, \nIndia - 122017 \n\nGSTIN: 06AATFG8894M1Z8 \nPAN: AATFG8894M \nEmail:vinay@techninza.in"} />
                            </div>
                          </div>
                          <div className="col-md-6 mb-3 mb-md-0">
                            <div className="p-3 rounded" style={{ backgroundColor: "lavender" }}>
                              <h2 className="h5 text-primary mb-2" style={{ backgroundColor: "lavender" }}>Billed To</h2>
                              <textarea className="fw-semibold" style={{ backgroundColor: "lavender", border: "none" }} rows="10" defaultValue={"Ecotions Venture pvt ltd \n\nD 52 rajnagar 2 palam colony, \nDelhi, \nDelhi, India - 110077 \n\nPhone: +91 87663 87694"} />
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
                              value={selectedCountry}
                              onChange={handleCountryChange}
                            >
                              <option value="">Select Country</option>
                              {countries.map(country => (
                                <option key={country.iso2} value={country.iso2}>
                                  {country.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="d-flex">
                            <span className="fw-bold" style={{ textWrap: "nowrap", padding: "8px" }}>Place of Supply :</span>
                            <select
                              id="state-select"
                              className="form-control"
                              style={{ backgroundColor: "white", border: "none" }}
                              value={selectedState}
                              onChange={handleStateChange}
                            >
                              <option value="">Select State</option>
                              {states.map(state => (
                                <option key={state.iso2} value={state.iso2}>
                                  {state.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <table className="items border-light">
                          {selectedState === 'HR' ?
                            <tbody >
                              <tr >
                                <th style={{ background: "#650bfd", color: "white" }} className="border-secondary">Item</th>
                                <th style={{ background: "#650bfd", color: "white" }} className="border-secondary">Description</th>
                                <th style={{ width: 100, background: "#650bfd", color: "white" }} className="border-secondary">Rate</th>
                                <th style={{ width: 70, background: "#650bfd", color: "white" }} className="border-secondary">Quantity</th>
                                <th style={{ width: 60, background: "#650bfd", color: "white" }} className="border-secondary">GST %</th>
                                {/* <th style={{ width: 100, background: "#650bfd", color: "white" }} className="border-secondary">IGST</th> */}
                                <th style={{ width: 100, background: "#650bfd", color: "white" }} className="border-secondary">CGST</th>
                                <th style={{ width: 100, background: "#650bfd", color: "white" }} className="border-secondary">SGST</th>
                              </tr>
                              {rows.map((row, index) => (
                                <tr key={index} className="item-row ">
                                  <td className="item-name border-secondary">
                                    <div className="delete-wpr ">
                                      <textarea style={{ border: "none" }} value={row.name} onChange={(e) => handleInputChange(e, index, 'name')} />
                                      <a className="delete" href="javascript:;" onClick={() => handleDeleteRow(index)} title="Remove row">X</a>
                                    </div>
                                  </td>
                                  <td className="description border-secondary">
                                    <textarea style={{ border: "none" }} value={row.description} onChange={(e) => handleInputChange(e, index, 'description')} />
                                  </td>
                                  <td className="border-secondary">
                                    <textarea style={{ border: "none" }} className="cost" value={row.cost} onChange={(e) => handleInputChange(e, index, 'cost')} />
                                  </td>
                                  <td className="border-secondary">
                                    <textarea style={{ border: "none" }} className="qty" value={row.qty} onChange={(e) => handleInputChange(e, index, 'qty')} />
                                  </td >
                                  <td className="border-secondary">
                                    <textarea style={{ border: "none" }} className="gstPercentage" value={row.gstPercentage} onChange={(e) => handleInputChange(e, index, 'gstPercentage')} />
                                  </td>
                                  {/* <td className="border-secondary">
                                 <span className="igst">₹ {row.igst.toFixed(2)}</span>
                               </td> */}
                                  <td className="border-secondary">
                                    <span className="cgst">₹ {formatNumber(row.cgst)}</span>
                                  </td>
                                  <td className="border-secondary">
                                    <span className="sgst">₹ {formatNumber(row.sgst)}</span>
                                  </td>
                                </tr>
                              ))}
                              <tr id="hiderow" >
                                <td colSpan={5} className="border-secondary">
                                  <a id="addrow" href="javascript:;" onClick={handleAddRow} title="Add a row">Add a row</a>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={4} className="blank border-secondary"></td>
                                <td colSpan={2} className="total-line border-secondary">Amount</td>
                                <td className="total-value border-secondary">
                                  <div id="subtotal">₹ {formatNumber(total.subtotal)}</div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={4} className="blank border-secondary"> </td>
                                <td colSpan={2} className="total-line border-secondary">Total GST</td>
                                <td className="total-value border-secondary"><div id="total-gst">₹ {formatNumber(total.gstTotal)}</div></td>
                              </tr>
                              <tr>
                                <td colSpan={4} className="blank border-secondary"> </td>
                                <td colSpan={2} className="total-line border-secondary fs-6 fw-bold" style={{ background: "#650bfd", color: "white" }}>Total (INR)</td>
                                <td className="total-value border-secondary fs-6 fw-bold" style={{ background: "#650bfd", color: "white" }}><div id="grand-total" style={{ background: "#650bfd", color: "white", width: "max-content" }}>₹ {formatNumber(total.grandTotal)}</div></td>
                              </tr>
                            </tbody>
                            :
                            <tbody >
                              <tr >
                                <th style={{ background: "#650bfd", color: "white" }} className="border-secondary">Item</th>
                                <th style={{ background: "#650bfd", color: "white" }} className="border-secondary">Description</th>
                                <th style={{ width: 100, background: "#650bfd", color: "white" }} className="border-secondary">Rate</th>
                                <th style={{ width: 70, background: "#650bfd", color: "white" }} className="border-secondary">Quantity</th>
                                <th style={{ width: 60, background: "#650bfd", color: "white" }} className="border-secondary">GST %</th>
                                <th style={{ width: 100, background: "#650bfd", color: "white" }} className="border-secondary">IGST</th>
                                {/* <th style={{ width: 100, background: "#650bfd", color: "white" }} className="border-secondary">CGST</th>
                                <th style={{ width: 100, background: "#650bfd", color: "white" }} className="border-secondary">SGST</th> */}
                              </tr>
                              {rows.map((row, index) => (
                                <tr key={index} className="item-row ">
                                  <td className="item-name border-secondary">
                                    <div className="delete-wpr ">
                                      <textarea style={{ border: "none" }} value={row.name} onChange={(e) => handleInputChange(e, index, 'name')} />
                                      <a className="delete" href="javascript:;" onClick={() => handleDeleteRow(index)} title="Remove row">X</a>
                                    </div>
                                  </td>
                                  <td className="description border-secondary">
                                    <textarea style={{ border: "none" }} value={row.description} onChange={(e) => handleInputChange(e, index, 'description')} />
                                  </td>
                                  <td className="border-secondary">
                                    <textarea
                                      style={{ border: "none" }}
                                      className="cost"
                                      value={row.cost}
                                      onChange={(e) => handleInputChange(e, index, 'cost')}
                                      onBlur={(e) => handleBlur(e, index, 'cost')}
                                    />
                                  </td>
                                  <td className="border-secondary">
                                    <textarea style={{ border: "none" }} className="qty" value={row.qty} onChange={(e) => handleInputChange(e, index, 'qty')} />
                                  </td >
                                  <td className="border-secondary">
                                    <textarea style={{ border: "none" }} className="gstPercentage" value={row.gstPercentage} onChange={(e) => handleInputChange(e, index, 'gstPercentage')} />
                                  </td>
                                  <td className="border-secondary">
                                    <span className="igst">₹ {formatNumber(row.igst)}</span>
                                  </td>
                                  {/* <td className="border-secondary">
                                    <span className="cgst">₹ {row.cgst.toFixed(2)}</span>
                                  </td>
                                  <td className="border-secondary">
                                    <span className="sgst">₹ {row.sgst.toFixed(2)}</span>
                                  </td> */}
                                </tr>
                              ))}
                              <tr id="hiderow" >
                                <td colSpan={5} className="border-secondary">
                                  <a id="addrow" href="javascript:;" onClick={handleAddRow} title="Add a row">Add a row</a>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={3} className="blank border-secondary"></td>
                                <td colSpan={2} className="total-line border-secondary">Amount</td>
                                <td className="total-value border-secondary">
                                  <div id="subtotal">₹ {formatNumber(total.subtotal)}</div>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan={3} className="blank border-secondary"> </td>
                                <td colSpan={2} className="total-line border-secondary">Total GST</td>
                                <td className="total-value border-secondary"><div id="total-gst">₹ {formatNumber(total.gstTotal)}</div></td>
                              </tr>
                              <tr>
                                <td colSpan={3} className="blank border-secondary"> </td>
                                <td colSpan={2} className="total-line border-secondary fs-6 fw-bold" style={{ background: "#650bfd", color: "white" }}>Total (INR)</td>
                                <td className="total-value border-secondary fs-6 fw-bold" style={{ background: "#650bfd", color: "white" }}><div id="grand-total" style={{ background: "#650bfd", color: "white", width: "max-content" }}>₹ {formatNumber(total.grandTotal)}</div></td>
                              </tr>
                            </tbody>
                          }
                        </table>

                        <div className="col-md-6 mb-md-0">
                          <div className="p-3 rounded" style={{ backgroundColor: "lavender", border: "none" }}>
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
                        <div className="footer-note mt-5">
                          <h6 className="text-primary mb-2 bg-light">Terms and Conditions</h6>
                          <textarea
                            className=""
                            defaultValue={
                              "1. Please quote invoice number when remitting funds"
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 text-center d-flex justify-content-evenly">
                  <button type="button" className="btn btn-lg btn-primary" onClick={handelPrint}>
                    <i className="fa fa-print me-2" />
                    Print Invoice
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateInvoice;





// To handle GST calculations based on state-wise rules (IGST, CGST, and SGST)