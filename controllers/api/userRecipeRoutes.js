const router = require('express').Router();
const Recipe = require('../../models/Recipe');


// route to get one recipe
router.get('/:id', async (req, res) => {
    try {
        const recipeData = await Recipe.findByPk(req.params.id);
        if (!recipeData) {
            res.status(404).json({ message: 'No recipe with this id!' });
            return;
        }
        const recipe = recipeData.get({ plain: true });
        res.render('recipe', recipe);
    } catch (err) {
        res.status(500).json(err);
    };
});


  // route to delete a recipe
  router.delete('/:id', async (req, res) => {
    try {
      const recipeData = await Recipe.destroy({
        where: {
          recipe_id: req.params.id,
          user_id: req.session.id,
        },
      });
  
      if (!recipeData) {
        res.status(404).json({ message: 'No recipe found with this id!' });
        return;
      }
  
      res.status(200).json(recipeData);
    } catch (err) {
      res.status(500).json(err);
    }
  })
  
  
  
  // This action method is the Controller. It accepts input and sends data to the Model and the View.
  router.put('/:id', async (req, res) => {
    // It is sending the data to the Model so that one recipe can be updated with new data in the database.
    try {
      const recipe = await Recipe.update(
        {
          dish: req.body.dish,
          dishDesc: req.body.dishDesc,
          ingredients: req.body.ingredients,
          directions: req.body.directions,
          nutrition_facts: req.body.nutrition_facts,
          dishPic: req.body.dishPic
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
  
      // The updated data (dish) is then sent back to handler that dispatched the fetch request.
      res.status(200).json(recipe);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;