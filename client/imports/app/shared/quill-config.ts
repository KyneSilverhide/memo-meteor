import { QuillConfig } from 'ngx-quill';
import { QuillToolbarConfig } from 'ngx-quill/src/quill-editor.interfaces';

export const TOOLBARS: QuillToolbarConfig = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
  ['link'] // link and image, video
];

export const QUILLCONFIG: QuillConfig = {
  modules: {
    syntax: false,
    toolbar: TOOLBARS
  }
};
