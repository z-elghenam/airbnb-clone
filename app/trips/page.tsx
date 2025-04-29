import { getCurrentUser } from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservation";
import EmptyState from "@/components/EmptyState";
import TripsClient from "./TripsClient";

export const metadata = {
  title: "Airbnb | Trips",
};

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({
    userId: currentUser?.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trip found"
        subtitle="Looks like you haven't reserved any trips."
      />
    );
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
};

export default TripsPage;
