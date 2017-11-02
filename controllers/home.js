
const Pokedex = require('pokedex-promise-v2');

const P = new Pokedex();
const Pokemon = require('../models/Pokemon');

// const cheerio = require('cheerio');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res, next) => {
  Pokemon.find({ versions: 'red' }, (err, pokies) => {
    if (err) {
      res.redirect('/');
      return next(err);
    }
    res.render('home', {
      title: 'Home',
      pokies
    });
  });
};

/**
 * POST /poekmon
 * find's a pokemon
 */
exports.getPokemon = (req, res, next) => {
  req.assert('game', 'Not a pokemon game').isIn(["white-2", "black-2", "white", "black", "soulsilver", "heartgold", "platinum", "pearl",  "diamond", "leafgreen",  "firered",  "emerald", "sapphire", "ruby", "crystal", "silver", "gold", "yellow", "blue", "red"]);


  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    // return res.redirect('/');
  }
  console.log(req.body.game);

  // res.redirect('/');

  Pokemon.find({ versions: req.body.game }, (err, pokies) => {
    if (err) {
      res.redirect('/');
      return next(err);
    }
    // console.log(req.body.game);
    res.render('home', {
      title: 'Home',
      pokies
    });
  });
};

exports.fillPokemon = (req, res, next) => {
  console.log('filling');
  var i = 0;
  for (i = 210; i < 220; i++) {
    P.getPokemonByName(1 + i)
    .then(function(response) {
      var games = [];
      for (game in response.game_indices) {
        games.push(response.game_indices[game].version.name);
      }
      // console.log(games);
      
      const pokemon = new Pokemon({
        versions: games,
        name: response.name,
        height: response.height,
        weight: response.weight,
        id: response.id,
        order: response.order,
        location_area_encounters: response.location_area_encounters,
        sprite: response.sprites.front_default,
        sprite2: response.sprites.back_default
      });
      
      pokemon.save((err) => {
        if (err) {
            req.flash('errors', err);
            return next(err);
          }
          // res.redirect('/');
          console.log(response.id);
        });
    }).catch(function(error) {
      console.log('There was an ERROR: ', error);
      return next(error);
    });
    // // req.flash('success', pokemon);
    // // res.redirect('/');
    // res.send('done');
    // });
  }
  // console.log('done');
};
