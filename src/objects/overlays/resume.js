/** @type {{ title: string, render: () => string }} */
export default {
  title: 'Resume',
  render() {
    return `
      <p style="margin-bottom: 24px;">
        <a download style="font-weight: 500; color: var(--color-accent); text-decoration: none; border-bottom: 1px solid var(--color-accent);">Download my resume here</a>
      </p>

      <div class="resume-section">
        <h2>Education</h2>
        <div class="resume-entry">
          <div class="resume-entry-header">
            <span class="resume-entry-title">University of Illinois, Urbana-Champaign</span>
            <span class="resume-entry-date">Expected Jul 2027</span>
          </div>
          <div class="resume-entry-sub">M.S. Computer Science, Siebel School of Computing and Data Science</div>
        </div>
        <div class="resume-entry">
          <div class="resume-entry-header">
            <span class="resume-entry-title">University of Southern California</span>
            <span class="resume-entry-date">May 2023</span>
          </div>
          <div class="resume-entry-sub">B.S. Business Administration, Marshall School of Business</div>
        </div>
      </div>

      <div class="resume-section">
        <h2>Experience</h2>
        <div class="resume-entry">
          <div class="resume-entry-header">
            <span class="resume-entry-title">Deloitte Digital, Product Manager (Strategic Engineering)</span>
          </div>
          <div class="resume-entry-sub">New York, NY |Jan 2024 - Present</div>
          <p>Product manager/product engineer building AI products from POC through global scale</p>
        </div>
      </div>

      <div class="resume-section">
        <h2>Skills</h2>
        <div class="resume-entry">
          <div class="resume-entry-header">
            <span class="resume-entry-title">Languages</span>
          </div>
          <p>Python, TypeScript/JavaScript, Java, C++, SQL</p>
        </div>
        <div class="resume-entry">
          <div class="resume-entry-header">
            <span class="resume-entry-title">Frameworks & Tools</span>
          </div>
          <p>Next.js, Node.js, Three.js, React, PostgreSQL, MongoDB, Unity, Figma</p>
        </div>
      </div>
    `;
  },
};
