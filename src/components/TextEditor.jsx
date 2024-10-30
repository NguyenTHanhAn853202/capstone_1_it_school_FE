import { useId, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ['clean'], // remove formatting button
];
function TextEditor({ label, setValue, value }) {
    const id = useId();
    return (
        <div className=" h-[300px]">
            {label && <label htmlFor={id}>{label}</label>}
            <ReactQuill
                id={id}
                value={value}
                onChange={setValue}
                theme="snow"
                modules={{
                    toolbar: toolbarOptions,
                }}
                className="h-[200px]"
            />
        </div>
    );
}

export default TextEditor;
