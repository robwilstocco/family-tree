const connection = require('../database/connection');

module.exports = {
  async create(request, response){
    const {id} = request.body;

    const tree = await connection('trees')
      .where('id',id)
      .select('family_name')
      .first();

    if(!tree){
      return response.status(400).json({error: "No Tree found with this ID!"})
    }

    return response.json(tree);
  }
}