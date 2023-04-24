import './post.scss';
import { Link } from 'react-router-dom';


export default function Post({ post }) {
    const PF = 'http://localhost:3000/images/'
    return (
        <div className='post'>

            {post.photo &&
                <img className='postImg' src={PF + post.photo}
                    alt=''
                />
            }

            <div className="postInfo">
                <div className="postCats">
                    {post.categories.map((c) =>(
                        <span className='postCat'>
                            {c.name}
                        </span>
                    ))}
                </div>
                <Link className='postLink' to={`/post/${post._id}`}>
                <span className='postTitle'>
                    {post.title}
                </span>
                </Link>
               
                <hr />
                <span className='postDate'>
                    {new Date(post.createdAt).toDateString()}
                </span>
                <p className='postDesc'>{post.desc}
                </p>
            </div>
        </div>
    )
}
