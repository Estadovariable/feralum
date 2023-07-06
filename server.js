const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = 3000;

const mongodbUri = process.env.MONGODB_URI;

const Data = mongoose.model('Data', {
  sistema: String,
  subsistema: String,
  fecha: String,
  quienCrea: String,
  paraQuien: String,
  direccion: String,
  contacto: String,
  quienFabrica: String,
  alto: String,
  ancho: String,
  cantidad: String,
  cantidadModulos: String,
  ubicacion1: String,
  ubicacion2: String,
  ubicacion3: String,
  ubicacion4: String,
  ubicacion5: String,
  ubicacion6: String,
  ubicacion7: String,
  ubicacion8: String,
  ubicacion9: String,
  ubicacion10: String,
  ubicacion11: String,
  ubicacion12: String,
  referencia1: String,
  referencia2: String,
  referencia3: String,
  referencia4: String,
  referencia5: String,
  referencia6: String,
  referencia7: String,
  referencia8: String,
  referencia9: String,
  referencia10: String,
  referencia11: String,
  referencia12: String,
  cantidadPerfiles1: String,
  cantidadPerfiles2: String,
  cantidadPerfiles3: String,
  cantidadPerfiles4: String,
  cantidadPerfiles5: String,
  cantidadPerfiles6: String,
  cantidadPerfiles7: String,
  cantidadPerfiles8: String,
  cantidadPerfiles9: String,
  cantidadPerfiles10: String,
  cantidadPerfiles11: String,
  cantidadPerfiles12: String,
  descuento1: String,
  descuento2: String,
  descuento3: String,
  descuento4: String,
  descuento5: String,
  descuento6: String,
  descuento7: String,
  descuento8: String,
  descuento9: String,
  descuento10: String,
  descuento11: String,
  descuento12: String,
  longitud1: String,
  longitud2: String,
  longitud3: String,
  longitud4: String,
  longitud5: String,
  longitud6: String,
  longitud7: String,
  longitud8: String,
  longitud9: String,
  longitud10: String,
  longitud11: String,
  longitud12: String,
  accesorio1: String,
  accesorio2: String,
  accesorio3: String,
  accesorio4: String,
  accesorio5: String,
  accesorio6: String,
  accesorio7: String,
  accesorio8: String,
  accesorio9: String,
  referenciaAccesorio1: String,
  referenciaAccesorio2: String,
  referenciaAccesorio3: String,
  referenciaAccesorio4: String,
  referenciaAccesorio5: String,
  referenciaAccesorio6: String,
  referenciaAccesorio7: String,
  referenciaAccesorio8: String,
  referenciaAccesorio9: String,
  cantidadAccesorio1: String,
  cantidadAccesorio2: String,
  cantidadAccesorio3: String,
  cantidadAccesorio4: String,
  cantidadAccesorio5: String,
  cantidadAccesorio6: String,
  cantidadAccesorio7: String,
  cantidadAccesorio8: String,
  cantidadAccesorio9: String,
  especificacion1: String,
  especificacion2: String,
  calibre1: String,
  calibre2: String,
  alturaVidrio1: String,
  alturaVidrio2: String,
  anchoVidrio1: String,
  anchoVidrio2: String,
  cantidadVidrios1: String,
  cantidadVidrios2: String,
});


// Conexión a la base de datos de MongoDB Atlas
mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conexión exitosa a MongoDB Atlas'))
  .catch(error => console.error('Error al conectar a MongoDB Atlas:', error));

// Definir el esquema y modelo de usuario
const User = mongoose.model('User', {
  name: String,
  email: String,
  verified_email: Boolean,
  picture: String,
  permissions: { type: String, default: null }
});

// Configuración de body-parser para analizar el cuerpo de la solicitud
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Middleware para habilitar CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Configuración de las rutas
const router = express.Router();

router.get("/api/permissions", async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email });
    const isAdmin = user?.permissions === "admin";
    res.json({ isAdmin });
  } catch (error) {
    console.error("Error getting user permissions:", error);
    res.status(500).json({ mensaje: "Error al obtener los permisos del usuario" });
  }
});

app.use('/', router);


router.get("/api/user", async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email });
    res.json({ user });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ mensaje: "Error al obtener el usuario" });
  }
});

router.put("/api/permissions", async (req, res) => {
  const { email, permission } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ mensaje: "Usuario no encontrado" });
      return;
    }

    user.permissions = permission;
    await user.save();

    res.json({ mensaje: "Permisos actualizados correctamente" });
  } catch (error) {
    console.error("Error updating user permissions:", error);
    res.status(500).json({ mensaje: "Error al actualizar los permisos del usuario" });
  }
});

