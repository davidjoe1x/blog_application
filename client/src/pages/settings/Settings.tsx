import { ReactElement, useCallback, useState } from "react";
import { FaUpload } from "react-icons/fa";

import { Sidebar } from "../../components";
import { useAppDispatch, useAppSelector } from "../../redux";
import { UpdateUserRequest } from "../../redux/features/auth/auth.interface";
import { selectAuth, userUpdate } from "../../redux/features/auth/auth.slice";
import { uploadImage } from "../../redux/features/upload/upload.slice";

import { PF } from "../../constans/pf";
import "./settings.scss";

interface SettingsFormState {
  username: string;
  password: string;
  email: string;
}

export const Settings = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);

  const [file, setFile] = useState<File | null | undefined>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [state, setState] = useState<SettingsFormState>({
    username: "",
    password: "",
    email: "",
  });

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const updatedUser: UpdateUserRequest = {
      userId: user?._id || "",
      ...state,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      dispatch(uploadImage(data));
      setFile(null);
    }
    dispatch(userUpdate(updatedUser));
    setSuccess(true);
  };

  const handleFormField = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      const fieldName = e.target.name;
      const fieldValue = e.target.value;
      setState((prevState) => ({ ...prevState, [fieldName]: fieldValue }));
    },
    [setState]
  );

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">
            Обновить информацию профиля
          </span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Изображение профиля</label>
          <div className="settingsPP">
            <img
              alt="img"
              src={file ? URL.createObjectURL(file) : PF + user?.profilePic}
            />
            <label htmlFor="fileInput">
              <FaUpload className="settingsPPIcon" />
            </label>
            <input
              className="fileInput"
              type="file"
              id="fileInput"
              onChange={(e) => setFile(e.target.files?.[0])}
            />
          </div>
          <label>Имя пользователя</label>
          <input
            type="text"
            placeholder={user?.username}
            name="username"
            value={state.username}
            onChange={handleFormField}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user?.email}
            name="email"
            value={state.email}
            onChange={handleFormField}
          />
          <label>Пароль</label>
          <input
            type="password"
            placeholder="пароль"
            name="password"
            value={state.password}
            onChange={handleFormField}
          />
          <button
            className="settingsSubmit"
            type="submit"
            disabled={Object.values(state).some((value) => !value)}
          >
            Обновить
          </button>
          {success && (
            <span className="notification">Изменения успешно сохранены</span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
};
