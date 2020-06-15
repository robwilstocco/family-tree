const connection = require('../database/connection');

module.exports = {
  async index(request, response){
    const tree_id = request.headers.authorization;

    const persons = await connection('persons')
      .select('*')
      .where('tree_id',tree_id);

    return response.json(persons);
  }
}