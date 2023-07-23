const express = require('express');
const ctrl = require('../../controllers/auth');
const { validateBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/user');
const router = express.Router();

const multer = require('multer');
const path = require('path');

const tempDir = path.join(__dirname, '../', '../', 'temp');
const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: multerConfig });

router.post('/register', upload.single('avatar'), ctrl.register);

router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

module.exports = router;