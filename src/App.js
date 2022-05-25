import React, { Fragment, useState } from 'react'
import { Button, Paper, TextField } from '@mui/material';

const App = () => {
    
    const ROOT_LIST_NAME = "list_";
    const DELETE = "d";
    const UPDATE = "u";
        
    const [listColl, setListColl] = useState({});
    const [updatedList, setUpdatedList] = useState({});

    const addList = () => {

        let newListColl = Object.assign({}, listColl);

        let newIndex = Object.keys(newListColl).length;

        newListColl[ROOT_LIST_NAME + newIndex] = [];

        setListColl(newListColl);

    }

    const updateListColl = (input_list, update_type, list_id) => {
        
        if (update_type.toLowerCase() === UPDATE) {

            let newListColl = Object.assign({}, listColl);

            newListColl[list_id] = input_list;
            
            setListColl(newListColl);

        }

        else if (update_type.toLowerCase() === DELETE) {
            
            let newListColl = Object.assign({}, listColl);

            delete newListColl[list_id];

            setListColl(newListColl);
            
        }

    }

    const shuffleList = (input_list) => {
    
        let m = input_list.length, t, i;
      
        // While there remain elements to shuffle…
        while (m) {
            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);
    
            // And swap it with the current element.
            t = input_list[m];
            input_list[m] = input_list[i];
            input_list[i] = t;
        }
      
        return input_list;
    }

    const splitString = (input_string) => {
        console.log(input_string)
        //TODO: Account for the ", " delimiter.
        //! Expectation: Comma to delimit names, spaces for phrases.
        let output_list = input_string.split(",");
        
        return output_list;

    }

    const handleTextEnter = (e) => {
        //TODO: Need to handle case where all whitespace or other weird things are added.
        if (e.keyCode === 13 && e.target.value.length > 0) {
            // Parse the string and turn it into a list
            let parsedListItem = splitString(e.target.value);
            //TODO: Append the parsed list item to the existing list item.
            // setUpdatedList(parsedListItem);
            // Empty the field.
            e.target.value = "";
        }

    }
    

    return (

        <Fragment>
            <div>
                <Button onClick={addList}>
                    Add List
                </Button>

            </div>

            <div>

                {
                    Object.entries(listColl).map((listKey, listItem) => {
                        return (
                            <div>
                                <Button>Left</Button>
                                <Button>Right</Button>

                                <Paper>
                                    <TextField onKeyDown={handleTextEnter}>

                                    </TextField>

                                    <Button>
                                        Add
                                    </Button>

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