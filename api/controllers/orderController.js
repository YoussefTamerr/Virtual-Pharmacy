import Order from "../models/orderModel.js";
import Patient from "../models/patientModel.js";
import Cart from "../models/cartModel.js";
import Medicine from "../models/medicineModel.js";
import stripe from 'stripe';


const createOrder = async (req, res) => {
    try {
        const patient = await Patient.findById(req.user._id);
        if (!patient) {
            return res.status(400).json({ message: "Patient not found" });
        }
        patient.deliveryAddress.forEach((address) => {
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

        let price = 0;
        for (let i = 0; i < cart.items.length; i++) {
            const item = cart.items[i];
            const medicine = await Medicine.findById(item.medicine_id);
            if (!medicine) {
                return res.status(400).json({ message: "Medicine not found" });
            }
            let p = medicine.price;
            price += p * item.quantity;
        }
        let medicines = [];
        for (let i = 0; i < cart.items.length; i++) {
            const item = cart.items[i];
            const medicine = await Medicine.findById(item.medicine_id);
            if (!medicine) {
                return res.status(400).json({ message: "Medicine not found" });
            }
            if (medicine.availableQuantity < item.quantity) {
                return res.status(400).json({ message: `${medicine.name} out of stock` });
            }
            medicine.singleQuantity = item.quantity;
            medicines.push(medicine);
        }
        
        if(req.body.paymentMethod == "wallet"){
            if(patient.wallet < price){
                return res.status(400).json({ message: "Not enough money in wallet" });
            }
            patient.wallet -= price;
            await patient.save();
        }
        //////////////////
        for (let i = 0; i < cart.items.length; i++) {
            const item = cart.items[i];
            const medicine = await Medicine.findById(item.medicine_id);
            medicine.availableQuantity -= item.quantity;
            medicine.sales += medicine.price * item.quantity;
            await medicine.save();
        }
        cart.items = [];
        await cart.save();
        const order = new Order(
            {
                patient_id: patient._id,
                items: cart.items,
                total_price: price,
                status: "Confirmed",
                address: req.body.address,
                paymentMethod: req.body.paymentMethod,
            }
        );
        await order.save();          
        res.status(201).json({ order });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const createOrderCreditCard = async (req, res) => {
    try {
        const patient = await Patient.findById(req.user._id);
        if (!patient) {
            return res.status(400).json({ message: "Patient not found" });
        }
        patient.deliveryAddress.forEach((address) => {
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

        let price = 0;
        for (let i = 0; i < cart.items.length; i++) {
            const item = cart.items[i];
            const medicine = await Medicine.findById(item.medicine_id);
            if (!medicine) {
                return res.status(400).json({ message: "Medicine not found" });
            }
            let p = medicine.price;
            price += p * item.quantity;
        }
        let medicines = [];
        for (let i = 0; i < cart.items.length; i++) {
            const item = cart.items[i];
            const medicine = await Medicine.findById(item.medicine_id);
            if (!medicine) {
                return res.status(400).json({ message: "Medicine not found" });
            }
            if (medicine.availableQuantity < item.quantity) {
                return res.status(400).json({ message: `${medicine.name} out of stock` });
            }
            medicine.singleQuantity = item.quantity;
            medicines.push(medicine);
        }

        const stripeInstance =  stripe(process.env.STRIPE_PRIVATE_KEY);
        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: medicines.map(item => {
                return {
                    price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price * 100,
                    },
                    quantity: item.singleQuantity,
                }
            }),
            success_url: `${process.env.CLIENT_URL}/cart`,
            cancel_url: `${process.env.CLIENT_URL}/cart`,
            metadata: {
                patient_id: patient._id,
                total_price: price,
                address: req.body.address.street_address + ", " + req.body.address.city + ", " + req.body.address.governate,
                paymentMethod: "cc",
            }
        })
            
        res.status(201).json({ url : session.url })
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

async function stripeWebhook(request, response) {
    console.log("webhook called");
    const event = request.body;
    
    const metadata = event.data.object.metadata;
    console.log(metadata);
    if (event.type == 'checkout.session.completed'){
        console.log(metadata);
        try {
            const cart = await Cart.findOne({ patient_id: metadata.patient_id });
            for (let i = 0; i < cart.items.length; i++) {
                const item = cart.items[i];
                const medicine = await Medicine.findById(item.medicine_id);
                medicine.availableQuantity -= item.quantity;
                medicine.sales += medicine.price * item.quantity;
                await medicine.save();
            }
            const order = new Order(
                {
                    patient_id: metadata.patient_id,
                    items: cart.items,
                    total_price: metadata.total_price,
                    status: "Confirmed",
                    address: metadata.address,
                    paymentMethod: metadata.paymentMethod,
                }
            );
            await order.save();
            cart.items = [];
            await cart.save();
        } catch (error) {
            console.log(error)
        }
        
    }
    
    response.json({received: true});
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
    createOrderCreditCard, 
    stripeWebhook,
};