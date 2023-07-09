import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"
const MyNotes = () => {

    function CustomToggle({ children, eventKey }) {
        const decoratedOnClick = useAccordionButton(eventKey, () =>
            console.log('totally custom!'),
        );

        return (
            <div
                type="button"
                style={{ background: "inherit" }}
                onClick={decoratedOnClick}
            >
                {children}
            </div>
        );
    }

    const [notes,setNotes]=useState([])

    const deleteHandler = (id) => {
        if (window.confirm("Are You Sure?")) {

        }
    }

    const fetchNotes = async () => {
        const { data } = await axios.get('/api/notes');
        setNotes(data);

    }
    useEffect(() => {
        fetchNotes();
    }, [])



    return (
        <MainScreen title="Welcome Back Kanuri...">
            <Link to='createnote'>
                <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
                    Create New Note
                </Button>
            </Link>

            {
                notes.map((note) => (
                    <Accordion key={note._id}>
                        {/* <Accordion.Item eventKey="0"> */}
                        <Card >
                            {/* <Accordion.Header as={Card.Text} variant="link" eventKey="0" > */}

                            <Card.Header style={{ display: "flex", width: "100%" }}>

                                <span
                                    style={{
                                        color: "black",
                                        textDecoration: "none",
                                        flex: 1,
                                        cursor: "pointer",
                                        alignSelf: "center",
                                        fontSize: 18,
                                    }}
                                >
                                    <CustomToggle eventKey="0">{note.title}</CustomToggle>
                                </span>

                                <div>
                                    <Button href={`/note/${note._id}`}>Edit</Button>
                                    <Button variant="danger" className="mx-2" onClick={() => deleteHandler(note._id)}>Delete</Button>
                                </div>

                            </Card.Header>
                            {/* </Accordion.Header> */}

                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <h4>
                                        <Badge bg="success" text="light">
                                            Category - {note.category}
                                        </Badge>
                                    </h4>
                                    <blockquote className="blockquote mb-0">
                                        <p>
                                            {note.content}
                                        </p>
                                        <footer className="blockquote-footer">
                                            Created on - date
                                        </footer>
                                    </blockquote>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        {/* </Accordion.Item> */}
                    </Accordion>
                ))
            }

        </MainScreen>
    )
}

export default MyNotes;