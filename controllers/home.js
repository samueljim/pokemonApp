const Pokedex = require('pokedex-promise-v2');
const recrawler = require('recrawler');
const P = new Pokedex();
const Pokemon = require('../models/Pokemon');
// const cheerio = require('cheerio');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res, next) => {
  Pokemon.find({
    versions: 'red'
  }, (err, pokies) => {
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
  req.assert('game', 'Not a pokemon game').isIn(["white-2", "black-2", "white", "black", "soulsilver", "heartgold", "platinum", "pearl", "diamond", "leafgreen", "firered", "emerald", "sapphire", "ruby", "crystal", "silver", "gold", "yellow", "blue", "red"]);
  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/');
  }
  console.log(req.body.game);

  Pokemon.find({
    versions: req.body.game
  }, (err, pokies) => {
    if (err) {
      res.redirect('/');
      return next(err);
    }
    // console.log(req.body.game);
    res.render('home', {
      title: req.body.game,
      pokies,
      version: req.body.game,
    });
  });
};

exports.fillPokemon = (req, res, next) => {
  console.log('filling');
  // var i = 0;
  for (var i = 0; i < 1; i++) {
    P.getPokemonByName(1 + i)
      .then(function (response) {
        var games = [];
        for (game in response.game_indices) {
          games.push(response.game_indices[game].version.name);
        }
        console.log('https://bulbapedia.bulbagarden.net/wiki/' + response.name);

        recrawler('https://bulbapedia.bulbagarden.net/wiki/' + response.name)
        .then($ => {
            $('.roundy').each(function () {
                const url = $(this).attr('a')
                console.log(url)
            })
        })
{/* <td class="roundy" style="background:#FFF; padding-left: 5px;"> <a href="/wiki/Starter_Pok%C3%A9mon" title="Starter Pokémon">Starter Pokémon</a> from <a href="/wiki/Professor_Oak" title="Professor Oak">Professor Oak</a> in <a href="/wiki/Pallet_Town" title="Pallet Town">Pallet Town</a>
</td> */}
        // const pokemon = new Pokemon({
        //   versions: games,
        //   name: response.name,
        //   height: response.height,
        //   weight: response.weight,
        //   id: response.id,
        //   order: response.order,
        //   location_area_encounters: response.location_area_encounters,
        //   sprite: response.sprites.front_default,
        //   sprite2: response.sprites.back_default
        // });

      //   pokemon.save((err) => {
      //     if (err) {
      //       req.flash('errors', err);
      //       return next(err);
      //     }
      //     console.log(response.id);
      //   });
      }).catch(function (error) {
        console.log('There was an ERROR: ', error);
        return next(error);
      });
  }
};
