import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    try {
        
        res.render('index.ejs', { data: null, userName: null });
    } catch (error) {
        console.log(error)
        res.render("ERROR");
    }
});

app.post('/', async (req, res) => {
    try {
       const jokeType = req.body.jokeType;
        const selectedCategories = req.body.categories;
        const userName = req.body.name;
        

        if (jokeType === 'any') {
            const response = await axios.get('https://v2.jokeapi.dev/joke/Any');
            const result = response.data;
            

            res.render('index.ejs', { userName, selectedCategories, data: result });
        } else if (jokeType === 'custom') {
            // Check if at least one category is selected
            if (selectedCategories.length === 0) {
               
                return res.render('index.ejs', { userName, selectedCategories, data: null, error: 'Select at least one category for custom jokes.' });
            }

            // Build the API endpoint based on selected categories
            try {
               const apiEndpoint = `https://v2.jokeapi.dev/joke/${selectedCategories}
               `;

               const response = await axios.get(apiEndpoint);
                const result = response.data;
                
                res.render('index.ejs', { userName, selectedCategories, data: result });
            } catch (error) {
                console.error('Error fetching jokes:', error.message);
                res.render('index.ejs', { userName, selectedCategories, data: null, error: 'Error fetching jokes.' });
            }
            
        } else {
            // Handle other cases or provide an error message
            res.render('ERROR');
        }
    } catch (error) {
        console.log(error)
        res.render("ERROR");
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
