// read blog posts from the file system and preview in blog.html, linking them to the full post

type BlogPreview = {
    slug: string;
    title: string;
    date: string;
    description: string;
};

// dummy data, where slug is the name of the html file
const blogPosts: BlogPreview[] = [
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

/** show blog posts in blog.html, manipulate the DOM */
function displayBlogPreview() {
    // sort blogs by date
    blogPosts.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    const blogList = document.getElementById("blog-list");

    // create a preview for each blog post
    blogPosts.forEach(({ slug, title, date, description }) => {
        const link = document.createElement("a");
        link.href = `blog/${slug}.html`;
        link.innerHTML = "Read More";
        const postPreview = document.createElement("div");
        postPreview.classList.add("post-preview");
        postPreview.innerHTML = `
            <h2 class="post-title">${title}</h2>
            <h3 class="post-subtitle">${date}</h3>
            <p class="post-description">${description}</p>
        `;
        postPreview.appendChild(link);
        if (blogList) {
            blogList.appendChild(postPreview);
        }
    });
}

displayBlogPreview();

/**
 * use code later
 * 
    import { promises as fs } from "fs";
    import path from "path";

    async function getBlogPosts() {
        const dir = path.join(__dirname, "../blog");
        const files = (await fs.readdir(dir)).filter(
            (file) => file !== "template.html" && file.endsWith(".html")
        );

        const posts = files.map(async (file) => {
            let filePath = path.join(dir, file);
            const fileData = await fs.readFile(filePath, "utf-8");
            return {
                // name: file.slice(0, -3),
                name: file,
                description: fileData,
            };
        });

        return Promise.all(posts);
    }
 * 
 */
