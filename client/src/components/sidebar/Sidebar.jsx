import { useEffect, useState } from 'react';
import './sidebar.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';


export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get('/categories')
      setCats(res.data)
    }
    getCats();
  }, [])


  return (
    <motion.div className='sidebar'
      variants={fadeIn('left', 0.2)}
      initial='hidden'
      whileInView={'show'}
    >
      <div className="sidebarItem" >

        <span className='sidebarTitle'>Актуальное</span>

  
    
        <img className='sidebarImg' src='https://m.media-amazon.com/images/I/81BAJ96jLTL.jpg' alt='' />
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam labore a at blanditiis odio vitae nulla repellendus tempora facere quisquam veniam facilis sequi deleniti quos, quaerat amet sapiente laudantium magnam?</p>
      </div>
      {/* <div className="sidebarItem">
        <span className='sidebarTitle'>CATEGORIES</span>
        <ul className='sidebarList'>
          {cats.map((c, k) => (
            <Link key={k} className='link' to={`/?cat=${c.name}`}>
              <li className='sidebarListItem'>
                {c.name}
              </li></Link>
          ))}
        </ul>
      </div> */}

    </motion.div>
  )
}
