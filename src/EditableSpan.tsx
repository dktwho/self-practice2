import React from 'react';

type SpanType = {
    oldTitle: string
}
export const EditableSpan = (props: SpanType) => {
    return (
        <span>{props.oldTitle}</span>
    );
};

