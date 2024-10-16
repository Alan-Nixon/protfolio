"use client"

export default 

function Experience() {
  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold mb-2">
            Senior Full Stack Developer
          </h3>
          <p className="text-gray-600">TechCorp, 2020 - Present</p>
          <ul className="list-disc list-inside mt-4 text-gray-600">
            <li>Led development of scalable web applications</li>
            <li>Implemented CI/CD pipelines for efficient deployment</li>
            <li>Mentored junior developers and conducted code reviews</li>
            <li>
              Optimized database queries, resulting in 40% performance
              improvement
            </li>
            <li>
              Integrated third-party APIs to enhance application functionality
            </li>
          </ul>
        </div>
        <div className="bg-emerald-100 p-6 rounded-lg shadow-md border border-emerald-200 flex flex-col justify-center">
          <h3 className="text-xl font-semibold mb-2 text-emerald-800">
            Key Achievements
          </h3>
          <ul className="list-disc list-inside text-emerald-700">
            <li>Reduced server response time by 60%</li>
            <li>Implemented features that increased user engagement by 25%</li>
            <li>Led a team that delivered projects 15% ahead of schedule</li>
          </ul>
        </div>
      </div>
    </section>
  );
}