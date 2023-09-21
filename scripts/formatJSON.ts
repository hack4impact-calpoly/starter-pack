// this file is used to format json files and convert them into static html files

/* 
JSON will be in the following format for blogs:

{
    "title": "Blog Title",
    "date": "2021-01-01",
    "image": "https://www.example.com/image.jpg",
    "content": "This is the content of the blog",
    "slug": "blog-title"
}
**/

type Blog = {
    title: string;
    date: string;
    image: string;
    content: string;
    slug: string;
};

import { promises as fs } from "fs";
import path from "path";
import { format } from "prettier";

export async function formatJSON() {
    // <img src="${href}" alt="${text}" width="400px" height="400px" />
    // get all json file names in ../blog folder
    const dir = path.join(__dirname, "../blog");
    const files = (await fs.readdir(dir)).filter(
        (file) => file !== "template.html" && file.endsWith(".json")
    );

    //   loads template.html file
    const template = await fs.readFile(dir + "/template.html", "utf-8");

    files.forEach(async (file) => {
        // creates full path to file and reads it
        let filePath = path.join(dir, file);
        const fileData = await fs.readFile(filePath, "utf-8");
        const parsedFile: Blog = await JSON.parse(fileData);

        // use json data to create html
        let json_html = `
        <div class="blog">
            <div class="blog-title">${parsedFile.title}</div>
            <div class="blog-date">${parsedFile.date}</div>
            <div class="blog-image">
                <img src="${parsedFile.image}" alt="${parsedFile.title}" width="400px" height="400px" />
            </div>
            <div class="blog-content">${parsedFile.content}</div>
        </div>
        `;

        // replaces {{content}} in template.html with formatted markdown
        let outHTML = template.replace("{{content}}", json_html);

        // formats data with prettier and writes it to a new html file
        outHTML = await format(outHTML, { parser: "html" });
        filePath = filePath.slice(0, -5) + ".html";

        await fs.writeFile(filePath, outHTML);
    });
}

formatJSON();
console.log("completed markdown.");
