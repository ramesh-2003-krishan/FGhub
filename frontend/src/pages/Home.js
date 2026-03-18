import React from "react";
import Navbar from "../components/navbar";
import MediaForm from "../components/MediaForm";
import MediaList from "../components/MediaList";

function Home() {
  return (
    <div>
      <h1>MediaHub</h1>
      <MediaForm />
      <MediaList />
    </div>
  );
}

export default Home;