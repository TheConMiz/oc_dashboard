import React, { Fragment, useState } from 'react'
import { Button, Paper, TextField, Typography } from '@mui/material';
class WordList {

    // Define a basic constructor.
    constructor(name, contents) {
        this.name = name;
        this.contents = contents;
    }

    updateWordList(newWords) {
        let existingWords = [...this.contents];
        existingWords.push(newWords);
        this.contents = existingWords;
        // console.log("New words of " + this.name + ": " + existingWords.toString());
    }

    set new_contents(new_contents) {
        this.contents = new_contents;
    }
}


const App = () => {
    /**
     * DATA STRUCTURE - 
     * 
     * One WordList has a name and contents.
     * 
     * {
     *      "name": "____",
     *      "contents": []
     * }
     * 
     * 
     * One List Collection has many WordLists.
     * 
     * listColl = [
     *      {}, {}, {}
     * ]
     * 
     */

    // Define constant values
    const LIST_COLL_NAME_ROOT = "list_";
    const DELETE = "d";
    const UPDATE = "u";
    
    // Define React state for a collection of word lists.
    const [listCollection, setListCollection] = useState([]);
    // Define React state for an array of selected words.
    const [selectedWords, setSelectedWords] = useState([]);
    //! Method for shuffling the contents of a WordList.
    // Based on the Fisher-Yates algorithm.
    const shuffleList = () => {
        let m = this.contents.length, t, i;
        // While there remain elements to shuffle
        while (m) {
            // Pick a remaining element
            i = Math.floor(Math.random() * m--);
            // And swap it with the current element.
            t = this.contents[m];
            this.contents[m] = this.contents[i];
            this.contents[i] = t;
        }
        // Return a sorted array.
        return this.contents;
    }

    // Function for creating and adding a blank list to the list collection.
    const addWordList = () => {
        // Determine the length of the existing list collection.
        let newIndex = listCollection.length;
        // Determine the dummy name for the new list collection.
        let newName = LIST_COLL_NAME_ROOT + newIndex;
        // console.log(newName)
        // Define a new WordList with a dummy name and no contents.
        let newWordList = new WordList(newName, []);
        // Append the new word list to the list collection.
        let tempListCollection = [...listCollection];
        tempListCollection.push(newWordList);
        // console.log(tempListCollection);
        // Update the list collection's state.
        setListCollection(tempListCollection);
    }

    const updateWordList = (listId, newWordList) => {
        
        // if (update_type.toLowerCase() === UPDATE) {

        //     let newListColl = Object.assign({}, listColl);

        //     newListColl[list_id] = input_list;
            
        //     setListColl(newListColl);

        // }

        // else if (update_type.toLowerCase() === DELETE) {
        // Duplicate the current list collection
        let tempListCollection = Object.assign({}, listCollection);
        // Find the correct word list, and append the provided word list to it.
        tempListCollection.find(wordList => wordList.name === listId).contents.push(newWordList);
        // Replace the existing list collection with the new one.
        setListCollection(tempListCollection);
        console.log(listCollection)
        // }

    }

    // Basic method for generating random strings to be used as ID/key values.
    // const generateRandomString = (length) => {
    //     let result = "";
    //     let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
            
    //     for (let i = 0; i < length; i++) {
    //         result += characters.charAt(Math.floor(Math.random() * characters.length))
    //     }

    //     return result;
    // }

    const splitString = (input_string) => {
        // console.log(input_string)
        //TODO: Account for the ", " delimiter.
        //! Expectation: Comma to delimit names, spaces for phrases.
        let output_list = input_string.split(",");
        // Return the output array.
        return output_list;

    }

    return (

        <Fragment>
            <div>
                <Button onClick={addWordList}>
                    Add List
                </Button>

            </div>

            <div>
                {
                    // console.log(listCollection)
                    listCollection.map(listItem => {
                        return (
                            <div key={listItem.name} style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "row"
                            }}>
                                <Typography variant='h5'>
                                    {listItem.name}
                                </Typography>
                                <Button>Left</Button>
                                <Button>Right</Button>

                                <Paper
                                    style={{height: "95vh", width: "100px"}}
                                >
                                    <TextField onKeyDown={(e) => {
                                        //TODO: Need to handle case where all whitespace or other weird things are added.
                                        if (e.keyCode === 13 && e.target.value.length > 0) {
                                            // Parse the string and turn it into a list
                                            let words = splitString(e.target.value);
                                            //TODO: Append the parsed list item to the existing list item.
                                            // setUpdatedList(parsedListItem);                         
                                            let wordListKey = listItem.name;
                                            // Update the contents of the corresponding word list
                                            let item = listCollection.find(wordList => wordList.name === wordListKey);
                                            item.updateWordList(words);
                                            // Empty the field.
                                            e.target.value = "";     
                                        }
                                    }}>

                                    </TextField>

                                    <Button>
                                        Add
                                    </Button>

                                    {listItem.contents.map(word => {
                                        
                                        return (
                                            <Typography>
                                                {word}
                                            </Typography>
                                        );
                                    })}

                                </Paper>
                                <Button>
                                    Clear
                                </Button>
                            </div>

                        )
                    })
                } 


            </div>

        </Fragment>
    


  
    
    )
}

export default App