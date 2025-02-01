import { ListGroup } from 'react-bootstrap'

export default () => (
    <div>
        <h3 className="section-header">Contact</h3>

        <ListGroup variant="flush">
            <ListGroup.Item variant="dark" action href="https://www.linkedin.com/in/mschwartz91">
                <i className="fab fa-linkedin" />  LinkedIn
            </ListGroup.Item>
            <ListGroup.Item variant="dark" action href="https://github.com/mattschwartz">
                <i className="fab fa-github" /> GitHub
            </ListGroup.Item>
        </ListGroup>
    </div>
);
