import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';


const PostForm = ({ action, actionText, ...props }) => {
  const [title, setTitle] = useState(props.title || '');
  const [author, setAuthor] = useState(props.author || '');
  const [publishedDate, setPublishedDate] = useState(props.publishedDate || '');
  const [shortDescription, setShortDescription] = useState(props.shortDescription || '');
  const [content, setContent] = useState(props.content || '');
  const [contentError, setContentError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [category, setCategory] = useState(props.category || '');
 
  const { register, handleSubmit: validate, formState: { errors } } = useForm();

  const handleSubmit = (e) => {
    setContentError(!content)
    setDateError(!publishedDate)
    if(content && publishedDate) {
      action({ title, author, publishedDate, shortDescription, content, category });
    }
  };

  return(
    <Form onSubmit={validate(handleSubmit)}> 

     <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control
          {...register('title', { required: true, minLength: 3 })}
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text"
          placeholder="Enter title"
          name='title'
        />
        {errors.title && 
          <small className='d-block form-text text-danger mt-2'>
            This field is required (min 3 characters)
          </small>
        }
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Author </Form.Label>
        <Form.Control 
          {...register('author', { required: true, minLength: 3 })} 
          placeholder='Enter author' 
          value={author} 
          onChange={e => setAuthor(e.target.value)} 
        />
        {errors.author && <small className="d-block form-text text-danger mt-2">
          Author is too short (min is 3)</small>}
      </Form.Group> 

      <Form.Group className='mb-3 w-50'>
        <Form.Label>Published</Form.Label>
        <DatePicker 
          selected={publishedDate} 
          onChange={(date) => setPublishedDate(date)} 
        />
        {dateError && <small className="d-block form-text text-danger mt-2">
          Date can't be empty</small>}
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label>Disabled select menu</Form.Label>
        <Form.Select
          {...register('category', { required: true })}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Select category...</option>
          <option value='Sport'>Sport</option>
          <option value='Movies'>Movies</option>
          <option value='News'>News</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Short description </Form.Label>
        <Form.Control 
          {...register('shortDescription', { required: true, minLength: 20 })}
          as="textarea" 
          rows={3} 
          placeholder='Leave a comment here' 
          value={shortDescription} 
          onChange={e => setShortDescription(e.target.value)} 
        />
        {errors.shortDescription && <small className="d-block form-text text-danger mt-2">
          Description is too short min is 20</small>}
      </Form.Group> 
      <Form.Group className='mb-3 w-75'>
        <Form.Label>Main content</Form.Label>
        <ReactQuill 
          value={content} 
          onChange={setContent} 
          placeholder='Leave a comment here' 
        />
        {contentError && <small className="d-block form-text text-danger mt-2">
          Content can't be empty</small>}
      </Form.Group>

      <Button variant="primary" type='submit'>
       {actionText}
      </Button>
    </Form>

  );
};

export default PostForm;