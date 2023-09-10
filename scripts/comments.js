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
    local_comments_1.forEach(function (comment, idx) {
        if (comment.blog_slug == blog_slug_1) {
            var div_1 = document.createElement("div");
            div_1.className = "comment";
            div_1.innerHTML = "\n            <div class=\"comment-user\">".concat(comment.user, "</div>\n            <div class=\"comment-content\">").concat(comment.content, "</div>\n            <div id=\"trash-icon\" class=\"hidden\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\"  viewBox=\"0 0 24 24\">\n                    <path d=\"M6 4H18V21H6z\" opacity=\".3\"></path><path d=\"M11 18H9V7h2V18zM15 18h-2V7h2V18zM4 3H20V5H4z\"></path><path d=\"M17 5L14 2 10 2 7 5z\"></path><path d=\"M17,22H7c-1.1,0-2-0.9-2-2V3h14v17C19,21.1,18.1,22,17,22z M7,5v15h10V5H7z\"></path>\n                </svg>\n            </div>\n        ");
            comments.appendChild(div_1);
            // handle hover
            var trashIcon_1 = div_1.querySelector("#trash-icon");
            div_1.addEventListener("mouseover", function (e) {
                div_1.style.backgroundColor = "lightgrey";
                // show trash icon
                if (trashIcon_1) {
                    trashIcon_1.classList.remove("hidden");
                }
            });
            trashIcon_1 === null || trashIcon_1 === void 0 ? void 0 : trashIcon_1.addEventListener("click", function (e) {
                // delete comment
                local_comments_1.splice(idx, 1);
                localStorage.setItem("comments", JSON.stringify(local_comments_1));
                div_1.remove();
            });
            div_1.addEventListener("mouseleave", function (e) {
                div_1.style.backgroundColor = "white";
                // hide trash icon
                if (trashIcon_1) {
                    trashIcon_1.classList.add("hidden");
                }
            });
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
            div.innerHTML = "\n            <div class=\"comment-user\">".concat(comment.user, "</div>\n            <div class=\"comment-content\">").concat(comment.content, "</div>\n            <div id=\"trash-icon\" class=\"hidden\">\n                <svg xmlns=\"http://www.w3.org/2000/svg\"  viewBox=\"0 0 24 24\">\n                    <path d=\"M6 4H18V21H6z\" opacity=\".3\"></path><path d=\"M11 18H9V7h2V18zM15 18h-2V7h2V18zM4 3H20V5H4z\"></path><path d=\"M17 5L14 2 10 2 7 5z\"></path><path d=\"M17,22H7c-1.1,0-2-0.9-2-2V3h14v17C19,21.1,18.1,22,17,22z M7,5v15h10V5H7z\"></path>\n                </svg>\n            </div>\n        ");
            comments.appendChild(div);
            var trashIcon = div.querySelector("#trash-icon");
            div.addEventListener("mouseover", function (e) {
                div.style.backgroundColor = "lightgrey";
                // show trash icon
                if (trashIcon) {
                    trashIcon.classList.remove("hidden");
                }
            });
            trashIcon === null || trashIcon === void 0 ? void 0 : trashIcon.addEventListener("click", function (e) {
                // delete comment
                local_comments_1.splice(-1, 1);
                localStorage.setItem("comments", JSON.stringify(local_comments_1));
                div.remove();
            });
            div.addEventListener("mouseleave", function (e) {
                div.style.backgroundColor = "white";
                // hide trash icon
                if (trashIcon) {
                    trashIcon.classList.add("hidden");
                }
            });
            // disable user input after submitting a comment
            user.disabled = true;
            // Clear the form
            content.value = "";
        });
    }
}
