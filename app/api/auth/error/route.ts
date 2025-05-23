import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const error = searchParams.get("error") || "Default"

  const errorMessages: Record<string, string> = {
    Configuration: "יש בעיה בהגדרות האתר. אנא פנו למנהל המערכת.",
    AccessDenied: "הגישה נדחתה. אין לכם הרשאה לגשת לאזור זה.",
    Verification: "הקישור לא תקין או שפג תוקפו.",
    Default: "אירעה שגיאה בהתחברות. נסו שנית.",
    CredentialsSignin: "פרטי ההתחברות שגויים. בדקו את האימייל והסיסמה ונסו שנית.",
    SessionRequired: "נדרשת התחברות כדי לגשת לדף זה.",
  }

  const errorMessage = errorMessages[error] || errorMessages.Default

  return NextResponse.json({ error, message: errorMessage }, { status: 200 })
}
