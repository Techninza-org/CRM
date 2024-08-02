const express = require('express');
const router = express.Router();
const accessController = require('../userController/accessAuth'); 

// Create Access
router.post('/crm-access', accessController.createAccess);

// Get All Accesses
router.get('/crm-access', accessController.getAllAccesses);

// Get Access by ID
router.get('/crm-access/:id', accessController.getAccessById);

// Update Access
router.put('/crm-access/:id', accessController.updateAccess);

// Delete Access
router.delete('/crm-access/:id', accessController.deleteAccess);

module.exports = router;
