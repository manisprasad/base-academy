import express from 'express';
import sendMail, { StudentData } from '../config/sendMail';
import { validateSchmea } from '../middleware/validateSchema';

export const contactRoute = express.Router();

// Route to handle contact form submission
contactRoute.post('/email', validateSchmea(StudentData), async (req, res) => {
  try {
    const { name, phone, query } = req.body;

    // Send email using the sendMail function
    await sendMail({name, phone, query});

    res.status(200).json({ message: 'Your query has been submitted successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send your query. Please try again later.' });
  }
});