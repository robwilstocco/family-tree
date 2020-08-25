import {Request, Response} from 'express';
import connection from '../database/connection';

class sessionController {

  async create(request : Request, response : Response){
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
  }

  async index(request : Request, response : Response){
    const {max_id} : any = await connection ('trees')
      .max('id',{ as: 'max_id' })
      .first();

    return response.json(max_id);
  }
}

export default sessionController;