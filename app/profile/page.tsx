"use client"
import AuthGuard from "@/components/auth-guard"
import ProfileContent from "@/components/profile-content"

export default function ProfilePage() {
  return (
    <AuthGuard requireAuth>
      <div className="container py-10">
        <div className="mx-auto max-w-md">
          <ProfileContent />
        </div>
      </div>
    </AuthGuard>
  )
}
