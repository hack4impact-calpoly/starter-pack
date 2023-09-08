const comments = document
    .getElementById("comment-container")
    ?.querySelector(".comments");

type CommentData = {
    blog_slug: string;
    user: string;
    content: string;
};

console.log("loading...");

if (comments) {
    // comments for a specific blog post

    const path = window.location.pathname; // e.g., "/hello/world"
    const segments = path.split("/"); // splits the path into an array: ["", "hello", "world"]
    const blog_slug = segments[segments.length - 1]; // gets the last segment, "world" in this case

    console.log("comments found");
    // Get the comments from the server
    // fetch("/api/comments")

    // Get comments from local storage
    let local_comments: CommentData[] = JSON.parse(
        localStorage.getItem("comments") || "[]"
    );

    // Render the comments
    local_comments.forEach((comment) => {
        if (comment.blog_slug == blog_slug) {
            const div = document.createElement("div");
            div.className = "comment";
            div.innerHTML = `
            <div class="comment-user">${comment.user}</div>
            <div class="comment-content">${comment.content}</div>
        `;
            comments.appendChild(div);
        }
    });

    // allow users to add comments
    const commentForm = document.getElementById("comment-form");
    if (commentForm) {
        console.log("comment form found");
        commentForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const user = document.getElementById("user") as HTMLInputElement;
            const content = document.getElementById(
                "content"
            ) as HTMLInputElement;

            const comment = {
                blog_slug,
                user: user.value,
                content: content.value,
            };

            // Save the comment to the server
            // fetch("/api/comments", {
            //     method: "POST",
            //     body: JSON.stringify(comment),
            //     headers: {
            //         "content-type": "application/json"
            //     }
            // })

            // Save the comment to local storage
            local_comments.push(comment);
            localStorage.setItem("comments", JSON.stringify(local_comments));

            // Render the comment
            const div = document.createElement("div");
            div.className = "comment";
            div.innerHTML = `
            <div class="comment-user">${comment.user}</div>
            <div class="comment-content">${comment.content}</div>
        `;
            comments.appendChild(div);

            // disable user input after submitting a comment
            user.disabled = true;
            // Clear the form
            content.value = "";
        });
    }
}
