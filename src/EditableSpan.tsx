import React, {useState} from 'react';

type SpanType = {
    oldTitle: string
}
export const EditableSpan = (props: SpanType) => {
    const [edit, setEdit] = useState(false)
    const editHandler = () => {
        setEdit(!edit)
    }

    return (
        edit ? <input type="text" onBlur={editHandler} autoFocus/>
            : <span onDoubleClick={editHandler}>{props.oldTitle}</span>

    );
};

