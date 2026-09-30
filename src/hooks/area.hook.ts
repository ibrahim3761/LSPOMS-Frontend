import { getPublicAreas } from "@/api";
import { useQuery } from "@tanstack/react-query";

export function useGetPublicAreas() {
  return useQuery({
    queryKey: ["areas"],
    queryFn: getPublicAreas,
  });
}