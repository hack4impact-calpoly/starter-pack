const comments = document
    .getElementById("comment-container")
    ?.querySelector(".comments");

type CommentData = {
    blog_slug: string;
    user: string;
    content: string;
};

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

    const renderComment = (comment: CommentData) => {
        const div = document.createElement("div");
        div.className = "comment";
        div.innerHTML = `
        <div class="comment-user">${comment.user}</div>
        <div class="comment-content">${comment.content}</div>
        <div id="trash-icon" class="hidden">
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24">
                <path d="M6 4H18V21H6z" opacity=".3"></path><path d="M11 18H9V7h2V18zM15 18h-2V7h2V18zM4 3H20V5H4z"></path><path d="M17 5L14 2 10 2 7 5z"></path><path d="M17,22H7c-1.1,0-2-0.9-2-2V3h14v17C19,21.1,18.1,22,17,22z M7,5v15h10V5H7z"></path>
            </svg>
        </div>
    `;
        comments.appendChild(div);
        const trashIcon = div.querySelector("#trash-icon");
        div.addEventListener("mouseover", (e) => {
            div.style.backgroundColor = "lightgrey";
            // show trash icon

            if (trashIcon) {
                trashIcon.classList.remove("hidden");
            }
        });

        trashIcon?.addEventListener("click", (e) => {
            // delete comment
            local_comments.splice(-1, 1);
            localStorage.setItem("comments", JSON.stringify(local_comments));
            div.remove();
        });

        div.addEventListener("mouseleave", (e) => {
            div.style.backgroundColor = "white";
            // hide trash icon
            if (trashIcon) {
                trashIcon.classList.add("hidden");
            }
        });
    };

    // Render the comments
    local_comments.forEach((comment, idx) => {
        if (comment.blog_slug == blog_slug) {
            renderComment(comment);
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

            if (user.value.match(/^\s*$/) || content.value.match(/^\s*$/)) {
                alert("Please enter a username and/or comment.");
                return;
            } else {
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
                localStorage.setItem(
                    "comments",
                    JSON.stringify(local_comments)
                );

                renderComment(comment);

                // Clear the form
                content.value = "";
            }
        });
    }
}
