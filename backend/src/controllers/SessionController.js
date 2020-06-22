const connection = require('../database/connection');

module.exports = {
  async create(request, response){
    const {id} = request.body;

    const tree = await connection('trees')
      .join('persons','trees.id','=','persons.tree_id')
      .where('trees.id',id)
      .select('trees.family_name','trees.id','persons.id_person')
      .first();

    const data = {tree};
    if(!tree){
      return response.status(400).json({error: "No Tree found with this ID!"})
    }

    return response.json(data);
  },

  async index(request,response){
    const {max_id} = await connection ('trees')
      .max('id',{as: 'max_id'})
      .first();

    return response.json(max_id);
  }
}