
interface DashboardProps {
  email: string;
  onLogout: () => void;
}

function Dashboard({ email, onLogout }: DashboardProps) {
  return (
    <div className="container">
      <h1>Dashboard</h1>
      <p>Вітаємо, {email}!</p>
      <button onClick={onLogout}>
        Вийти
      </button>
    </div>
  );
}

export default Dashboard;
