const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

 // find all categories
  // be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
  
  const categoryData = await Category.findAll({
    include:[{
      model: Product,
      atrributes: ['id','product_name','price','stock','category_id']
    }]
  })
  res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  };
});

 // find one category by its `id` value
  // be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
  

  const categoryData = await Category.findByPk(req.params.id,{
    attributes: ['id', 'category_name'],
    include:[{
      model:Product,
      attributes: ['id','product_name','price','stock','category_id']
    }]
  }) 
  res.status(200).json(categoryData);
  } catch (err) {
      res.status(500).json(err);
  }
  
});

router.post('/', async (req, res) => {
  try {
  // create a new category
  const categoryData = await Category.create({
    category_name:req.body.category_name
  })
  res.status(200).json(categoryData);
  }catch(err){
    res.status(500).json(err);
  };
});

router.put('/:id', async (req, res) => {
  try {
  // update a category by its `id` value
  const categoryData = await Category.update(req.body, 

  {
    where:{
      id: req.params.id
    },
   
  })
  res.status(200).json(categoryData)
  }catch (err){
    res.status(500).json(err);
  }

});

router.delete('/:id',async (req, res) => {
  try {

  // delete a category by its `id` value
  const categoryData = await Category.destroy({
    where:{
      id:req.params.id,
    },
  })
  res.status(200).json(categoryData)
  }catch(err){
    res.status(500).json(err);
  }
});

module.exports = router;
