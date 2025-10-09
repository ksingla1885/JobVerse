import multer from "multer"

const storage = multer.memoryStorage();
export const singleUpload = multer({storage}).single("file");
export const multipleUpload = multer({storage}).fields([
    { name: "file", maxCount: 1 }, // Resume file
    { name: "profilePhoto", maxCount: 1 } // Profile photo
]);