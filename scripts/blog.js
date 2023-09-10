// read blog posts from the file system and preview in blog.html, linking them to the full post
// import { promises as fs } from "fs";
// import path from "path";
var blogPosts = [
    {
        slug: "test_file",
        title: "Test File",
        date: "2021-01-01",
        description: "This is the first blog post.",
    },
    {
        slug: "test_file_2",
        title: "Test File 2",
        date: "2021-01-02",
        description: "This is the second blog post.",
    },
];
// show blog posts in blog.html, manipulate the DOM
function displayBlogPreview() {
    // const blogPosts = await getBlogPosts();
    console.log(blogPosts);
    var blogList = document.getElementById("blog-list");
    blogPosts.forEach(function (_a) {
        var slug = _a.slug, title = _a.title, date = _a.date, description = _a.description;
        // postElement.innerHTML = post.description;
        // const title = postElement.querySelector("h1")?.innerHTML;
        // const date = postElement.querySelector("h2")?.innerHTML || "";
        // const description = postElement.querySelector("p")?.innerHTML;
        var link = document.createElement("a");
        link.href = "blog/".concat(slug, ".html");
        link.innerHTML = "Read More";
        var postPreview = document.createElement("div");
        postPreview.classList.add("post-preview");
        postPreview.innerHTML = "\n            <h2 class=\"post-title\">".concat(title, "</h2>\n            <h3 class=\"post-subtitle\">").concat(date, "</h3>\n            <p class=\"post-description\">").concat(description, "</p>\n        ");
        postPreview.appendChild(link);
        if (blogList) {
            blogList.appendChild(postPreview);
        }
    });
}
displayBlogPreview();
