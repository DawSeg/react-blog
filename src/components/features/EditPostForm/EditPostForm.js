import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import PostForm from '../PostForm/PostForm';
import { editPost, getPostById } from '../../../redux/postsRedux';


const EditPostForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id} = useParams();
  const postData = useSelector(state => getPostById(state, id));

  const handleSubmit = post => {
    dispatch(editPost({ ...post, id }));
    navigate('/')
  };
  if (!postData) return <Navigate to='/' />;

  return (
    <PostForm id={id} action={handleSubmit} actionText='Edit post'
      title={postData.title}
      author={postData.author}
      publishedDate={postData.publishedDate}
      category={postData.category}
      shortDescription={postData.shortDescription}
      content={postData.content}
    />
  )
};

export default EditPostForm;