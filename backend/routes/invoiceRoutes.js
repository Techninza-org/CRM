const express = require('express');
const router = express.Router();
const invoiceController = require('../controller/invoiceAuth');

// Route for creating a new invoice
router.post('/invoices', invoiceController.createInvoice);

// Route for getting all invoices
router.get('/invoices', invoiceController.getAllInvoices);

// Route for getting a single invoice by ID
router.get('/invoices/:id', invoiceController.getInvoiceById);

router.get('/lastInvoice', invoiceController.getLastInvoice);

// Route for updating an existing invoice
router.put('/invoices/:id', invoiceController.updateInvoice);

// Route for deleting an existing invoice
router.delete('/invoices/:id', invoiceController.deleteInvoice);

module.exports = router;
