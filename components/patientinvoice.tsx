// PatientInvoiceGenerator.js
import React, { useState, useEffect } from 'react';

const PatientInvoiceGenerator = () => {
  const [invoice, setInvoice] = useState({
    invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    patient: {
      name: '',
      id: '',
      address: '',
      phone: '',
      email: ''
    },
    services: [
      { id: 1, description: '', code: '', unitPrice: 0, quantity: 1, amount: 0 }
    ],
    payments: [],
    subtotal: 0,
    taxRate: 0,
    taxAmount: 0,
    total: 0,
    balance: 0,
    notes: ''
  });

  const [isPrinting, setIsPrinting] = useState(false);

  // Calculate totals whenever services change
  useEffect(() => {
    calculateTotals();
  }, [invoice.services, invoice.taxRate]);

  const calculateTotals = () => {
    const subtotal = invoice.services.reduce((sum, service) => sum + service.amount, 0);
    const taxAmount = subtotal * (invoice.taxRate / 100);
    const total = subtotal + taxAmount;
    const paymentsTotal = invoice.payments.reduce((sum, payment) => sum + payment.amount, 0);
    const balance = total - paymentsTotal;

    setInvoice(prev => ({
      ...prev,
      subtotal,
      taxAmount,
      total,
      balance
    }));
  };

  const handlePatientChange = (e) => {
    const { name, value } = e.target;
    setInvoice(prev => ({
      ...prev,
      patient: {
        ...prev.patient,
        [name]: value
      }
    }));
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...invoice.services];
    updatedServices[index] = {
      ...updatedServices[index],
      [field]: value
    };

    // Calculate line total if price or quantity changes
    if (field === 'unitPrice' || field === 'quantity') {
      const price = field === 'unitPrice' ? value : updatedServices[index].unitPrice;
      const quantity = field === 'quantity' ? value : updatedServices[index].quantity;
      updatedServices[index].amount = price * quantity;
    }

    setInvoice(prev => ({
      ...prev,
      services: updatedServices
    }));
  };

  const addService = () => {
    const newId = invoice.services.length > 0 
      ? Math.max(...invoice.services.map(s => s.id)) + 1 
      : 1;
    
    setInvoice(prev => ({
      ...prev,
      services: [
        ...prev.services,
        { id: newId, description: '', code: '', unitPrice: 0, quantity: 1, amount: 0 }
      ]
    }));
  };

  const removeService = (id) => {
    if (invoice.services.length <= 1) return;
    
    setInvoice(prev => ({
      ...prev,
      services: prev.services.filter(service => service.id !== id)
    }));
  };

  const addPayment = () => {
    const newPayment = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      method: 'Cash',
      amount: 0,
      reference: ''
    };
    
    setInvoice(prev => ({
      ...prev,
      payments: [...prev.payments, newPayment]
    }));
  };

  const handlePaymentChange = (index, field, value) => {
    const updatedPayments = [...invoice.payments];
    updatedPayments[index] = {
      ...updatedPayments[index],
      [field]: field === 'amount' ? parseFloat(value) || 0 : value
    };
    
    setInvoice(prev => ({
      ...prev,
      payments: updatedPayments
    }));
    
    // Recalculate balance
    setTimeout(calculateTotals, 0);
  };

  const removePayment = (id) => {
    setInvoice(prev => ({
      ...prev,
      payments: prev.payments.filter(payment => payment.id !== id)
    }));
    
    // Recalculate balance
    setTimeout(calculateTotals, 0);
  };

  const handleTaxRateChange = (e) => {
    setInvoice(prev => ({
      ...prev,
      taxRate: parseFloat(e.target.value) || 0
    }));
  };

  const handleGeneralChange = (e) => {
    const { name, value } = e.target;
    setInvoice(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const printInvoice = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 100);
  };

  return (
    <div className="invoice-generator">
      {/* Edit / Print toggle */}
      {!isPrinting ? (
        <div className="controls">
          <h1>Patient Invoice Generator</h1>
          <button className="print-button" onClick={printInvoice}>
            Print / Download Invoice
          </button>
        </div>
      ) : null}

      <div className={`invoice-container ${isPrinting ? 'printing' : ''}`}>
        {/* Invoice Header */}
        <div className="invoice-header">
          <div className="company-info">
            <h2>Medical Center</h2>
            <p>123 Healthcare Blvd, Medical City</p>
            <p>Phone: (555) 123-4567</p>
          </div>
          <div className="invoice-title">
            <h1>INVOICE</h1>
            <div className="invoice-details">
              <div className="invoice-row">
                <span className="label">Invoice #:</span>
                {!isPrinting ? (
                  <input 
                    type="text" 
                    name="invoiceNumber" 
                    value={invoice.invoiceNumber} 
                    onChange={handleGeneralChange}
                  />
                ) : (
                  <span>{invoice.invoiceNumber}</span>
                )}
              </div>
              <div className="invoice-row">
                <span className="label">Date:</span>
                {!isPrinting ? (
                  <input 
                    type="date" 
                    name="date" 
                    value={invoice.date} 
                    onChange={handleGeneralChange}
                  />
                ) : (
                  <span>{new Date(invoice.date).toLocaleDateString()}</span>
                )}
              </div>
              <div className="invoice-row">
                <span className="label">Due Date:</span>
                {!isPrinting ? (
                  <input 
                    type="date" 
                    name="dueDate" 
                    value={invoice.dueDate} 
                    onChange={handleGeneralChange}
                  />
                ) : (
                  <span>{new Date(invoice.dueDate).toLocaleDateString()}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Patient Information */}
        <div className="patient-section">
          <h3>Patient Information</h3>
          <div className="patient-grid">
            <div className="form-group">
              <label>Name:</label>
              {!isPrinting ? (
                <input 
                  type="text" 
                  name="name" 
                  value={invoice.patient.name} 
                  onChange={handlePatientChange} 
                  placeholder="Full Name"
                />
              ) : (
                <span>{invoice.patient.name}</span>
              )}
            </div>
            <div className="form-group">
              <label>Patient ID:</label>
              {!isPrinting ? (
                <input 
                  type="text" 
                  name="id" 
                  value={invoice.patient.id} 
                  onChange={handlePatientChange} 
                  placeholder="ID Number"
                />
              ) : (
                <span>{invoice.patient.id}</span>
              )}
            </div>
            <div className="form-group full-width">
              <label>Address:</label>
              {!isPrinting ? (
                <input 
                  type="text" 
                  name="address" 
                  value={invoice.patient.address} 
                  onChange={handlePatientChange} 
                  placeholder="Full Address"
                />
              ) : (
                <span>{invoice.patient.address}</span>
              )}
            </div>
            <div className="form-group">
              <label>Phone:</label>
              {!isPrinting ? (
                <input 
                  type="text" 
                  name="phone" 
                  value={invoice.patient.phone} 
                  onChange={handlePatientChange} 
                  placeholder="Phone Number"
                />
              ) : (
                <span>{invoice.patient.phone}</span>
              )}
            </div>
            <div className="form-group">
              <label>Email:</label>
              {!isPrinting ? (
                <input 
                  type="email" 
                  name="email" 
                  value={invoice.patient.email} 
                  onChange={handlePatientChange} 
                  placeholder="Email Address"
                />
              ) : (
                <span>{invoice.patient.email}</span>
              )}
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="services-section">
          <h3>Services</h3>
          <table className="services-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Code</th>
                <th>Unit Price</th>
                <th>Qty</th>
                <th>Amount</th>
                {!isPrinting && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {invoice.services.map((service, index) => (
                <tr key={service.id}>
                  <td>
                    {!isPrinting ? (
                      <input 
                        type="text" 
                        value={service.description} 
                        onChange={e => handleServiceChange(index, 'description', e.target.value)} 
                        placeholder="Service description"
                      />
                    ) : (
                      <span>{service.description}</span>
                    )}
                  </td>
                  <td>
                    {!isPrinting ? (
                      <input 
                        type="text" 
                        value={service.code} 
                        onChange={e => handleServiceChange(index, 'code', e.target.value)} 
                        placeholder="CPT/Code"
                      />
                    ) : (
                      <span>{service.code}</span>
                    )}
                  </td>
                  <td>
                    {!isPrinting ? (
                      <input 
                        type="number" 
                        value={service.unitPrice} 
                        onChange={e => handleServiceChange(index, 'unitPrice', parseFloat(e.target.value) || 0)} 
                        min="0" 
                        step="0.01"
                      />
                    ) : (
                      <span>${service.unitPrice.toFixed(2)}</span>
                    )}
                  </td>
                  <td>
                    {!isPrinting ? (
                      <input 
                        type="number" 
                        value={service.quantity} 
                        onChange={e => handleServiceChange(index, 'quantity', parseInt(e.target.value) || 0)} 
                        min="1"
                      />
                    ) : (
                      <span>{service.quantity}</span>
                    )}
                  </td>
                  <td>${service.amount.toFixed(2)}</td>
                  {!isPrinting && (
                    <td>
                      <button 
                        type="button" 
                        onClick={() => removeService(service.id)} 
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          
          {!isPrinting && (
            <button 
              type="button" 
              onClick={addService} 
              className="add-service-btn"
            >
              Add Service
            </button>
          )}
        </div>

        {/* Payments */}
        <div className="payments-section">
          <h3>Payments</h3>
          {invoice.payments.length > 0 ? (
            <table className="payments-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Method</th>
                  <th>Reference</th>
                  <th>Amount</th>
                  {!isPrinting && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                {invoice.payments.map((payment, index) => (
                  <tr key={payment.id}>
                    <td>
                      {!isPrinting ? (
                        <input 
                          type="date" 
                          value={payment.date} 
                          onChange={e => handlePaymentChange(index, 'date', e.target.value)}
                        />
                      ) : (
                        <span>{new Date(payment.date).toLocaleDateString()}</span>
                      )}
                    </td>
                    <td>
                      {!isPrinting ? (
                        <select 
                          value={payment.method} 
                          onChange={e => handlePaymentChange(index, 'method', e.target.value)}
                        >
                          <option value="Cash">Cash</option>
                          <option value="Credit Card">Credit Card</option>
                          <option value="Check">Check</option>
                          <option value="Insurance">Insurance</option>
                          <option value="Other">Other</option>
                        </select>
                      ) : (
                        <span>{payment.method}</span>
                      )}
                    </td>
                    <td>
                      {!isPrinting ? (
                        <input 
                          type="text" 
                          value={payment.reference} 
                          onChange={e => handlePaymentChange(index, 'reference', e.target.value)}
                          placeholder="Check #, Auth #, etc."
                        />
                      ) : (
                        <span>{payment.reference}</span>
                      )}
                    </td>
                    <td>
                      {!isPrinting ? (
                        <input 
                          type="number" 
                          value={payment.amount} 
                          onChange={e => handlePaymentChange(index, 'amount', parseFloat(e.target.value) || 0)}
                          min="0" 
                          step="0.01"
                        />
                      ) : (
                        <span>${payment.amount.toFixed(2)}</span>
                      )}
                    </td>
                    {!isPrinting && (
                      <td>
                        <button 
                          type="button" 
                          onClick={() => removePayment(payment.id)} 
                          className="remove-btn"
                        >
                          Remove
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-payments">No payments recorded</p>
          )}
          
          {!isPrinting && (
            <button 
              type="button" 
              onClick={addPayment} 
              className="add-payment-btn"
            >
              Add Payment
            </button>
          )}
        </div>

        {/* Summary */}
        <div className="summary-section">
          <div className="notes-area">
            <h3>Notes</h3>
            {!isPrinting ? (
              <textarea 
                name="notes" 
                value={invoice.notes} 
                onChange={handleGeneralChange}
                placeholder="Payment instructions, follow-up information, etc."
              ></textarea>
            ) : (
              <p className="notes-content">{invoice.notes}</p>
            )}
          </div>
          <div className="totals-area">
            <div className="total-row">
              <span>Subtotal:</span>
              <span>${invoice.subtotal.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>
                Tax Rate:
                {!isPrinting ? (
                  <input 
                    type="number" 
                    value={invoice.taxRate} 
                    onChange={handleTaxRateChange}
                    min="0" 
                    max="100" 
                    step="0.1" 
                    className="tax-input"
                  />
                ) : (
                  <span>{invoice.taxRate}%</span>
                )}
              </span>
              <span>${invoice.taxAmount.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Total:</span>
              <span>${invoice.total.toFixed(2)}</span>
            </div>
            {invoice.payments.length > 0 && (
              <div className="total-row">
                <span>Payments:</span>
                <span>-${invoice.payments.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}</span>
              </div>
            )}
            <div className="total-row balance">
              <span>Balance Due:</span>
              <span>${invoice.balance.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="invoice-footer">
          <p>Thank you for choosing our services!</p>
          <p>Payment is due by {new Date(invoice.dueDate).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Add CSS styles */}
      <style jsx>{`
        .invoice-generator {
          font-family: 'Arial', sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        
        .controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .print-button {
          background-color: #4CAF50;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        
        .print-button:hover {
          background-color: #45a049;
        }
        
        .invoice-container {
          background-color: white;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        
        .invoice-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          border-bottom: 2px solid #eee;
          padding-bottom: 20px;
        }
        
        .company-info h2 {
          color: #2c3e50;
          margin: 0 0 10px 0;
        }
        
        .company-info p {
          margin: 5px 0;
          color: #555;
        }
        
        .invoice-title h1 {
          color: #2c3e50;
          margin: 0 0 15px 0;
          text-align: right;
        }
        
        .invoice-details {
          text-align: right;
        }
        
        .invoice-row {
          margin: 5px 0;
        }
        
        .invoice-row .label {
          font-weight: bold;
          margin-right: 10px;
        }
        
        h3 {
          color: #2c3e50;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }
        
        .patient-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 20px;
        }
        
        .form-group {
          margin-bottom: 10px;
        }
        
        .form-group.full-width {
          grid-column: span 2;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #555;
        }
        
        input, select, textarea {
          width: 100%;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }
        
        textarea {
          min-height: 100px;
          resize: vertical;
        }
        
        .services-table, .payments-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 15px;
        }
        
        .services-table th, .payments-table th {
          background-color: #f8f9fa;
          text-align: left;
          padding: 10px;
          border-bottom: 2px solid #ddd;
        }
        
        .services-table td, .payments-table td {
          padding: 10px;
          border-bottom: 1px solid #eee;
        }
        
        .add-service-btn, .add-payment-btn {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          margin-top: 10px;
        }
        
        .add-service-btn:hover, .add-payment-btn:hover {
          background-color: #2980b9;
        }
        
        .remove-btn {
          background-color: #e74c3c;
          color: white;
          border: none;
          padding: 5px 8px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
        }
        
        .remove-btn:hover {
          background-color: #c0392b;
        }
        
        .summary-section {
          display: flex;
          margin-top: 30px;
        }
        
        .notes-area {
          flex-grow: 1;
          padding-right: 30px;
        }
        
        .notes-content {
          white-space: pre-line;
          color: #555;
        }
        
        .totals-area {
          width: 300px;
        }
        
        .total-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #eee;
        }
        
        .total-row.balance {
          font-weight: bold;
          font-size: 18px;
          color: #2c3e50;
          border-top: 2px solid #ddd;
          border-bottom: none;
          padding-top: 15px;
        }
        
        .tax-input {
          width: 60px;
          padding: 3px;
          display: inline-block;
          margin: 0 5px;
        }
        
        .invoice-footer {
          margin-top: 50px;
          text-align: center;
          color: #7f8c8d;
          border-top: 1px solid #eee;
          padding-top: 20px;
        }
        
        .no-payments {
          font-style: italic;
          color: #777;
        }
        
        @media print {
          .controls {
            display: none;
          }
          
          .invoice-container {
            box-shadow: none;
            padding: 0;
          }
          
          .invoice-generator {
            padding: 0;
          }
          
          .printing {
            padding: 0;
          }
          
          @page {
            margin: 0.5cm;
          }
        }
      `}</style>
    </div>
  );
};

export default PatientInvoiceGenerator;
