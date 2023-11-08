import Cart from "../models/cartModel";

const addToCart = async (req, res) => {
  const { patientId, category, quantity } = req.body;

  try {

    let cart = await Cart.findOne({ patient_id: patientId });

    if (!cart) {
      cart = new Cart({ patient_id: patientId, list: [] });
    }

    const existingItem = cart.list.find((item) => item.category.toString() === category);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.list.push({ category: category, quantity: quantity });
    }

    await cart.save();

    res.send('Item added to the cart');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const getCart = async (req, res) => {
  const { patientId } = req.body;

  try {
    const cart = await Cart.findOne({ patient_id: patientId }).populate('list.category');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json(cart.list);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

const removeFromCart = async (req, res) => {
    const { patientId, category } = req.params;
  
    try {
      const cart = await Cart.findOne({ patient_id: patientId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      const itemIndex = cart.list.findIndex((item) => item.category.toString() === category);
  
      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found in the cart' });
      }
  
      cart.list.splice(itemIndex, 1);

      await cart.save();
  
      res.send('Item removed from the cart');
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  };
  const updateCartItem = async (req, res) => {
    const { patientId, category } = req.params;
    const { quantity } = req.body;
  
    try {
      const cart = await Cart.findOne({ patient_id: patientId });
  
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      const item = cart.list.find((item) => item.category.toString() === category);
  
      if (!item) {
        return res.status(404).json({ message: 'Item not found in the cart' });
      }
  
      item.quantity = quantity;

      await cart.save();  
      res.send('Item quantity updated in the cart');

    } 
    catch (error) {
      res.status(500).send(error);
    }
  };

export { addToCart, getCart, removeFromCart, updateCartItem };
