import { useQuery } from "@tanstack/react-query"
import { subDays } from "date-fns"
import { useSearchParams } from "react-router-dom"
import { getStaysAfterDate } from "../../services/apiBookings"

export function useRecentStays() {
  const [searchParams] = useSearchParams()

  // by default fetch only last 7 days data
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"))

  const queryDate = subDays(new Date(), numDays).toISOString()

  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),

    queryKey: ["stays", `last-${numDays}`],
  })

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  )

  return { isLoading, confirmedStays, stays, numDays }
}
