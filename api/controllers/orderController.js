import Order from "../models/orderModel.js";
import Patient from "../models/patientModel.js";
import Cart from "../models/cartModel.js";
import Stripe from 'stripe';

const createOrder = async (req, res) => {
    try {
        const patient = await Patient.findById(req.user._id);
        if (!patient) {
            return res.status(400).json({ message: "Patient not found" });
        }
        patient.deliveryAddress.array.forEach((address) => {
            if(address.is_default == true)
                req.body.address = address;
        });
        if (!req.body.address) {
            return res.status(400).json({ message: "Address not found" });
        }
        const cart = await Cart.findOne({ patient_id: patient._id });
        if (!cart) {
            return res.status(400).json({ message: "Cart not found" });
        }
        if (cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const price = cart.items.reduce((acc, item) => {
            return acc + item.medicine_id.price * item.quantity;
        }, 0);

        const order = new Order(
            {
                patient_id: patient._id,
                items: cart.items,
                total_price: price,
                status: "confirmed",
                address: req.body.address,
                paymentMethod: req.body.paymentMethod,
            }
        );
        await order.save();
        if(req.body.paymentMethod == "cc"){
            const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: "payment",
                line_items: cart.items.map(item => {
                  return {
                    price_data: {
                      currency: "usd",
                      product_data: {
                        name: item.name,
                      },
                      unit_amount: item.price * 100,
                    },
                    quantity: item.quantity,
                  }
                }),
              })
              res.json({ url: session.url })
        }
        if(req.body.paymentMethod == "wallet"){
            if(patient.wallet < price){
                return res.status(400).json({ message: "Not enough money in wallet" });
            }
            patient.wallet -= price;
            await patient.save();
        }
        cart.items = [];
        await cart.save();
        res.status(201).json({ order });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const patient = await Patient.findById(req.user._id);
        const orders = await Order.find({ patient_id: patient._id });
        res.status(200).json(orders);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(400).json({ message: "Order not found" });
        }
        if(order.status == "canceled"){
            return res.status(400).json({ message: "Order already canceled" });
        }
        if(order.status == "delivered"){
            return res.status(400).json({ message: "Order already delivered" });
        }
        order.status = "canceled";
        await order.save();
        if(order.paymentMethod == "wallet" || order.paymentMethod == "cc"){
            const patient = await Patient.findById(req.user._id);
            patient.wallet += order.total_price;
            await patient.save();
        }
        res.status(201).json({ order });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export { 
    createOrder,
    getMyOrders,
    cancelOrder, 
};