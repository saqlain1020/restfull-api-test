const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: "Order Get"
    })
})

router.post('/',(req,res,next)=>{
    res.status(201).json({
        message: "Order Created"
    })
})

router.get('/:orderId',(req,res,next)=>{
    res.status(201).json({
        message: "Order Get",
        id: req.params.orderId,
    })
})


module.exports = router;