"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

type ProfileActionState = {
  success: boolean;
  statusCode: number;
  message: string;
};

export const updateProfileAction = async (
  prevState: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      statusCode: 401,
      message: "You must be logged in to update your profile.",
    };
  }

  const payload = {
    name: formData.get("name"),
    phone: formData.get("phone") || null,
    address: formData.get("address") || null,
    bio: formData.get("bio") || null,
  };

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: `accessToken=${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  if (result.success) {
    revalidatePath("/dashboard/profile");
    revalidatePath("/provider-dashboard/profile");
    revalidatePath("/admin-dashboard/profile");
  }

  return {
    success: result.success,
    statusCode: res.status,
    message:
      result.message ?? (result.success ? "Profile updated" : "Update failed"),
  };
};
