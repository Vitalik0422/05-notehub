import { Field, Form, Formik, type FormikHelpers } from 'formik';
import css from './NoteForm.module.css';
import type { GetNoteRequest } from '../../types/note';
import { NoteSchema } from '../../schemas/noteSchema';

interface NoteFormProps {
  submitNoteData: (data: GetNoteRequest) => Promise<void>;
  onClose: () => void;
}

const NoteForm = ({ submitNoteData, onClose }: NoteFormProps) => {
  const initialValues: GetNoteRequest = {
    title: '',
    content: '',
    tag: 'Todo',
  };

  const createNote = async (
    values: GetNoteRequest,
    actions: FormikHelpers<GetNoteRequest>,
  ) => {
    try {
      await submitNoteData(values);
      actions.resetForm();
      onClose();
    } catch {
      //
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NoteSchema}
      onSubmit={createNote}
    >
      {({ errors, touched, dirty, isValid, isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field
              name="title"
              id="title"
              as="input"
              rows={8}
              className={css.input}
            />
            {errors.title && touched.title && (
              <span className={css.error}>{errors.title}</span>
            )}
          </div>
          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              name="content"
              id="content"
              as="textarea"
              className={css.textarea}
              rows={8}
            />
            {errors.content && touched.content && (
              <span className={css.error}>{errors.content}</span>
            )}
          </div>
          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field name="tag" id="tag" as="select" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
          </div>
          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={!isValid || !dirty || isSubmitting}
            >
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;
