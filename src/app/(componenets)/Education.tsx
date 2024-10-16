"use client"

export default 

function Education() {
  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold mb-8 text-center">Education</h2>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold mb-2">
            Bachelor of Science in Computer Science
          </h3>
          <p className="text-gray-600 mb-4">University Name, Graduation Year</p>
          <ul className="list-disc list-inside text-gray-600">
            <li>
              Relevant coursework: Data Structures, Algorithms, Database
              Systems, Web Development
            </li>
            <li>
              Senior project: Developed a machine learning model for predicting
              stock prices
            </li>
            <li>GPA: 3.8/4.0</li>
          </ul>
        </div>
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold mb-2">
            Full-Stack Web Development Bootcamp
          </h3>
          <p className="text-gray-600 mb-4">Bootcamp Name, Completion Year</p>
          <ul className="list-disc list-inside text-gray-600">
            <li>
              Intensive 12-week program covering modern web development
              technologies
            </li>
            <li>
              Built 5 full-stack projects, including a social media application
              and an e-commerce platform
            </li>
            <li>
              Received award for "Most Innovative Project" in the final showcase
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
