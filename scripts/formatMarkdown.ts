// this file is used to format markdown files and convert them into static html files

import { promises as fs } from "fs";
import path from "path";
import { marked } from "marked";
import { format } from "prettier";

marked.use({
    renderer: {
        image: (href, title, text) => {
            return `<img src="${href}" alt="${text}" width="400px" height="400px" />`;
        },
    },
});

export async function formatMarkdown() {
    // get all markdown file names in ../blog folder
    const dir = path.join(__dirname, "../blog");
    const files = (await fs.readdir(dir)).filter(
        (file) => file !== "template.html" && file.endsWith(".md")
    );

    //   loads template.html file
    const template = await fs.readFile(dir + "/template.html", "utf-8");

    files.forEach(async (file) => {
        // creates full path to file and reads it
        let filePath = path.join(dir, file);
        const fileData = await fs.readFile(filePath, "utf-8");
        let formattedData = marked(fileData);

        // replaces {{content}} in template.html with formatted markdown
        formattedData = template.replace("{{content}}", formattedData);

        // formats data with prettier and writes it to a new html file
        formattedData = await format(formattedData, { parser: "html" });
        filePath = filePath.slice(0, -3) + ".html";

        await fs.writeFile(filePath, formattedData);
    });
}

formatMarkdown();
console.log("completed markdown.");
