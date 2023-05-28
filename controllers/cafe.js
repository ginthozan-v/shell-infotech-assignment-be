import Cafe from '../models/cafe.js';
import Employee from '../models/employee.js';
import mongoose from 'mongoose';

export const getCafes = async (req, res) => {
  const { location } = req.query;

  try {
    const loc = new RegExp(location, 'i'); //RegExp => ignores cases
    const cafes = await Cafe.find(location && { location: loc });
    res.status(200).json(cafes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createCafe = async (req, res) => {
  const cafe = req.body;
  const newCafe = new Cafe(cafe);

  try {
    await newCafe.save();
    res.status(201).json(newCafe);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateCafe = async (req, res) => {
  const { id: _id } = req.params;
  const cafe = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No post with that id');

  const updatedCafe = await Cafe.findByIdAndUpdate(
    _id,
    { ...cafe, _id },
    { new: true }
  );

  res.json(updatedCafe);
};

export const deleteCafe = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send('No post with that id');

  // remove all the employees assigned to this cafe
  const cafes = await Cafe.findById(id);
  const employees = [];
  cafes.employees.forEach((employee) => employees.push(employee.employee_id));
  await Employee.deleteMany({ _id: { $in: employees } });

  // remove the cafe
  await Cafe.findByIdAndRemove(id);

  res.json({ message: 'Cafe deleted successfully!' });
};

export const addEmployee = async (req, res) => {
  const { id: _id } = req.params;
  const employee = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No cafe with that id');

  if (!mongoose.Types.ObjectId.isValid(employee._id))
    return res.status(404).send('No employee with that id');

  const cafes = await Cafe.find();

  // check if user already exist in another cafe
  const employees = cafes.some((p) =>
    p.employees.some((e) => e._id.toString() === employee._id)
  );

  if (employees) {
    return res.status(409).send('User already exist in another cafe');
  } else {
    const cafe = await Cafe.findById(_id);
    cafe.employees?.push(req.body);
    const updatedCafe = await Cafe.findByIdAndUpdate(_id, cafe, { new: true });
    res.json(updatedCafe);
  }
};
