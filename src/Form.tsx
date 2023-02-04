import React, { useState } from "react";
import axios from "axios";
import { richTextFromMarkdown } from "@contentful/rich-text-from-markdown";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import ReactMarkdown from 'react-markdown'


function PostForm() {
    const [postTitle, setPostTitle] = useState("");
    const [loading, setLoading] = useState(false);
    // const [markdown, setMarkdown] = useState(null);
    const [richText, setRichText] = useState<any>(null);
    const [submitText, setSubmitText] = useState('Submit');
    const [postBody, setPostBody] = useState<any>('The generated article will appear here.');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform the submit action here
        console.log(postTitle);
        setSubmitText('fetching')
        setPostBody('Hang on, lay back & relax till my AI bitch writes the article.')
        setLoading(true)
        if (!postTitle) {
            throw new Error("Title cannot be empty!");

        }
        try {
            const { data } = await axios.post('https://kuzwtmac2b.execute-api.eu-south-1.amazonaws.com/serverless_blogginator_lambda_stage/ai/generateBlog', { title: postTitle });
            console.log(data)
            const markdown = data.body.choices[0].text
            // const richDocument = await richTextFromMarkdown(markdown);
            // setRichText(richDocument)
            // const article = documentToReactComponents(richDocument)
            setPostBody(markdown)
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false)
            setSubmitText('Again')
        }
    }

    return (
        <div>
            <form className="grid" onSubmit={handleSubmit}>
                <label for="title">
                    <h3>
                        Post Title:

                    </h3>
                </label>
                <input
                    type="text"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <button role="button" aria-busy={loading} type="submit">{submitText}</button>
            </form>
            <article aria-busy={loading}>
                <ReactMarkdown>
                    {postBody}
                </ReactMarkdown>
            </article>
        </div>
    );
}

export default PostForm;
