const express = require('express');
const router = express.Router();
const mercadopago = require('mercadopago');

mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN);

router.post('/create_preference', async (req, res) => {
  try {
    const { items } = req.body;

    const preference = {
      items,
      back_urls: {
        success: 'https://tusitio.com/success',
        failure: 'https://tusitio.com/failure',
        pending: 'https://tusitio.com/pending',
      },
      auto_return: 'approved',
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ id: response.body.id });
  } catch (error) {
    console.error('Error creando preferencia MercadoPago:', error);
    res.status(500).json({ error: 'Error creando preferencia' });
  }
});

module.exports = router;
