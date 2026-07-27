import itemsModel from "../models/items.model.js";

export const createItems = async (req, res) => {
  const { name, price, description, category, hearts, rating } = req.body;

  try {
    if (!name || !price || !description || !category) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    const parsedPrice = Number(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      return res.status(400).json({
        message: "Invalid price",
      });
    }
    const existingItem = await itemsModel.findOne({ name });
    if (existingItem) {
      return res.status(400).json({
        message: "Item already exists",
      });
    }
    const imageUrl = req.file ? `/upload/${req.file.filename}` : "";
    const newItems = await itemsModel.create({
      name,
      price: parsedPrice,
      description,
      category,
      imageUrl,
      total: parsedPrice,
      hearts: hearts || 0,
      rating: rating || 0,
    });
    return res.status(201).json({
      message: "New Item Created",
      newItems,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message,
    });
  }
};
//GET function to get all items
export const getItems = async (req, res, next) => {
  try {
    const items = await itemsModel.find().sort({ createdAt: -1 });
    const host = `${req.protocol}://${req.get('host')}`;
    const withFullUrl = items.map(i => ({ 
      ...i.toObject(), 
      imageUrl: i.imageUrl ? host + i.imageUrl : "" }
    ));
    res.json(withFullUrl);
  } catch (err) { 
    console.log(err);
    next(err);
   }
};

export const deleteItem = async (req, res,next) => {
  try {
    const { id } = req.params;
    const deletedItem = await itemsModel.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Item deleted successfully",
      deletedItem,
    });

  } catch (err) {
    console.error(err);
    next(err);
}
}