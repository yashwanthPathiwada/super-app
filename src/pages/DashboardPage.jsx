import Navbar from '../components/Layout/Navbar';
import ProfileWidget from '../components/Dashboard/ProfileWidget';
import WeatherWidget from '../components/Dashboard/WeatherWidget';
import NewsWidget from '../components/Dashboard/NewsWidget';
import NotesWidget from '../components/Dashboard/NotesWidget';
import TimerWidget from '../components/Dashboard/TimerWidget';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-ink">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h1 className="mb-6 font-display text-2xl font-bold text-white">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          <ProfileWidget />
          <WeatherWidget />
          <NewsWidget />
          <NotesWidget />
          <TimerWidget />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
