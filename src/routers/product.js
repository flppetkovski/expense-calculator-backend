const express = require("express")
const router = new express.Router()
const Product = require("../models/product")
const auth = require("../middleware/auth")

router.get("/products", auth, async (req, res) => {



 try {
  await req.user.populate("products").execPopulate()
  res.send(req.user.products)
 } catch (e) {
  res.status(500).send()
 }
});

router.patch("/products/:id", auth, async (req, res) => {
 const updates = Object.keys(req.body)
 const allowedUpdates = ["name", "description", "price", "date", "type"]
 const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

 if (!isValidOperation) {
  return res.status(400).send({
   error: "Invalid updates"
  })
 }

 try {

  const product = await Product.findOne({
   _id: req.params.id,
   owner: req.user._id
  })


  if (!product) {
   return res.status(404).send()
  }
  updates.forEach((update) => product[update] = req.body[update])
  await product.save()


  res.send(product)

 } catch (e) {
  res.status(400).send(e)
 }


})
router.delete("/products/:id", auth, async (req, res) => {


 try {
  const product = await Product.findOneAndDelete({
   _id: req.params.id,
   owner: req.user._id
  })

  if (!product) {
   return res.status(404).send()
  }


  res.send(product)

 } catch (e) {
  res.status(500).send()
 }

})


router.get("/products/:id", auth, async (req, res) => {


 try {
  const product = await Product.findOne({
   _id,
   owner: req.user._id
  })

  res.send(product)
 } catch (e) {
  res.status(500).send()
 }

});


router.post("/product", auth, async (req, res) => {
 const product = new Product({
  ...req.body,
  owner: req.user._id
 })



 try {
  await product.save()
  res.status(201).send(product)
 } catch (e) {
  res.status(400).send()
 }



})

module.exports = router