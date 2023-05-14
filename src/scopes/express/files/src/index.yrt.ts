// const express = require('express');
// const path = require('path');
// const cors = require('cors');
// const csrf = require('csurf');
// const flash = require('connect-flash');
// const session = require('express-session');
// const helmet = require('helmet');
// const compression = require('compression');
// const { expressCspHeader, SELF } = require('express-csp-header');
// const MongoStore = require('connect-mongodb-session')(session);
// const { connect } = require('mongoose');
//
// const homeRoutes = require('./routes/home');
//
// const varMiddleware = require('./middleware/variables');
// const userMiddleware = require('./middleware/user');
// const error404Middleware = require('./middleware/error404');
// const profilePictureMiddleware = require('./middleware/profilePicture');
//
// require('dotenv').config();
//
// const app = express();
// const store = new MongoStore({
//   collection: 'sessions',
//   uri: process.env.DB_CONNECTION_STRING,
// });
//
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/images', express.static(path.join(__dirname, 'images')));
// app.use(express.urlencoded({ extended: true }));
// app.use(
//   session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: false,
//     store,
//   })
// );
// app.use(profilePictureMiddleware.single('profilePicture'));
// app.use(cors());
// app.use(csrf());
// app.use(flash());
// app.use(helmet({
//   crossOriginEmbedderPolicy: false,
// }));
// app.use(
//   expressCspHeader({
//     directives: {
//       'default-src': [SELF, 'https:'],
//     },
//   })
// );
// app.use(compression());
// app.use(varMiddleware);
// app.use(userMiddleware);
//
// app.use('/', homeRoutes);
// app.use(error404Middleware);
//
// const PORT = process.env.PORT || 3000;
//
// const start = async () => {
//   try {
//     await connect(process.env.DB_CONNECTION_STRING, {
//       useNewUrlParser: true,
//     });
//
//     app.listen(PORT, () => {
//       console.log(`Server started on PORT: ${PORT}`);
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };
//
// module.exports = start;