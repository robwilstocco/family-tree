import {Request, Response} from 'express';
import connection from '../database/connection';

class treeController{
  async index (request : Request, response : Response){

    const trees = await connection('trees').select('*');
    return response.json(trees);

  }
  
  async create (request : Request, response : Response){
    const {family_name} = request.body;

    await connection('trees').insert({
      family_name
      })
      return response.json();
  }
}
export default treeController;