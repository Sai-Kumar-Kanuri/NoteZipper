import { Card, Form, Button } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { useState, useEffect } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { deleteNoteAction, updateNoteAction } from "../../actions/notesActions";
import ErrorMessage from "../../components/ErrorMessage";
import { useParams } from 'react-router-dom';
import Loading from "../../components/Header/Loading";



const SingleNote = () => {
    const { id } = useParams();

    let navigate = useNavigate();

    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [category, setCategory] = useState();
    const [date, setDate] = useState("");


    const dispatch = useDispatch();


    const noteDelete = useSelector((state) => state.noteDelete);
    const { loading: loadingDelete, error: errorDelete} = noteDelete;

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteNoteAction(id));
        }
        navigate("/mynotes");
    };


    useEffect(() => {
        const fetching = async () => {

            const { data } = await axios.get(`/api/notes/${id}`);

            setTitle(data.title);
            setContent(data.content);
            setCategory(data.category);
            setDate(data.updatedAt);
        };

        fetching();
    }, [id, date]);

    const resetHandler = () => {
        setTitle("");
        setCategory("");
        setContent("");
    };


    const updateHandler = (e) => {
        e.preventDefault();
        dispatch(updateNoteAction(id, title, content, category));
        if (!title || !content || !category) return;

        resetHandler();
        navigate("/mynotes");
    };


    const noteUpdate = useSelector((state) => state.noteUpdate);
    const { loading, error } = noteUpdate;
    return (
        <MainScreen title="Edit Note">
            <Card>
                <Card.Header>Edit your Node</Card.Header>
                <Card.Body>
                    <Form onSubmit={updateHandler}>
                        {loadingDelete && <Loading />}
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                        {errorDelete && (
                            <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
                        )}
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="title"
                                value={title}
                                placeholder="Enter the title"
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={content}
                                placeholder="Enter the content"
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>

                        {content && (
                            <Card>
                                <Card.Header>Note Preview</Card.Header>
                                <Card.Body>
                                    <ReactMarkdown>{content}</ReactMarkdown>
                                </Card.Body>
                            </Card>
                        )}

                        <Form.Group controlId="content">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={category}
                                placeholder="Enter the content"
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Form.Group>
                        {loading && <Loading size={50} />}

                        <Button type="submit" variant="primary">
                            Update Note
                        </Button>
                        <Button className="mx-2" variant="danger"  onClick={() => deleteHandler(id)}>
                            Delete Note
                        </Button>
                    </Form>
                </Card.Body>
                <Card.Footer className="text-muted">
                    Updated on - {date.substring(0, 10)}
                </Card.Footer>
            </Card>
        </MainScreen>
    )
}


export default SingleNote;