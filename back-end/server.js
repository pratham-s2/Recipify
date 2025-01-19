const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const { htmlToText } = require("html-to-text");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.CONNECTION_HOST,
    user: process.env.CONNECTION_USER,
    password: process.env.CONNECTION_PASSWORD,
    database: process.env.CONNECTION_DATABASE
})

async function getSpoonData() {
    //this function fetches a random recipe from spoonacular and organizes its data based on the websites need
    //the function then queries the database and inserts the data into a recipes table and ingredients table
    //the ingredients table has a foriegn key relating each ingredient back to the recipe from which it is from
    try{
        let spoonDataResponse = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.API_KEY}&number=40`);
        let spoonDataUnclean = await spoonDataResponse.json();
        let recipeData = null;
        for (let i = 0; i<40; i++){
            let ingredientsList = spoonDataUnclean.recipes[i].extendedIngredients.map((item)=>item.name)
            ingredientsList = ingredientsList.join(", ");
            console.log(ingredientsList);

            let instructions = ""
            for (let j = 0; j<spoonDataUnclean.recipes[i].analyzedInstructions[0].steps.length; j++){
                instructions += (spoonDataUnclean.recipes[i].analyzedInstructions[0].steps[j].step + " ");
            }
            console.log(instructions);

            //get the first sentence of the summary
            let summary = spoonDataUnclean.recipes[i].summary;
            summary = htmlToText(summary);
            summary = summary.split(/[!.?]/)[0];
            summary = summary.trim();
            summary += "."
            
                
            recipeData = {
                imageSrc: spoonDataUnclean.recipes[i].image,
                recipeName: spoonDataUnclean.recipes[i].title,
                altText: 'Photo of ' + spoonDataUnclean.recipes[i].title,
                timeToCook: spoonDataUnclean.recipes[i].readyInMinutes,
                ingredientsLength: spoonDataUnclean.recipes[i].extendedIngredients.length,
                ingredientsList: ingredientsList,
                vegetarian: spoonDataUnclean.recipes[i].vegetarian,
                vegan: spoonDataUnclean.recipes[i].vegan,
                summary: summary,
                id: spoonDataUnclean.recipes[i].id,
                isFavourite: 0,
                instructions: instructions
            }
            db.query("INSERT INTO recipes (id, imageSrc, recipeName, altText, timeToCook, ingredientsLength, ingredientsList, vegetarian, vegan, summary, isFavourite, instructions) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
                [   
                    recipeData.id, 
                    recipeData.imageSrc, 
                    recipeData.recipeName, 
                    recipeData.altText, 
                    recipeData.timeToCook, 
                    recipeData.ingredientsLength, 
                    recipeData.ingredientsList, 
                    recipeData.vegetarian, 
                    recipeData.vegan, 
                    recipeData.summary,
                    recipeData.isFavourite,
                    recipeData.instructions
                ],
                (err,results)=>{
                    if(err)
                    {
                        console.error(err);
                    }
                    else{
                        console.log(results)
                    }            
                }
            )
            //make an array of ingredients for each recipe
            let ingredients = []
            for (let j = 0; j<recipeData.ingredientsLength; j++){
                let ingredientItem = []
                ingredientItem.push(spoonDataUnclean.recipes[i].id);
                ingredientItem.push(spoonDataUnclean.recipes[i].extendedIngredients[j].name);
                ingredientItem.push(spoonDataUnclean.recipes[i].extendedIngredients[j].measures.metric.amount);
                ingredientItem.push(spoonDataUnclean.recipes[i].extendedIngredients[j].measures.metric.unitShort);
                ingredients.push(ingredientItem);
            }
            console.log(ingredients);
            
            //store ingredients in ingredients table
            db.query("INSERT INTO ingredients (recipe_id, ingredient, amount, unit) VALUES ?",[ingredients],
                (err,results)=>{
                    if(err){
                        console.error(err);
                    }
                    else{
                        console.log(results);
                    }
                }
            )
        }  
    }
    catch(error){
        console.error(error);
    }
}

app.get("/recipes", (req, res) => {
    // SQL query to join recipes and ingredients
    const query = `
        SELECT 
            r.id as recipe_id, 
            r.imageSrc, 
            r.recipeName, 
            r.altText, 
            r.timeToCook, 
            r.ingredientsLength, 
            r.ingredientsList, 
            r.vegetarian, 
            r.vegan, 
            r.summary, 
            r.isFavourite, 
            r.instructions,
            r.num,
            i.ingredient, 
            i.amount, 
            i.unit
        FROM 
            recipes r
        LEFT JOIN 
            ingredients i ON r.id = i.recipe_id
    `;

    // Execute the query
    db.query(query, (err, results) => {
        if (err) {
            // Handle error
            return res.status(500).json({ errorMessage: err.message });
        }

        // Group ingredients by recipe_id
        const recipes = results.reduce((acc, row) => {
            const { recipe_id, ingredient, amount, unit, ...recipeData } = row;

            // Check if the recipe already exists in the accumulator
            if (!acc[recipe_id]) {
                // Create a new entry for the recipe
                acc[recipe_id] = { ...recipeData, recipe_id, ingredients: [] };
            }

            // Add the ingredient to the recipe's ingredients array
            if (ingredient) {
                acc[recipe_id].ingredients.push({ ingredient, amount, unit });
            }

            return acc;
        }, {});

        // Convert the grouped object into an array
        const response = Object.values(recipes);

        // Send the combined recipes and ingredients as JSON
        res.json(response);
        console.log("success")
    });
});



app.post("/signup",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password){
        return res.status(400).json({error: "Username and password are required"})
    }
    
    db.query("INSERT INTO users (username, password) VALUES (?,?)",[username,password],
        (error,results)=>{
            if(error){
                res.status(400).json({errorMessage: error.message});
            }
            else{
                res.status(200).json({successMessage: "Successfully added user"});
            }
        })
})

app.get("/search", 
    (req,res)=>{
        const searchQuery = req.query.searchQuery;
        const query = `
        SELECT 
            r.id as recipe_id, 
            r.imageSrc, 
            r.recipeName, 
            r.altText, 
            r.timeToCook, 
            r.ingredientsLength, 
            r.ingredientsList, 
            r.vegetarian, 
            r.vegan, 
            r.summary, 
            r.isFavourite, 
            r.instructions,
            r.num,
            i.ingredient, 
            i.amount, 
            i.unit
        FROM 
            recipes r
        LEFT JOIN 
            ingredients i ON r.id = i.recipe_id
        WHERE 
            r.recipeName LIKE ?`;

    // Execute the query with the searchQuery
    db.query(query, [`%${searchQuery}%`],
        (err,results)=>{ 
            if (err){
                res.status(400).json("Couldnt find any recipes")
            }
            else{
                   // Group ingredients by recipe_id
                const recipes = results.reduce((acc, row) => {
                    const { recipe_id, ingredient, amount, unit, ...recipeData } = row;

                    // Check if the recipe already exists in the accumulator
                    if (!acc[recipe_id]) {
                        // Create a new entry for the recipe
                        acc[recipe_id] = { ...recipeData, recipe_id, ingredients: [] };
                    }

                    // Add the ingredient to the recipe's ingredients array
                    if (ingredient) {
                        acc[recipe_id].ingredients.push({ ingredient, amount, unit });
                    }

                    return acc;
                }, {});

                // Convert the grouped object into an array
                const response = Object.values(recipes);

                // Send the combined recipes and ingredients as JSON
                res.json(response);
                console.log("success")
                    }
                })
    }
)

app.listen(3000,()=>{console.log("listening")});