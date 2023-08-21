import React, {ChangeEvent, useState} from 'react';

type SpanType = {
    oldTitle: string
}
export const EditableSpan = (props: SpanType) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.oldTitle)
    const editHandler = () => {
        setEdit(!edit)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    return (
        edit ? <input value={newTitle} onChange={onChangeHandler} type="text" onBlur={editHandler} autoFocus/>
            : <span onDoubleClick={editHandler}>{props.oldTitle}</span>

    );
};

