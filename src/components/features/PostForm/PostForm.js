import { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';

const PostForm = ({ action, actionText, ...props }) => {
  const [title, setTitle] = useState(props.title || '');
  const [author, setAuthor] = useState(props.author || '');
  const [publishedDate, setPublishedDate] = useState(props.publishedDate || '');
  const [shortDescription, setShortDescription] = useState(
    props.shortDescription || ''
  );
  const [content, setContent] = useState(props.content || '');
  const [dateError, setDateError] = useState(false);
  const [contentError, setContentError] = useState(false);

  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const handleSubmit = (e) => {
    setContentError(!content);
    setDateError(!publishedDate);
    if (content && publishedDate) {
      action({ title, author, publishedDate, shortDescription, content });
    }
  };

  return (
    <Form onSubmit={validate(handleSubmit)}>
      <Form.Group className='mb-3 w-50'>
        <Form.Label>Title</Form.Label>
        <Form.Control
          {...register('title', { required: true, minLength: 3 })}
          type='text'
          placeholder='Enter title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></Form.Control>
        {errors.title && (
          <span className='d-block form-text text-danger mt-2'>
            This field is required (min 3 characters)
          </span>
        )}
      </Form.Group>
      <Form.Group className='mb-3 w-50'>
        <Form.Label>Author</Form.Label>
        <Form.Control
          {...register('author', { required: true, minLength: 3 })}
          type='text'
          placeholder='Enter author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        ></Form.Control>
        {errors.author && (
          <span className='d-block form-text text-danger mt-2'>
            This field is required (min. 3 characters)
          </span>
        )}
      </Form.Group>
      <Form.Group className='mb-3 w-50'>
        <Form.Label>Published</Form.Label>
        <DatePicker
          selected={publishedDate}
          onChange={(date) => setPublishedDate(date)}
        />
        {dateError && (
          <small className='d-block form-text text-danger mt-2'>
            This field is required
          </small>
        )}
      </Form.Group>
      <Form.Group className='mb-3 w-75'>
        <Form.Label>Short description</Form.Label>
        <FloatingLabel
          controlId='floatingTextarea2'
          label='Leave a comment here'
          className='text-muted'
        >
          <Form.Control
            {...register('shortDescription', {
              required: true,
              minLength: 20,
            })}
            as='textarea'
            placeholder='Leave a comment here'
            style={{ height: '100px' }}
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
          {errors.shortDescription && (
            <span className='d-block form-text text-danger mt-2'>
              This field is required (min. 20 characters)
            </span>
          )}
        </FloatingLabel>
      </Form.Group>
      <Form.Group className='mb-3 w-75'>
        <Form.Label>Main content</Form.Label>
        <ReactQuill
          theme='snow'
          placeholder='Leave a comment here'
          style={{ height: '200px' }}
          value={content}
          onChange={setContent}
        />
        {contentError && (
          <small className='d-block form-text text-danger mt-2'>
            Content can't be empty
          </small>
        )}
      </Form.Group>

      <Button className='mt-5' type='submit' variant='primary'>
        {actionText}
      </Button>
    </Form>
  );
};
export default PostForm;