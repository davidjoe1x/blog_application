import './settings.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import { useState, useContext } from 'react';
import { Context } from '../../components/context/Context';
import axios from 'axios';

export default function Settings() {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);





    const { user, dispatch } = useContext(Context);
    const PF = "http://localhost:3000/images/"


    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: 'UPDATE_START' })

        const updatedUser = {
            userId: user._id,
            username,
            email,
            password,
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append('name', filename)
            data.append('file', file)
            updatedUser.profilePic = filename;
            try {
                await axios.post('/upload', data)



            } catch (err) { }
            dispatch({ type: 'UPDATE_FAILURE' })
        } try {
            const res = await axios.put('/users/' + user._id, updatedUser)

            setSuccess(true);
            dispatch({ type: 'UPDATE_SUCCESS', payload: res.data })

        } catch (err) { }


    }


    return (
        <div className='settings'>
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className='settingsUpdateTitle'>
                        Обновить информацию профиля
                    </span>

                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Изображение профиля</label>
                    <div className="settingsPP">
                        <img alt='img' src={file ? URL.createObjectURL(file) : PF + user.profilePic} />
                        <label htmlFor='fileInput'>
                            <i className="settingsPPIcon fa-solid fa-upload"></i>
                        </label>
                        <input className='fileInput' type='file' id='fileInput' onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <label>Имя пользователя</label>
                    <input type='text' placeholder={user.username} onChange={(e) => setUsername(e.target.value)} />
                    <label>Email</label>
                    <input type='email' placeholder={user.email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Пароль</label>
                    <input type='password' placeholder='пароль' onChange={(e) => setPassword(e.target.value)} />
                    <button className="settingsSubmit" type='submit'>
                        Обновить
                    </button>
                    {success && (<span className='notification'>Изменения успешно сохранены</span>)}
                </form>
            </div>
            <Sidebar />
        </div>
    )
}
