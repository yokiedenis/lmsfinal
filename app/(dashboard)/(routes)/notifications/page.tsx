"use client";
import { useEffect, useState } from "react";

interface Notification {
  title: string;
  description: string;
  link: string;
  date: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Fetching AI and Software News from external API
        const response = await fetch(
          'https://api.currentsapi.services/v1/latest-news?keywords=AI&apiKey=sk7J3RNz0yTDC4mdMgFc9Ysq8MsKRuqgsu5t0gkMqx-6P8aW'
        );
        const data = await response.json();

        // Extract the 'news' array and map the items to fit your Notification structure
        const notifications = data.news.map((item: any) => ({
          title: item.title,
          description: item.description,
          link: item.url,
          date: item.published
        }));

        setNotifications(notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();

    // Set interval to fetch news every minute
    const interval = setInterval(fetchNotifications, 60000);

    // Cleanup interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-white mb-6 text-center animate__animated animate__fadeIn">
        Latest AI and Software News
      </h2>
      {/* <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-t-md font-semibold text-yellow-400 py-3 px-4 mb-4 text-center">
        <div>Recent Notifications</div>
      </div> */}

      <div className="overflow-y-auto max-h-[500px] space-y-4">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 hover:scale-105 transform transition-transform duration-300 ease-in-out animate__animated animate__fadeIn animate__delay-1s"
            >
              <div className="text-xl font-bold text-gray-800">{notification.title}</div>
              <div className="text-gray-600 mb-2">{notification.description}</div>
              <a
                href={notification.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Read more
              </a>
              <div className="text-sm text-gray-400 mt-2">{new Date(notification.date).toLocaleString()}</div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No notifications available</div>
        )}
      </div>
    </div>
  );
}
