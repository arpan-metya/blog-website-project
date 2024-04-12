import { Editor } from '@tinymce/tinymce-react';
import config from '../../config/config';
import { useSelector } from 'react-redux';
import { Container } from '..'
import { Controller } from 'react-hook-form';

function RTE({ name, control, label = '', defaultVal = '' }) {
  const darkMode = useSelector(state => state.theme.darkMode)

  return (
    <>
      <Container bgColor='bg-white dark:bg-neutral-800' flexBox className='p-5 rounded-xl max-w-screen-md'>
        {label && <label className='text-2xl uppercase font-semibold text-neutral-800 dark:text-neutral-200'>
          {label}
        </label>}
        <Controller
          name={name}
          control={control}
          defaultValue={defaultVal}
          render={({ field }) => (
            <Editor
              apiKey={config.tinyMCEKey}
              initialValue={defaultVal}
              init={{
                branding: false,
                width: '100%',
                min_height: 200,
                max_height: 200,
                resize: true,
                skin: `${darkMode ? 'oxide-dark' : 'oxide'}`,
                content_css: `${darkMode ? 'tinymce-5-dark' : 'default'}`,
                plugins: `anchor autolink charmap codesample emoticons image link lists media 
                  searchreplace visualblocks wordcount checklist mediaembed casechange 
                  export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker 
                  permanentpen powerpaste advtable advcode editimage advtemplate mentions 
                  tableofcontents footnotes autocorrect typography inlinecss markdown autoresize`,
                toolbar: 'undo redo | formatselect | ' +
                  'bold italic backcolor forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style: 'body {font - family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
              onEditorChange={field.onChange}
            />
          )}
        />
      </Container>
    </>
  );
}

export default RTE;