import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPost } from '../../../redux/postsRedux';


const PostForm = () => {
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [content, setContent] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSubmit = e => {
    e.preventDefault();
    navigate("/", { replace: true });
    dispatch(addPost({ title, shortDescription, content, publishedDate, author}));
  }

  return(
    <Form onSubmit={handleSubmit}> 

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Title </Form.Label>
        <Form.Control  placeholder='Enter title' value={title} onChange={e => setTitle(e.target.value)} />
      </Form.Group> 

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Author </Form.Label>
        <Form.Control  placeholder='Enter author' value={author} onChange={e => setAuthor(e.target.value)} />
      </Form.Group> 

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Published date </Form.Label>
        <Form.Control type='text' placeholder='Enter date dd-mm-yyyy' value={publishedDate} onChange={e => setPublishedDate(e.target.value)} />
      </Form.Group> 

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Short description </Form.Label>
        <Form.Control as="textarea" rows={3} placeholder='Leave a comment here' value={shortDescription} onChange={e => setShortDescription(e.target.value)} />
      </Form.Group> 

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Main content </Form.Label>
        <Form.Control as="textarea" rows={3} placeholder='Leave a comment here' value={content} onChange={e => setContent(e.target.value)} />
      </Form.Group>

      <Button variant="primary" onClick={handleSubmit}>
        Add post
      </Button>
    </Form>

  );
};

export default PostForm;