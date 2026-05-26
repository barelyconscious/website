import { ListGroup } from 'react-bootstrap'

export default () => (
    <div>
        <h3 className="section-header">Socials</h3>

        <ListGroup variant="flush">
            <ListGroup.Item variant="dark" action href="https://bsky.app/profile/cassii.us">
                <i className="fab fa-twitter" /> BlueSky/@cassii.us
            </ListGroup.Item>
            <ListGroup.Item variant="dark" action href="https://www.youtube.com/@cassiius">
                <i className="fab fa-youtube" /> YouTube/@cassiius
            </ListGroup.Item>
            <ListGroup.Item variant="dark" action href="https://www.twitch.tv/cassiius">
                <i className="fab fa-twitch" /> Twitch/@cassiius
            </ListGroup.Item>
        </ListGroup>
    </div>
);
