import React, {ChangeEvent, useState} from 'react';

type SpanType = {
    oldTitle: string
    callback: (newTitle: string) => void
}
export const EditableSpan = (props: SpanType) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.oldTitle)
    const editHandler = () => {
        setEdit(!edit)
        if (edit) {
            updateTitle()
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const updateTitle = () => {
        props.callback(newTitle)
    }
    return (
        edit ? <input value={newTitle} onChange={onChangeHandler} type="text" onBlur={editHandler} autoFocus/>
            : <span onDoubleClick={editHandler}>{props.oldTitle}</span>

    );
};

