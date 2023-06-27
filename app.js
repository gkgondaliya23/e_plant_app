require('dotenv').config()
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const {dbconnect}  = require('./dbconnection');
const bodyParser = require('body-parser');
const { ensureAuthenticated } = require('./middlewares/auth.middleware');
const authRoutes = require('./routes/users/auth.route');
const userRoutes = require('./routes/users/user.route');
const adminProductRoutes = require('./routes/admin/products.route');
const userProductRoutes = require('./routes/users/product.route');
const userCartRoutes = require('./routes/users/cart.route');
const userOrdersRoutes = require('./routes/users/orders.route');
const userFavoriteRoutes = require('./routes/users/favorite.route');
const userReviewsRoutes = require('./routes/users/reviews.route');

const app = express();
const port = process.env.PORT || 8000;

// db connection
dbconnect();

app.set('view engine', 'ejs');

app.use(session({ 
    secret: process.env.SECRET_KEY, 
    resave: false, 
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admins', adminProductRoutes);
app.use('/api/home', userProductRoutes);
app.use('/api/user/cart', userCartRoutes);
app.use('/api/user/order', userOrdersRoutes);
app.use('/api/favorite', userFavoriteRoutes);
app.use('/api/reviews', userReviewsRoutes);

// server
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is started at ${port}`);
});