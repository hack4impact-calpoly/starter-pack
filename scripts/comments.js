var _a;
var comments = (_a = document
    .getElementById("comment-container")) === null || _a === void 0 ? void 0 : _a.querySelector(".comments");
console.log("loading...");
if (comments) {
    // comments for a specific blog post
    var path = window.location.pathname; // e.g., "/hello/world"
    var segments = path.split("/"); // splits the path into an array: ["", "hello", "world"]
    var blog_slug_1 = segments[segments.length - 1]; // gets the last segment, "world" in this case
    console.log("comments found");
    // Get the comments from the server
    // fetch("/api/comments")
    // Get comments from local storage
    var local_comments_1 = JSON.parse(localStorage.getItem("comments") || "[]");
    // Render the comments
    local_comments_1.forEach(function (comment) {
        if (comment.blog_slug == blog_slug_1) {
            var div = document.createElement("div");
            div.className = "comment";
            div.innerHTML = "\n            <div class=\"comment-user\">".concat(comment.user, "</div>\n            <div class=\"comment-content\">").concat(comment.content, "</div>\n        ");
            comments.appendChild(div);
        }
    });
    // allow users to add comments
    var commentForm = document.getElementById("comment-form");
    if (commentForm) {
        console.log("comment form found");
        commentForm.addEventListener("submit", function (e) {
            e.preventDefault();
            var user = document.getElementById("user");
            var content = document.getElementById("content");
            var comment = {
                blog_slug: blog_slug_1,
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
            local_comments_1.push(comment);
            localStorage.setItem("comments", JSON.stringify(local_comments_1));
            // Render the comment
            var div = document.createElement("div");
            div.className = "comment";
            div.innerHTML = "\n            <div class=\"comment-user\">".concat(comment.user, "</div>\n            <div class=\"comment-content\">").concat(comment.content, "</div>\n        ");
            comments.appendChild(div);
            // Clear the form
            content.value = "";
        });
    }
}
