import React from "react";
import { useParams } from "react-router-dom";

function BlogCategory() {
  const { slug } = useParams();

  return (
    <div>
      <h2>Blog Category: {slug}</h2>
      {/* Add your content here */}
    </div>
  );
}

export default BlogCategory;
