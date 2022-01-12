import React from "react";
import { Helmet } from "react-helmet";
import { 
    Row,
    Col,
    Container,
    Button,
    Form
} from 'react-bootstrap';
import Navibar from "./microComponents/navbar";
import {Link} from "react-router-dom";

export default function Contact() {
    return (
        <div>
            <Navibar homeArea={<Link to="/" class="text-dark text-decoration-none">Home</Link>} />
            <Helmet>
                <title>Study in Portugal - Contact</title>
            </Helmet>
            <Container className="mt-nav">
                <h1 className="bold my-3">Contact us</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Subject" className="shadow-sm" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Email" className="shadow-sm" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control as="textarea" placeholder="Message" rows={3} className="shadow-sm" />
                    </Form.Group>
                    <Button variant="success" className="shadow-sm">Submit</Button>
                </Form>
            </Container>
        </div>
    )
}