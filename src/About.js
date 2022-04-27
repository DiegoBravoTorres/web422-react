import React from "react";
import { Card } from "react-bootstrap";

function About() {
    return (
        <Card>
            <Card.Body>
                <Card.Title>About </Card.Title>
                <Card.Text>
                    <h2>All About Me </h2>
                    <p>
                        I'm a Front-End Developer based in Toronto. I use HTML, CSS and JavaScript frameworks along with other technologies to create engaging experiences online. I've had fun working for some of the biggest companies across
                        the continent.
                        <br />
                        I'm also a young professional original from Mexico who has lived in 6 different countries. He is also a DJ and electronic music producer on the side. Furthermore, he enjoys reading, doing exercise, traveling, but
                        most of all, meeting new people.
                    </p>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default About;
