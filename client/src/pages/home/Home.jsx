import "./home.scss";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import ToTopBtn from "../../components/totopbtn/ToTopBtn";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import http from "../../axios/axios";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await http.get("/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
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
}
