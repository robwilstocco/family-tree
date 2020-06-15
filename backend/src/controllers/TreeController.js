const connection = require ('../database/connection');

module.exports = {
  async index (request,response){

    const trees = await connection('trees').select('*');
    return response.json(trees);

  },
  
  async create (request,response){
    const {family_name} = request.body;

    await connection('trees').insert({
      family_name
      })
    
      return response.json();
  }
};