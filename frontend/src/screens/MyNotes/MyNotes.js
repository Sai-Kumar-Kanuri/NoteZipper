import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import MainScreen from "../../components/MainScreen";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Header/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useNavigate } from 'react-router-dom';



const MyNotes = ({ search }) => {
    let navigate = useNavigate();

    const dispatch = useDispatch();

    const noteList = useSelector(state => state.noteList);
    const { loading, notes, error } = noteList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const noteCreate = useSelector((state) => state.noteCreate);
    const { success: successCreate } = noteCreate;

    const noteUpdate = useSelector((state) => state.noteUpdate);
    const { success: successUpdate } = noteUpdate;

    const noteDelete = useSelector((state) => state.noteDelete);
    const { success: successDelete } = noteDelete;

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

    // const [notes, setNotes] = useState([])

    const deleteHandler = (id) => {
        if (window.confirm("Are You Sure?")) {
            dispatch(deleteNoteAction(id));
        }
    }

    // const fetchNotes = async () => {
    //     const { data } = await axios.get('/api/notes');
    //     setNotes(data);

    // }
    useEffect(() => {
        dispatch(listNotes());
        if (!userInfo) {
            navigate("/");
        }
    }, [dispatch, navigate, userInfo, successCreate, successUpdate, successDelete])



    return (
        <MainScreen title={`Welcome Back ${userInfo.name}...`}>
            <Link to='/createnote'>
                <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
                    Create New Note
                </Button>
            </Link>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {loading && <Loading />}
            {
                notes?.reverse().filter(filteredote => (
                    filteredote.title.toLowerCase().includes(search.toLowerCase())
                )).map((note) => (
                    <Accordion key={note._id}>
                        <Card >

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
                                            Created on -{" "}
                                            <cite title="Source Title">{note.createdAt.substring(0, 10)}</cite>
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