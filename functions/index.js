/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");
const mercadopago = require("mercadopago");

// Configura tu Access Token (cuenta de vendedor de prueba o producción)
mercadopago.configurations.setAccessToken("APP_USR-6029568828629507-070219-cc9893648b0540712270477e36a42f3e-252"); // reemplaza acá con tu token real

exports.crearPreferencia = functions.https.onRequest(async (req, res) => {
  const { productos } = req.body;

  try {
    const items = productos.map((producto) => ({
      title: producto.descripcion,
      quantity: producto.cantidad,
      unit_price: Number(producto.precio),
      currency_id: "ARS",
    }));

    const preference = {
      items,
      back_urls: {
        success: "https://tripbd-c6698.web.app/pago-exitoso",
        failure: "https://tripbd-c6698.web.app/pago-fallido",
        pending: "https://tripbd-c6698.web.app/pago-pendiente",
      },
      auto_return: "approved",
    };

    const respuesta = await mercadopago.preferences.create(preference);
    res.json({ init_point: respuesta.body.init_point });
  } catch (error) {
    console.error("Error al crear preferencia:", error);
    res.status(500).send("Error al crear preferencia");
  }
});
