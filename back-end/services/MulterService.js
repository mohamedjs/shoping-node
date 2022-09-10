import multer from "multer"

const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //   cb(null, '/public/image')
    // },
    // filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //   cb(null, file.fieldname + '-' + uniqueSuffix)
    // }
})
  
export const upload = multer({ 
    limits: {
        fileSize: 4 * 1024 * 1024,
    }
})