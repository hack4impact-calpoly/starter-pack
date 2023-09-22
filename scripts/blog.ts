// Define the BlogPreview type, which represents a preview of a blog post
type BlogPreview = {
    slug: string; // the slug is the name of the HTML file for the blog post
    title: string; // the title of the blog post
    date: string; // the date the blog post was published
    description: string; // a short description of the blog post
};

// Define some dummy data for the blog previews
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

/**
 * Display the blog previews in the blog.html page by manipulating the DOM.
 * This function sorts the blog previews by date, creates a preview for each blog post,
 * and appends the previews to the blog list element in the HTML.
 */
function displayBlogPreview() {
    // Sort the blog previews by date
    blogPosts.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    // Get the blog list element from the HTML
    const blogList = document.getElementById("blog-list");

    // Create a preview for each blog post and append it to the blog list element
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

// Call the displayBlogPreview function to display the blog previews in the HTML
displayBlogPreview();
