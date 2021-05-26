import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { articles } from './article-content';
import { NotFoundPage } from '../pages/NotFoundPage';

export const ArticlePage = () => {
    const [upvotes, setUpVotes] = useState(0);
    const [comments, setCommments] = useState([]);
    const { name } = useParams();
const [postedBy,setPostBy] = useState('');
    const [text,setText] = useState('');

    const article = articles.find(article => article.name === name);

    useEffect(() => {
        const loadArticleInfo = async () => {
            const response = await fetch(`/api/articles/${name}`);
            const data = await response.json();
            const {upvotes=0 , comments=[] } = data;
            setUpVotes(upvotes);
            setCommments(comments);
        }
        loadArticleInfo();
    }, [name]);

    const addUpVote = async() =>{
            const response = await fetch(`/api/articles/${name}/upvotes`,{
                method:'post',
            });
            const data = await response.json();
            const {upvotes} = data;
            setUpVotes(upvotes)
    }

const addComment = async() =>{
    const response = await fetch(`/api/articles/${name}/comments`,{
                method:'post',
                body: JSON.stringify({postedBy,text}),
                headers :{
                    "Content-type": "application/json",
                },
    });
    const data = await response.json();
    const {comments}= data;
    setCommments(comments);
    
}

    return article ? (
        <>
            <h1>{article.title}</h1>
            <div id="upvotes-section">
                <button onClick={addUpVote}>Add Upvote</button>
                <p>This artoicle has upvotes {upvotes} </p>
            </div>
            {article.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
            ))}
          
            <div id="add-comment-form">
                <h3>Add a comment</h3>
                <label>
                    Name:
                    <input type="text" value={postedBy} onChange={e => setPostBy(e.target.value)}/>
                </label>
                <label>
                    Comment:
                    <textarea rows="4" cols="50" value={text} onChange={e => setText(e.target.value)}/>
                </label>
                <button onClick={() => addComment()} >Add Comment</button>
            </div>
            <h3>Comments:</h3>
            {comments.map((comment, i) => (
                <div className="comment" key={i}>
                    <h4>{comment.postedBy}</h4>
                    <p>{comment.text}</p>
                </div>
            ))}

            
        </>
    ) : (<NotFoundPage />);
}