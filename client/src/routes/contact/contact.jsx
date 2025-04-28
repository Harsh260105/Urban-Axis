import { useState } from "react";
import "./contact.scss";
import emailjs from "emailjs-com";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("");
    emailjs
      .send(
        "service_b2ssq6x", 
        "template_ef9kb2c", 
        formData,
        "DCh4KPH2oGKruFoE9" 
      )
      .then(
        (result) => {
          setStatus("Message sent successfully!");
          setFormData({ name: "", email: "", subject: "", message: "" });
        },
        (error) => {
          setStatus("Failed to send message. Please try again later.");
        }
      );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="contact">
      <div className="container">
        <div className="header">
          <h1>Contact Us</h1>
          <p>Get in touch with our team for any inquiries</p>
        </div>

        <div className="content">
          <div className="contact-info">
            <div className="info-card">
              <h3>Office Location</h3>
              <p>B/6 Purshottamnagar</p>
              <p>Nadiad-387002,</p>
              <p>Gujarat, India</p>
            </div>

            <div className="info-card">
              <h3>Contact Details</h3>
              <p>Phone: +91 99999 99999</p>
              <p>Email: info@urbanaxis.com</p>
              <p>Hours: Mon-Fri 9:00 AM - 6:00 PM</p>
            </div>

            <div className="info-card">
              <h3>Social Media</h3>
              <div className="social-links">
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Twitter
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit">Send Message</button>
              {status && <p className="form-status">{status}</p>}
            </form>
          </div>
        </div>

        <div className="map-section">
          <h2>Find Us</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.3781960180236!2d72.81792397512754!3d22.60234817947054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e50c43cdea6c7%3A0x5074fe9e0c1c8bd!2sCharotar%20University%20of%20Science%20and%20Technology%20(CHARUSAT)!5e0!3m2!1sen!2sin!4v1745777699419!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

{
  /* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d396.965376403299!2d72.85651441201935!3d22.68399137921146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e5b014354b67d%3A0x8150cf481f5e4785!2sB%2F6%2C%20Old%20Dumral%20Rd%2C%20near%20Sai%20Baba%20Temple%2C%20Nadiad%2C%20Gujarat%20387001!5e0!3m2!1sen!2sin!4v1745734547564!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */
}
