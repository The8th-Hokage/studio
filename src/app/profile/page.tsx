import { ProfileForm } from '@/components/profile/profile-form';
import { currentUser } from '@/lib/data';

export default function ProfilePage() {
  return (
    <div className="h-full p-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold font-headline">Your Profile</h1>
          <p className="text-muted-foreground mt-1">
            Customize your public presence on ChatterSphere.
          </p>
        </header>
        <ProfileForm user={currentUser} />
      </div>
    </div>
  );
}
