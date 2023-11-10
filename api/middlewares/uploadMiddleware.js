import multer from "multer";
import path from "path";

const uploadMedicineImage = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images/medicines");
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, "medicine-" + req.body.name + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (["jpeg", "png"].includes(file.mimetype.split("/")[1])) {
      cb(null, true);
    } else {
      cb(new Error("Please upload a png or jpg image"), false);
    }
  },
}).single("image");

const saveMedicineImage = async (req, res, next) => {
  try {
    if (!req.file) return next();

    req.body.image = `images/medicines/${req.file.filename}`;

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const uploadAndSaveMedicineImage = (req, res, next) => {
  uploadMedicineImage(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    saveMedicineImage(req, res, next);
  });
};

export { uploadAndSaveMedicineImage };
