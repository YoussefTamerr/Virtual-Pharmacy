import Cart from "../models/cartModel.js";

const addToCart = async (req, res) => {
  const patientId = req.user._id;
  const { medicine_id, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ patient_id: patientId });

    if (!cart) {
      cart = new Cart({ patient_id: patientId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.medicine_id.toString() === medicine_id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ medicine_id: medicine_id, quantity: quantity });
    }

    await cart.save();

    res.status(200).json({ message: "Item added to the cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCart = async (req, res) => {
  const patientId = req.user._id;

  try {
    const cart = await Cart.findOne({ patient_id: patientId }).populate(
      "items.medicine_id"
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart.items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  const { patientId, medicine_id } = req.body;

  try {
    const cart = await Cart.findOne({ patient_id: patientId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.medicine_id.toString() === medicine_id
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in the cart" });
    } else {
      cart.items.splice(itemIndex, 1);
    }
    await cart.save();

    res.status(200).json("Item removed from the cart");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const updateCartItem = async (req, res) => {
  const { patientId, medicine_id, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ patient_id: patientId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.medicine_id.toString() === medicine_id
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in the cart" });
    }

    item.quantity = quantity;

    await cart.save();
    res.status(200).json("Item quantity updated in the cart");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addToCart, getCart, removeFromCart, updateCartItem };
