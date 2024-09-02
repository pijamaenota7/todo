import TextField from '@mui/material/TextField/TextField';
<<<<<<< HEAD
import React, { ChangeEvent, KeyboardEvent, memo, useState } from 'react';
import { IconButton } from "@mui/material";
import { AddBox } from "@mui/icons-material";
=======
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton} from "@mui/material";
import {AddBox} from "@mui/icons-material";
>>>>>>> b02bb755378cbca84f4838614b73c2527a867893

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

<<<<<<< HEAD
export const AddItemForm = memo((props: AddItemFormPropsType) => {
=======
export function AddItemForm(props: AddItemFormPropsType) {
>>>>>>> b02bb755378cbca84f4838614b73c2527a867893
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
<<<<<<< HEAD
        if (error) setError(null);

=======
        setError(null);
>>>>>>> b02bb755378cbca84f4838614b73c2527a867893
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        <TextField variant="outlined"
<<<<<<< HEAD
            error={!!error}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            label="Title"
            helperText={error}
=======
                   error={!!error}
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   label="Title"
                   helperText={error}
>>>>>>> b02bb755378cbca84f4838614b73c2527a867893
        />
        <IconButton color="primary" onClick={addItem}>
            <AddBox />
        </IconButton>
    </div>
<<<<<<< HEAD
})
=======
}
>>>>>>> b02bb755378cbca84f4838614b73c2527a867893
