const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/employee')
    },
    filename: function (req, file, cb) {
        // console.log(req.file, "multer1");
        const uniqueSuffix = Date.now() + '-' + file.originalname
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const project_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/project')
    },
    filename: function (req, file, cb) {
        // console.log(req.file, "multer2");
        const uniqueSuffix = Date.now() + '-' + file.originalname
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const task_storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/task')
    },
    filename: function (req, file, cb) {
        // console.log(req.file, "multer3");
        const uniqueSuffix = Date.now() + '-' + file.originalname
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })
const project_upload = multer({ storage: project_storage })
const task_upload = multer({ storage: task_storage })
module.exports = { upload, project_upload, task_upload }