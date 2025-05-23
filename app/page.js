'use client';
import { useState, useEffect } from 'react';
import CollegeList from './components/CollegeList';
import Select from 'react-select';

export default function Home() {
  const [formData, setFormData] = useState({
    cutoff: '',
    category: '',
    course: [], // now an array for multi-select
  });

  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [collegeList, setCollegeList] = useState([]);

  useEffect(() => {
    // Fetch college names from the static JSON file
    fetch('/colleges.json')
      .then(res => res.json())
      .then(data => setCollegeList(data.map(college => ({ value: college, label: college }))))
      .catch(() => setCollegeList([]));
  }, []);

  useEffect(() => {
    // Fetch course names from the static JSON file
    fetch('/courses.json')
      .then(res => res.json())
      .then(data => setCourseList(data.map(course => ({ value: course, label: course }))))
      .catch(() => setCourseList([]));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cutoff: formData.cutoff,
          category: formData.category,
          course: formData.course.map(c => c.value), // send as array of brn
          college: formData.college ? formData.college.map(c => c.value) : [], // send as array of college names
        }),
      });
      const data = await response.json();
      setColleges(data);
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCourseChange = (selectedOptions) => {
    setFormData({
      ...formData,
      course: selectedOptions || []
    });
  };

  const handleCollegeChange = (selectedOptions) => {
    setFormData({
      ...formData,
      college: selectedOptions || []
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 font-sans">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-blue-700 drop-shadow-lg tracking-tight">
          🎓 College Search
        </h1>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-blue-100 p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cutoff Marks
              </label>
              <input
                type="number"
                name="cutoff"
                value={formData.cutoff}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter cutoff marks"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Category</option>
                <option value="OC">OC</option>
                <option value="BC">BC</option>
                <option value="BCM">BCM</option>
                <option value="MBC">MBC</option>
                <option value="SC">SC</option>
                <option value="SCA">SCA</option>
                <option value="ST">ST</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Courses
              </label>
              {courseList.length > 0 ? (
                <Select
                  isMulti
                  isSearchable
                  name="course"
                  options={courseList}
                  value={formData.course}
                  onChange={handleCourseChange}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Type to search and select courses"
                />
              ) : (
                <div className="text-gray-400">Loading courses...</div>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Colleges
              </label>
              {collegeList.length > 0 ? (
                <Select
                  isMulti
                  isSearchable
                  name="college"
                  options={collegeList}
                  value={formData.college}
                  onChange={handleCollegeChange}
                  className="basic-multi-select"
                  classNamePrefix="Enter College Name"
                />
              ) : (
                <div className="text-gray-400">Loading colleges...</div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg text-lg font-bold shadow-md hover:scale-105 transition-transform duration-200"
            disabled={loading}
          >
            {loading ? 'Searching...' : '🔍 Search Colleges'}
          </button>
        </form>
        {colleges.length > 0 && (
          <div className="mt-12">
            <CollegeList colleges={colleges} userCutoff={formData.cutoff} userCategory={formData.category} />
          </div>
        )}
      </div>
    </main>
  );
}