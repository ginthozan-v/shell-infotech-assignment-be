import express from 'express';
import {
  createCafe,
  getCafes,
  updateCafe,
  deleteCafe,
  addEmployee,
} from '../controllers/cafe.js';

const router = express.Router();

router.get('/', getCafes);
router.post('/', createCafe);
router.patch('/:id', updateCafe);
router.delete('/:id', deleteCafe);
router.patch('/add-employee/:id', addEmployee);

export default router;
