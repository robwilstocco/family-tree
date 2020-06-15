const connection = require ('../database/connection');

module.exports = {
  async index(request, response){
    const persons = await connection('persons').select('*');
    return response.json(persons);
  },
  async create(request, response){
    
    const {person_name, person_birthdate,id_parents,id_relation} = request.body;
    const tree_id = request.headers.authorization;

    await connection('persons').insert({
      tree_id,
      person_name,
      person_birthdate,
      id_parents,
      id_relation
    });
    return response.json();
  },

  async delete(request, response){

    const {id_person} = request.params;
    const tree_id = parseInt(request.headers.authorization);

    const person = await connection ('persons')
      .where('id_person',id_person)
      .select('tree_id')
      .first();

      if (person.tree_id != tree_id){
        return response.status(401).json({error: "Operation not permitted!"});
      }

      await connection('persons')
        .where('id_person',id_person).delete();

      return response.status(204).send();

  }
};