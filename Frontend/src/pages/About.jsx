export default function About() {
  return (
    <section className="about-wrap">
      <div className="card about-card">
        <h2>About Me</h2>
        <p>
          I am a passionate developer with a love for meaningful digital products. My experience
          spans frontend development, backend APIs, and product design. I enjoy solving complex
          user problems through clean code and intuitive interfaces.
        </p>
      </div>

      <div className="two-col">
        <div className="card">
          <h3>Education</h3>
          <ul className="plain-list">
            <li>B.Sc. in Physical Science and ICT</li>
            <li>University of Sri Jayewardenepura</li>
          </ul>
        </div>

        <div className="card">
          <h3>Skills</h3>
          <div className="pill-group">
            <span className="pill">JavaScript</span>
            <span className="pill">Node.js</span>
            <span className="pill">Express</span>
            <span className="pill">MongoDB</span>
            <span className="pill">HTML &amp; CSS</span>
            <span className="pill">React</span>
          </div>
        </div>
      </div>

      <div className="card contact-card">
        <h3>Contact</h3>
        <p>Email: heshancampus1028@gmail.com</p>
        <p>Phone: +94 71 990 5596</p>
        <p>Linkedin: linkedin.com/in/heshan-maduwantha-0142a0236</p>
      </div>
    </section>
  );
}
