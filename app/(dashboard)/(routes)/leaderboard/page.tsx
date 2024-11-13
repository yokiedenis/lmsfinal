"use client"; // Ensures client-side rendering for this component

import React, { useEffect, useState } from 'react';

type Learner = {
  id: string;
  name: string;
  imageUrl: string | null;
  statistics: number;
  lessonStatus: string;
  quizScore: string;
  assignmentStatus: string;
  webinarStatus: string;
  feedbackAssignmentStatus: string;
  feedbackWebinarStatus: string;
};

const AnalyticsPage: React.FC = () => {
  const [learners, setLearners] = useState<Learner[]>([]);

  useEffect(() => {
    async function fetchLearners() {
      try {
        const response = await fetch('/api/learners');
        if (!response.ok) {
          throw new Error('Failed to fetch learners');
        }
        const data: Learner[] = await response.json();
        setLearners(data);
      } catch (error) {
        console.error('Error fetching learners:', error);
      }
    }

    fetchLearners();
  }, []);

  return (
    <div className="analytics-container">
      <h2>Students LeaderBoard</h2>
      <table className="analytics-table">
        <thead>
          <tr>
            <th>Learner's Name</th>
            <th>Statistics</th>
            <th>Lesson</th>
            <th>Quiz</th>
            <th>Assignment</th>
            <th>Webinar</th>
            <th>Feedback - Assignment</th>
            <th>Feedback - Webinar</th>
          </tr>
        </thead>
        <tbody>
          {learners.map((learner) => (
            <tr key={learner.id}>
              <td>
                <div className="learner-info">
                  <img src={learner.imageUrl || '/avatar.png'} alt={learner.name} />
                  <span>{learner.name}</span>
                </div>
              </td>
              <td>{`${learner.statistics}%`}</td>
              <td className={`status ${learner.lessonStatus.replace(/\s+/g, '-').toLowerCase()}`}>{learner.lessonStatus}</td>
              <td className={`status ${learner.quizScore.toLowerCase()}`}>{learner.quizScore}</td>
              <td className={`status ${learner.assignmentStatus.toLowerCase()}`}>{learner.assignmentStatus}</td>
              <td className={`status ${learner.webinarStatus.toLowerCase()}`}>{learner.webinarStatus}</td>
              <td className={`status ${learner.feedbackAssignmentStatus.toLowerCase()}`}>{learner.feedbackAssignmentStatus}</td>
              <td className={`status ${learner.feedbackWebinarStatus.toLowerCase()}`}>{learner.feedbackWebinarStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnalyticsPage;