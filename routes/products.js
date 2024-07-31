const express = require('express')
const prodcutsRepo = require('../repositories/products')
const productsIndexTemplate = require('../views/products/index')

const router = express.Router()

router.get('/', async (req, res) => {
    const products = await prodcutsRepo.getAll()
    res.send(productsIndexTemplate({products}))
})

module.exports = router;