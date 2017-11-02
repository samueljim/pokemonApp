const Pokemon = require('../models/Pokemon');
const bluebird = require('bluebird');
const request = bluebird.promisifyAll(require('request'), {
  multiArgs: true
});
const Pokedex = require('pokedex-promise-v2');

// const cheerio = require('cheerio');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};

/**
 * POST /poekmon
 * find's a pokemon
 */
exports.getPokemon = (req, res) => {
  // req.assert('email', 'Email is not valid').isEmail();
  // req.assert('password', 'Password must be at least 4 characters long').len(4);
  // req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);
  // req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  // const errors = req.validationErrors();

  // if (errors) {
  //   req.flash('errors', errors);
  //   return res.redirect('/home');
  // }
  console.log(req.body.game);

  res.redirect('/');
  // const user = new User({
  //   email: req.body.email,
  //   password: req.body.password
  // });

  // User.findOne({ email: req.body.email }, (err, existingUser) => {
  //   if (err) { return next(err); }
  //   if (existingUser) {
  //     req.flash('errors', { msg: 'Account with that email address already exists.' });
  //     return res.redirect('/signup');
  //   }
  //   user.save((err) => {
  //     if (err) { return next(err); }
  //     req.logIn(user, (err) => {
  //       if (err) {
  //         return next(err);
  //       }
  //       res.redirect('/');
  //     });
  //   });
  // });
};

exports.fillPokemon = (req, res) => {
  const P = new Pokedex();

  console.log('filling');


  P.getPokemonByName('eevee').then(function (response) {
    console.log(response);
  }).catch(function (error) {
    console.log('There was an ERROR: ', error);
  });

  // request.get('https://news.ycombinator.com/', (err, request, body) => {
  // if (err) { return next(err); }
  // const $ = cheerio.load(body);

  // const pokemon = new Pokemon({
  //   email: body.email,
  //   password: body.password
  // });
  // // const links = [];
  // // $('.title a[href^="http"], a[href^="https"]').each((index, element) => {
  // //   links.push($(element));
  // // });

  // pokemon.save((err) => {
  //   if (err) { return next(err); }
  //   req.logIn(pokemon, (err) => {
  //     if (err) {
  //       req.flash('errors', err);
  //       return next(err);
  //     }
  //     // res.redirect('/');
  //   });
  // });

  // req.flash('success', pokemon);
  res.redirect('/');
  // });
};