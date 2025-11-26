import React from 'react';
import Button from './ui/Button';
import Card from './ui/Card';

export default function CourseCard({ course, onOpen }) {
  // sample thumbnail - using the uploaded file path as requested
  const thumbnail = course.image || '/mnt/data/b7035810-d29e-4bf0-be2f-649df0deb6a4.png';

  return (
    <Card className="p-0 overflow-hidden">
      <div className="flex flex-col h-full">
        <img src={thumbnail} alt={course.title} className="w-full h-40 object-cover" />
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold">{course.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{course.description}</p>

          <div className="flex flex-wrap gap-2 mt-3">
            {course.topics?.slice(0, 6).map((t, i) => (
              <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-500">{course.lessonsCount} lessons</div>
            <Button onClick={() => onOpen(course._id)}>Open</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
