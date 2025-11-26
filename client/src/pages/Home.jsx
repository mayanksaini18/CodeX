import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import Button from '../components/ui/Button';

const MOCK_COURSES = [
  {
    _id: 'c1',
    title: 'JavaScript Basics',
    description: 'Learn JS fundamentals — variables, functions, DOM.',
    topics: ['Variables', 'Functions', 'DOM', 'Events', 'ES6'],
    lessonsCount: 12,
    image: '/mnt/data/b7035810-d29e-4bf0-be2f-649df0deb6a4.png'
  },
  {
    _id: 'c2',
    title: 'React Quick Start',
    description: 'Components, hooks, state management and routing.',
    topics: ['Components', 'Props', 'useState', 'useEffect', 'Router'],
    lessonsCount: 18,
    image: '/mnt/data/b7035810-d29e-4bf0-be2f-649df0deb6a4.png'
  },
  {
    _id: 'c3',
    title: 'Data Structures & Algorithms',
    description: 'Arrays, linked lists, sorting, searching — practice problems.',
    topics: ['Arrays', 'Sorting', 'Hashing', 'Recursion', 'Graphs'],
    lessonsCount: 24,
    image: '/mnt/data/b7035810-d29e-4bf0-be2f-649df0deb6a4.png'
  }
];

export default function Home() {
  const [courses, setCourses] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    // Replace with API call: API.get('/courses').then(...)
    setCourses(MOCK_COURSES);
  }, []);

  const openCourse = (id) => {
    // navigate to course page — implement course detail page later
    nav(`/courses/${id}`);
  };

  return (
    <div className="p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Welcome to Code-X</h1>
        <div className="flex items-center gap-3">
          <Button onClick={() => { localStorage.removeItem('token'); nav('/login'); }}>
            Logout
          </Button>
        </div>
      </header>

      <section>
        <h2 className="text-xl font-semibold mb-4">Courses</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c) => (
            <CourseCard key={c._id} course={c} onOpen={openCourse} />
          ))}
        </div>
      </section>
    </div>
  );
}
