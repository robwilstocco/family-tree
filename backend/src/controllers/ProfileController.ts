import {Request, Response} from 'express';
import connection from '../database/connection';

class profileController {
  async index(request : Request, response : Response){
    const tree_id = request.headers.authorization;

    const persons = await connection('persons')
      .select('*')
      .where('tree_id',tree_id);

    return response.json(persons);
  }
}

export default profileController;