router.post('/formulario', async (req, res) => {

  const data = req.body;

  try {
    const newFormulario = new Data({
      sistema: data.sistema,
      subsistema: data.subsistema,
      fecha: data.fecha,
      quienCrea: data.quienCrea,
      paraQuien: data.paraQuien,
      direccion: data.direccion,
      contacto: data.contacto,
      quienFabrica: data.quienFabrica,
      alto: data.alto,
      ancho: data.ancho,
      cantidad: data.cantidad,
      cantidadModulos: data.cantidadModulos,
      ubicacion1: data.ubicacion1,
      ubicacion2: data.ubicacion2,
      ubicacion3: data.ubicacion3,
      ubicacion4: data.ubicacion4,
      ubicacion5: data.ubicacion5,
      ubicacion6: data.ubicacion6,
      ubicacion7: data.ubicacion7,
      ubicacion8: data.ubicacion8,
      ubicacion9: data.ubicacion9,
      ubicacion10: data.ubicacion10,
      ubicacion11: data.ubicacion11,
      ubicacion12: data.ubicacion12,
      referencia1: data.referencia1,
      referencia2: data.referencia2,
      referencia3: data.referencia3,
      referencia4: data.referencia4,
      referencia5: data.referencia5,
      referencia6: data.referencia6,
      referencia7: data.referencia7,
      referencia8: data.referencia8,
      referencia9: data.referencia9,
      referencia10: data.referencia10,
      referencia11: data.referencia11,
      referencia12: data.referencia12,
      cantidadPerfiles1: data.cantidadPerfiles1,
      cantidadPerfiles2: data.cantidadPerfiles2,
      cantidadPerfiles3: data.cantidadPerfiles3,
      cantidadPerfiles4: data.cantidadPerfiles4,
      cantidadPerfiles5: data.cantidadPerfiles5,
      cantidadPerfiles6: data.cantidadPerfiles6,
      cantidadPerfiles7: data.cantidadPerfiles7,
      cantidadPerfiles8: data.cantidadPerfiles8,
      cantidadPerfiles9: data.cantidadPerfiles9,
      cantidadPerfiles10: data.cantidadPerfiles10,
      cantidadPerfiles11: data.cantidadPerfiles11,
      cantidadPerfiles12: data.cantidadPerfiles12,
      descuento1: data.descuento1,
      descuento2: data.descuento2,
      descuento3: data.descuento3,
      descuento4: data.descuento4,
      descuento5: data.descuento5,
      descuento6: data.descuento6,
      descuento7: data.descuento7,
      descuento8: data.descuento8,
      descuento9: data.descuento9,
      descuento10: data.descuento10,
      descuento11: data.descuento11,
      descuento12: data.descuento12,
      longitud1: data.longitud1,
      longitud2: data.longitud2,
      longitud3: data.longitud3,
      longitud4: data.longitud4,
      longitud5: data.longitud5,
      longitud6: data.longitud6,
      longitud7: data.longitud7,
      longitud8: data.longitud8,
      longitud9: data.longitud9,
      longitud10: data.longitud10,
      longitud11: data.longitud11,
      longitud12: data.longitud12,
      accesorio1: data.accesorio1,
      accesorio2: data.accesorio2,
      accesorio3: data.accesorio3,
      accesorio4: data.accesorio4,
      accesorio5: data.accesorio5,
      accesorio6: data.accesorio6,
      accesorio7: data.accesorio7,
      accesorio8: data.accesorio8,
      accesorio9: data.accesorio9,
      referenciaAccesorio1: data.referenciaAccesorio1,
      referenciaAccesorio2: data.referenciaAccesorio2,
      referenciaAccesorio3: data.referenciaAccesorio3,
      referenciaAccesorio4: data.referenciaAccesorio4,
      referenciaAccesorio5: data.referenciaAccesorio5,
      referenciaAccesorio6: data.referenciaAccesorio6,
      referenciaAccesorio7: data.referenciaAccesorio7,
      referenciaAccesorio8: data.referenciaAccesorio8,
      referenciaAccesorio9: data.referenciaAccesorio9,
      cantidadAccesorio1: data.cantidadAccesorio1,
      cantidadAccesorio2: data.cantidadAccesorio2,
      cantidadAccesorio3: data.cantidadAccesorio3,
      cantidadAccesorio4: data.cantidadAccesorio4,
      cantidadAccesorio5: data.cantidadAccesorio5,
      cantidadAccesorio6: data.cantidadAccesorio6,
      cantidadAccesorio7: data.cantidadAccesorio7,
      cantidadAccesorio8: data.cantidadAccesorio8,
      cantidadAccesorio9: data.cantidadAccesorio9,
      especificacion1: data.especificacion1,
      especificacion2: data.especificacion2,
      calibre1: data.calibre1,
      calibre2: data.calibre2,
      alturaVidrio1: data.alturaVidrio1,
      alturaVidrio2: data.alturaVidrio2,
      anchoVidrio1: data.anchoVidrio1,
      anchoVidrio2: data.anchoVidrio2,
      cantidadVidrios1: data.cantidadVidrios1,
      cantidadVidrios2: data.cantidadVidrios2,
    });

    await newFormulario.save();

    res.json({ mensaje: 'Formulario guardado correctamente' });
  } catch (error) {
    console.error('Error al guardar el formulario:', error);
    res.status(500).json({ mensaje: 'Error al guardar el formulario' });
  }
});

router.get('/api/tareas', async (req, res) => {
  try {
    const documents = await Data.find().sort({ fecha: -1 });
    res.json(documents);
  } catch (error) {
    console.error('Error al obtener los documentos:', error);
    res.status(500).json({ mensaje: 'Error al obtener los documentos' });
  }
});


router.post('/api/datos', async (req, res) => {
  const userData = req.body;

  try {
    const existingUser = await User.findOne({ email: userData.email });

    if (existingUser) {
      // Actualizar los datos del usuario existente
      existingUser.name = userData.name;
      existingUser.verified_email = userData.verified_email;
      existingUser.picture = userData.picture;

      await existingUser.save();

      res.json({ mensaje: 'Usuario actualizado correctamente' });
    } else {
      // Crear un nuevo documento User con los datos recibidos
      const newUser = new User(userData);
      newUser.permissions = null; // Asignar null a los permisos del nuevo usuario

      // Guardar el usuario en la base de datos
      await newUser.save();

      res.json({ mensaje: 'Usuario guardado correctamente' });
    }
  } catch (error) {
    console.error('Error al guardar/actualizar el usuario:', error);
    res.status(500).json({ mensaje: 'Error al guardar/actualizar el usuario' });
  }
});

app.use('/', router);

// Iniciar el servidor HTTP
app.listen(port, () => {
  console.log(`Servidor HTTP escuchando en el puerto ${port}`);
});

