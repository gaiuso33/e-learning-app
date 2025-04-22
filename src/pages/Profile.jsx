import { useAuth } from '../context/AuthContext';

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div className="space-y-4">
        <div>
          <span className="font-semibold">Email: </span>{user.email}
        </div>

        {/* You can add more fake info if you want */}
        <div>
          <span className="font-semibold">Role: </span>Student
        </div>

        {/* Future: Add change password, etc */}
      </div>
    </div>
  );
}

export default Profile;
