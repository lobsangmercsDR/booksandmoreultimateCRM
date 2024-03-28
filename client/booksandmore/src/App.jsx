import AppBarr from './components/Layout/AppBar'
import SideBar from './components/Layout/SideBar';

export default function App() {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full">
        <AppBarr />
        <div className="p-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
      </div>
    </div>

  );
}
