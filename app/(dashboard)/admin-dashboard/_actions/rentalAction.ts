"use server";
import { authFetch } from "@/lib/auth-fetch";
import { Rental } from "@/types/rental";
export const getAllRentals = async (params?: {
  page?: string;
  limit?: string;
  status?: string;
}) => {
  const query = new URLSearchParams();
  if (params?.page) query.set("page", params.page);
  if (params?.limit) query.set("limit", params.limit);
  if (params?.status) query.set("status", params.status);
  const qs = query.toString();

  const result = await authFetch(`/api/admin/rentals${qs ? `?${qs}` : ""}`);

  if (!result.success) {
    return { data: [] as Rental[], meta: null, error: result.message };
  }
  return { data: result.data as Rental[], meta: result.meta, error: null };
};
