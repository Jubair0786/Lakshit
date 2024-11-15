// pages/api/scratch-code.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { code } = req.body;

  // Debugging ke liye console log
  console.log('Received code:', code);

  // Valid scratch codes ki list
  const validCodes = ['61286569', 'CODE123', 'SCRATCH456'];

  if (!code) {
    return res.status(400).json({ message: 'Scratch code is required.' });
  }

  // Scratch code verification
  if (validCodes.includes(code)) {
    console.log('Code verified successfully');
    return res.status(200).json({ success: true, message: 'Scratch code is valid. Product verified successfully!' });
  } else {
    console.log('Invalid scratch code');
    return res.status(400).json({ success: false, message: 'Invalid scratch code. Please try again.' });
  }
}
