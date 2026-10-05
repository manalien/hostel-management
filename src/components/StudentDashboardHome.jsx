import { useEffect, useState } from "react";
import { SpinnerIcon } from "../assets/SpinnerIcon";
import { HomeIcon } from "../assets/HomeIcon";
import { StudentProfileCard } from "../components/StudentProfileCard";
import { AttendanceCard } from "../components/AttendanceCard";
import { AnnouncementsCard } from "../components/AnnouncementsCard";
import { RecentActivityCard } from "../components/RecentActivityCard";

export const StudentDashboardHome = ({ user, onNavigate }) => {
  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <SpinnerIcon className="w-8 h-8 text-[#638889] animate-spin" />
        <p className="text-gray-500 ml-3">Loading dashboard...</p>
      </div>
    );
  }

  // -------------------------
  // PROFILE
  // -------------------------
  const profile = {
    rollNo: user.roll_no,
    name: user.name,
    roomNo: user.room_no,
    course: user.course,
    email: user.email,
    phone: user.phone,
  };

  // -------------------------
  // ATTENDANCE
  // -------------------------
  const [attendance, setAttendance] = useState({
    marked: false,
    timeMarked: null,
    loading: true,
    error: null,
    message: null,
  });

  useEffect(() => {
    if (!user?.roll_no) return;

    const fetchAttendance = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/attendance/today/${user.roll_no}`
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message);
        setAttendance({
          marked: data.marked,
          timeMarked: data.timeMarked,
          loading: false,
          error: null,
          message: null,
        });
      } catch (err) {
        setAttendance((prev) => ({
          ...prev,
          loading: false,
          error: err.message,
        }));
      }
    };

    fetchAttendance();
  }, [user?.roll_no]);

  const handleMarkAttendance = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/attendance/mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roll_no: user.roll_no }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message);
      setAttendance({
        marked: true,
        timeMarked: data.timeMarked,
        loading: false,
        error: null,
        message: data.message,
      });
    } catch (err) {
      setAttendance((prev) => ({
        ...prev,
        loading: false,
        error: err.message,
      }));
    }
  };

  // -------------------------
  // ANNOUNCEMENTS
  // -------------------------
  const [announcements, setAnnouncements] = useState([]);
  const [announcementsLoading, setAnnouncementsLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/announcements");
        const data = await res.json();
        setAnnouncements(data);
      } catch (err) {
        console.error("Announcements error:", err);
      } finally {
        setAnnouncementsLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  // -------------------------
  // RECENT ACTIVITY 
  // -------------------------
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (!user?.roll_no) return;

    const fetchActivity = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/activity/${user.roll_no}`
        );
        const data = await res.json();
        setActivities(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Activity error:", err);
        setActivities([]);
      }
    };

    fetchActivity();
  }, [user?.roll_no]);

  // -------------------------
  // RETURN UI
  // -------------------------
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
        <HomeIcon className="w-8 h-8 mr-3 text-gray-500" />
        Welcome, {profile.name}!
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <StudentProfileCard profile={profile} />
        </div>

        <div>
          <AttendanceCard
            attendance={attendance}
            onMarkAttendance={handleMarkAttendance}
          />
        </div>

        <div className="lg:col-span-2">
          <AnnouncementsCard
            announcements={announcements}
            loading={announcementsLoading}
          />
        </div>

        <div>
          <RecentActivityCard
            activities={activities}
            onNavigate={onNavigate}
          />
        </div>
      </div>
    </>
  );
};
