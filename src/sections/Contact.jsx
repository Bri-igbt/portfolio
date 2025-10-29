import emails from '@emailjs/browser';
import React, {useRef, useState} from 'react'

const Contact = () => {
    const formRef = useRef();
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
             await emails.send(
                'service_9kycv41',
                'template_yyrze2m',
                {
                    from_name: form.name,
                    to_name: 'Bright',
                    from_email: form.email,
                    to_email: 'blakechima@gmail.com',
                    message: form.message,
                },
                    'K3R7TCnv2OVD-P6Br'
                )

                 setLoading(false);
                 alert('Message sent successfully!');

                 setForm({
                     name: '',
                     email: '',
                     message: '',
                 })
        } catch (e) {
            setLoading(false);
            alert('Failed to send message. Please try again.');
            console.log(e)
        }

    }

    return (
        <section className='c-space my-20' id='contact'>
            <div className="relative min-h-screen flex items-center justify-center flex-col">
                <img src="/assets/terminal.png" alt="terminal-bg" className="absolute inset-0 min-h-screen" />

                <div className='contact-container'>
                    <h3 className='head-text'>Let's talk</h3>
                    <p className="text-lg text-white-600 mt-3">
                        Whether you’re looking to build a new website, improve your existing platform, or bring a unique project to
                        life, I’m here to help.
                    </p>

                    <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
                        <label className="space-y-3">
                            <span className="field-label">Full Name</span>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="field-input"
                                placeholder="ex., John Doe"
                            />
                        </label>

                        <label className="space-y-3">
                            <span className="field-label">Email address</span>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="field-input"
                                placeholder="ex., johndoe@gmail.com"
                            />
                        </label>

                        <label className="space-y-3">
                            <span className="field-label">Your message</span>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="field-input"
                                placeholder="Share your thoughts or inquiries..."
                            />
                        </label>

                        <button className="field-btn" type="submit" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Message'}

                            <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}
export default Contact
