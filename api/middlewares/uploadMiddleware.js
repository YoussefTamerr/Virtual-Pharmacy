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

const uploadPharmacistDocs = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const fieldName = file.fieldname;
      const folderName =
        fieldName
          .split(/(?=[A-Z])/)
          .join("-")
          .toLowerCase() + "s";
      cb(null, `public/docs/${folderName}`);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const pharmacistName = req.body.name.split(" ").join("-");
      cb(null, `${pharmacistName}${ext}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Please upload a PDF file"), false);
    }
  },
}).fields([
  { name: "nationalId", maxCount: 1 },
  { name: "workingLicense", maxCount: 1 },
  { name: "pharmacyDegree", maxCount: 1 },
]);

const savePharmacistDocs = async (req, res, next) => {
  try {
    if (!req.files) return next();

    const { nationalId, workingLicense, pharmacyDegree } = req.files;

    if (nationalId) {
      req.body.nationalId = `docs/national-ids/${nationalId[0].filename}`;
    }

    if (workingLicense) {
      req.body.workingLicense = `docs/working-licenses/${workingLicense[0].filename}`;
    }

    if (pharmacyDegree) {
      req.body.pharmacyDegree = `docs/pharmacy-degrees/${pharmacyDegree[0].filename}`;
    }

    console.log(req.body);

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const uploadAndSavePharmacistDocs = (req, res, next) => {
  uploadPharmacistDocs(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    savePharmacistDocs(req, res, next);
  });
};

export { uploadAndSaveMedicineImage, uploadAndSavePharmacistDocs };
