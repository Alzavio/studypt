import React, { useState } from "react";
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
import { send } from 'emailjs-com';

export default function Contact() {
    const onSubmit = (e) => {
        e.preventDefault();
        console.log("trigger")
        send(
            'studypt',
            'template_py5bbum',
            toSend,
            'user_sMUjMlYEqePasht835H9n'
        )
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
            })
            .catch((err) => {
                console.log('FAILED...', err);
            });
    };
    const [toSend, setToSend] = useState({
        from_name: '',
        to_name: '',
        message: '',
        reply_to: '',
    });
    const handleChange = (e) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <Navibar homeArea={<Link to="/" class="text-dark text-decoration-none">Home</Link>} />
            <Helmet>
                <title>Study in Portugal - Contact</title>
            </Helmet>
            <Container className="mt-nav">
                <h1 className="bold my-3">Contact us</h1>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="text"
                            placeholder="Name"
                            name="from_name"
                            className="shadow-sm"
                            value={toSend.from_name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            name="reply_to"
                            className="shadow-sm"
                            value={toSend.reply_to}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Control
                            as="textarea"
                            placeholder="Message"
                            rows={3}
                            name="message"
                            className="shadow-sm"
                            value={toSend.message}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button variant="success" type="submit" className="shadow-sm">Submit</Button>
                </Form>
            </Container>
        </div>
    )
}