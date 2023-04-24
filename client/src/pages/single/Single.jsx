import './single.scss';
import SinglePost from '../../components/singlePost/SinglePost';
import Sidebar from '../../components/sidebar/Sidebar';

export default function Single() {
  return (
    <div className='single'>
      <div className="left">
      <SinglePost />
      </div>

      <div className="right">
      <Sidebar />
      </div>
      
      
    
  
 
    </div>
  )
}
