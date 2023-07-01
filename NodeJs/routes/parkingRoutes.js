const parkingController = require('../controller/parkingController')
const auth = require('../middleware/auth')
const router = require('express').Router()

router.post("/add" , parkingController.add)
router.post("/reservation" , parkingController.reserve)
router.post("/checkOtp" , parkingController.checkOtp)
router.post("/hasBooked" , parkingController.hasBooked)
router.post("/checkOut" , parkingController.checkOut)
router.get("/getParking" , parkingController.getParking)
router.post("/removeParking" , parkingController.removeParking)


module.exports = router