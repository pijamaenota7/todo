import { ChangeEvent, KeyboardEvent, useState } from "react";
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField/TextField';
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton/IconButton";
import Box from "@mui/material/Box/Box";
import { filterButtonsContainerSx } from "./Todolist.styles";

type PropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({ addItem }: PropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }
    return (
        <Box sx={filterButtonsContainerSx}>
            {/*<input*/}
            {/*	className={error ? 'error' : ''}*/}
            {/*	value={title}*/}
            {/*	onChange={changeItemHandler}*/}
            {/*	onKeyUp={addItemOnKeyUpHandler}*/}
            {/*/>*/}

            <TextField
                value={title}
                onChange={changeItemHandler}
                onKeyUp={addItemOnKeyUpHandler}
                id="outlined-basic"
                error={!!error}
                helperText={error}
                label="Enter a title"
                variant="outlined"
                size='small'
            />
            <IconButton onClick={addItemHandler} color={'primary'}>
                <AddBoxIcon />
            </IconButton>
            {/* <Button variant="contained" onClick={addItemHandler}>+</Button> */}
            {/*{error && <div className={'error-message'}>{error}</div>}*/}
        </Box>
    )
}


