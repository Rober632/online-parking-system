const parkingModel = require("../models/parkingModel");
const helper = require('../helper/helper');
const checkoutMsg = require('../helper/checkoutMsg')
const handelOtp = require('../helper/sendOtp')
const moment = require('moment-timezone');
const userModel = require("../models/userModel");
const writeToFile = require('../helper/writeToFile')
 
class parking{
  
    static add = async (req , res) =>{
        try{
            const price = req.body.price ;
            const numFloors = req.body.floor ;
            const numSlots = req.body.slot ;
            const name = req.body.name ;
            const newSlots = [];
            const newFloors = [];
            for (let i = 1; i <= numSlots; i++) {
                newSlots.push({
                    number: i,
                    isFree: true
                });
            }
            for (let i = 1; i <= numFloors; i++) {
                newFloors.push({
                    number: i,
                    slots: newSlots
                });
            }
            const parking = new parkingModel({
                name,
                floors: newFloors,
                rate : price
            });
            await parking.save();
            helper.resHandler(res , 200 , true , parking , "Parking added successfully");
        } catch(e){
            helper.resHandler(res , 500 , false , {} , e.message );
        }
      }
    static reserve = async (req, res) => {
        const user = await userModel.findById(req.body.user.id);
        this.parkingName = req.body.parkingName
        if (!user) {
          return helper.resHandler(res, 500 ,false ,{} , "You need to login first in order to reserve a parking place");
        }
        const parking = await parkingModel.findOne({ name: this.parkingName });
        if(!parking) return helper.resHandler(res, 500, false, {}, "Select the parking name")
        if (user.hasBooked) {
          return helper.resHandler(res, 500, false, {}, "you have already booked a place" );
        }
        
        let slotFound = false;
        for (let floor of parking.floors) {
          for (let slot of floor.slots) {
            if (slot.isFree) {
              slot.isFree = false;
              slot.startDate = moment.tz(new Date(), 'YYYY-MM-DD HH:mm:ss', 'Europe/Bucharest').toISOString();
              user.floor = floor.number;
              user.slot = slot.number;
              user.hasBooked = true;
              const otp = await handelOtp(user.email)
              // const otp = 123123
              slot.otp = otp
              // const msg = `Your parking spot is in ${this.parkingName }, floor ${floor.number}, slot ${slot.number}`;
              const msg = `your parking spot has been reserved! You can find your spot on floor ${floor.number} of the ${this.parkingName } garage, in slot number ${slot.number}.` 
              slotFound = true;
              await user.save();
              await parking.save();
              return helper.resHandler(res, 200, true, slot, msg);
            }
          }
        }
        if (!slotFound) {
          return helper.resHandler(res, 500, false, {}, "The parking is fully Booked");
        }
      };
      static checkOtp = async(req,res) =>{
        const {otp , userInfo} = req.body
        const user = await userModel.findById(userInfo.id);
        const floor = user.floor
        const slot = user.slot
        console.log(floor , slot);
        const parking = await parkingModel.findOne({ name: this.parkingName });
        console.log(parking.name);
        const slotInfo = parking.floors[floor-1].slots[slot-1]
        if(otp == slotInfo.otp){
            return helper.resHandler(res, 200, true, slot, "Success! Your Reservation has been confirmed. Thank you!");
        }
        else{
            return helper.resHandler(res, 401, false, {}, "Invalid OTP");
        }
      }
      static hasBooked = async (req, res) => {
        const user = await userModel.findById(req.body.id);
        const hasBooked = user.hasBooked
        helper.resHandler(res , 200 , true , {hasBooked } , `Booking status is ${hasBooked}`);
      }


      static checkOut = async (req , res) => {
        const user = await userModel.findById(req.body.user.id);
        const reservationInfo = req.body.reservationInfo
        const parking = await parkingModel.findOne({ name: "Sidi Gabr" });
        user.hasBooked = false
        parking.floors[user.floor-1].slots[user.slot-1].isFree = true
        parking.floors[user.floor-1].slots[user.slot-1].otp = 0
        user.floor = 0 
        user.slot = 0
        checkoutMsg({ user , reservationInfo })
        await user.save()
        await parking.save()
        return helper.resHandler(res, 200, true, {user , parking}, "Checkout Successfully");
      }

      static getParking = async (req , res) => {
        const parkings =  await parkingModel.find()
        return helper.resHandler(res, 200, true, parkings, "Get Parking");
      }
      static removeParking = async (req,res) => {
        try {
          const removedParking = await parkingModel.findByIdAndRemove(req.body.id);
          if (!removedParking) {
            return res.status(404).send({ message: 'Parking not found' });
          }
          res.status(200).send({ message: 'Parking removed successfully' });
        } catch (error) {
          console.error('Error removing parking:', error);
          res.status(500).send({ message: 'Error removing parking' });
        }
      }}
module.exports = parking