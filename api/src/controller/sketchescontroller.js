import dbConnection from '../db-config.js';
import sketchesQueries  from '../queries/sketchesqueries.js';
import query from '../utils/query.js';


const getSketches = async (req, res) => {

  if(!req.user){
    return res.status(401).send('Unauthorized.');
  }

  const getDbConnection = await dbConnection().catch(err => { throw err});

  const sketches = await query(getDbConnection, sketchesQueries.GET_ALL_SKETCHES, [req.user.id]).catch(err => { 
    return res.status(500).send('Error retrieving sketches from database');
  });
  
  if (!sketches) return;
  res.status(200).send(sketches);
};

const postSketch = async (req, res) => {
    const { name, sketch } = req.body;
    const getDbConnection = await dbConnection().catch(err => { throw err});
  
    if (!req.user.id) {
      return res.status(401).json({ message: "Unauthorized to create a task." });
    }

    if (!req.body.sketch || !req.body.name) {
      return res.status(400).send('Bad Request.');
    }

    const postSketchRequest = await query(getDbConnection, sketchesQueries.INSERT_SKETCH, [req.user.id, name, JSON.stringify(sketch)]).catch(err => { 
      res.status(500).json({ error: err.message });
    });
  
    if (!postSketchRequest) return;

    res.status(200).json({
      message: "Sketch saved successfully.",
      name: name
    });
  };
  


export default { getSketches, postSketch };