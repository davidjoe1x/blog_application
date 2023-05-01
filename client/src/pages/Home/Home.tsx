import { ReactElement, useEffect } from "react";

import { Header, Posts, Sidebar, ToTopBtn } from "../../components";
import { useAppDispatch, useAppSelector } from "../../redux";
import { getPosts, selectPosts } from "../../redux/features";

import "./home.scss";

export const Home = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector(selectPosts);

  useEffect(() => {
    if (!posts.length) {
      dispatch(getPosts());
    }
  }, [posts, dispatch]);

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
        <ToTopBtn />
      </div>
    </>
  );
};
