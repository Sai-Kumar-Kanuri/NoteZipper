import { Card, Form, Button } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/notesActions";
import { useNavigate } from 'react-router-dom';
import Loading from "../../components/Header/Loading";
import ErrorMessage from "../../components/ErrorMessage";


const CreateNote = () => {
    let navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");

    const resetHandler = () => {
        setTitle("");
        setCategory("");
        setContent("");
    };

    const dispatch = useDispatch();

    const noteCreate = useSelector((state) => state.noteCreate);
    const { loading, error, note } = noteCreate;

    console.log(note);

    const submitHandler = (e) => {
        e.preventDefault();
        if (!title || !content || !category) return;

        dispatch(createNoteAction(title, content, category));


        resetHandler();
        navigate('/mynotes');
    }


    return (
        <MainScreen title="Create a Note">
            <Card>
                <Card.Header>Create a New Note</Card.Header>
                <Card.Body>
                    <Form onSubmit={submitHandler}>
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
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
                            Create Note
                        </Button>
                        <Button className="mx-2" onClick={resetHandler} variant="danger">
                            Reset Feilds
                        </Button>
                    </Form>
                </Card.Body>
                <Card.Footer className="text-muted">
                    Creating on - {new Date().toLocaleDateString()}
                </Card.Footer>
            </Card>
        </MainScreen>

    )
}

export default CreateNote;