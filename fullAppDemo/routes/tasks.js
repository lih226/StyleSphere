import { query } from "../db/postgres.js";
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';

const myTable = 'posts';

const taskRoutes = (app) => {

    app.post('/posts', async (req, res) => {
        const { uri, media_type, description, username } = req.body;

        if(!uri || !media_type || !description || !username){
            return res.status(400).send("Missing required fields: uri, media_type, description, username");
        }

        try {
            const qs = `INSERT INTO ${myTable} (uri, media_type, description, username) VALUES ('${uri}', '${media_type}', '${description}', '${username}') RETURNING *`;
            query(qs).then(result => res.status(201).json(result.rows[0]));
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.get('/posts', async (req, res) => {
        const searchQuery = req.query.search;
        try {
            let qs = `SELECT * FROM ${myTable}`;
            if(searchQuery){
                let searchQueryLower = searchQuery.toLowerCase();
                qs += ` WHERE (LOWER(description) LIKE '%${searchQueryLower}%' OR LOWER(username) LIKE '%${searchQueryLower}%')`;
                query(qs).then(result => {
                    if(result.rows.length){
                        res.status(201).json(result.rows);
                    }
                    else{
                        res.status(404).send("No posts found.");
                    }
                });
            }
            else{
                query(qs).then(result => res.status(201).json(result.rows));
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.get('/posts/:id', async (req, res) => {
        const id = req.params.id;
        if(!uuidValidate(id)){
            return res.status(400).send("Invalid UUID format.");
        }
        try {
            const qs = `SELECT * FROM ${myTable} WHERE id = '${id}'`;
            query(qs).then(result => {
                if(result.rows.length){
                    res.json(result.rows[0]);
                }
                else{
                    res.status(404).send("No posts found.");
                }
            });
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.put('/posts/:id', async (req, res) => {
        const id = req.params.id;
        const { uri, media_type, description } = req.body;

        try {
            //If there's no update
            if(!uri && !media_type && !description){
                res.status(400).send("Missing uri and media_type and description");
            }
            else{
                let qs = `UPDATE ${myTable} SET `;
                if(uri){
                  qs += `uri = '${uri}',`;
                }
                if(media_type){
                  qs += `media_type = '${media_type}',`;
                }
                if(description){
                  qs += `description = '${description}',`;
                }
                //If there's updates, qs will have a comma as its last char so perform the update
                qs = qs.slice(0, -1);
                qs += ` WHERE id = '${id}' RETURNING *`;

                query(qs).then(result => {
                    if(result.rows.length){
                        res.json(result.rows[0]);
                    }
                    else{
                        res.status(404).send("Post not found.");
                    }
                });
            }
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.delete('/posts/:id', async (req, res) => {
        const id = req.params.id;

        try {
            const qs = `DELETE FROM ${myTable} WHERE id = '${id}' RETURNING *`;
            query(qs).then(result => {
                if(result.rows.length){
                    res.json(result.rows[0]);
                }
                else{
                    res.status(404).send("Post not found.");
                }
            });
        } catch (err) {
            res.status(500).send(err);
        }
    });
}

export default taskRoutes