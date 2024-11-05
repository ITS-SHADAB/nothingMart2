const express = require('express');
const { Category } = require('../model/Category');

exports.allCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body); // Create a new Category document
    const savedCategory = await category.save(); // Save the category to the database
    res.status(201).send(savedCategory); // Respond with the saved category and a 201 status code
  } catch (error) {
    res.status(400).send({ error: error.message }); // Handle errors and respond with a 400 status code
  }
};
