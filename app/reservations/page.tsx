import { fetchReservations } from "@/utils/actions";
import Link from "next/link";
import EmptyList from "@/components/home/EmptyList";
import CountryFlagAndName from "@/components/card/CountryFlagAndName";
import { CiLogin, CiLogout } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { formatDate, formatCurrency } from "@/utils/format";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Stats from "@/components/reservations/Stats";

export default async function ReservationsPage() {
  const reservations = await fetchReservations();

  if (reservations.length === 0) {
    return <EmptyList />;
  }

  return (
    <>
      <Stats />
      <div className="mt-16">
        <h4 className="mb-4 capitalize">
          total reservations : {reservations.length}
        </h4>
        <Table>
          <TableCaption>A list of your recent reservations.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Property Name</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Nights</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Check In/Out</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((item) => {
              const {
                id,
                orderTotal,
                totalNights,
                checkIn,
                checkOut,
                createdAt,
              } = item;
              const {
                id: propertyId,
                name,
                country,
                slug,
                image,
              } = item.property;
              const startDate = formatDate(checkIn);
              const endDate = formatDate(checkOut);
              return (
                <TableRow key={id}>
                  <TableCell>
                    <Link
                      href={`/properties/${slug}`}
                      className="flex items-center space-x-2"
                    >
                      <Avatar>
                        <AvatarImage src={image} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <span className="underline text-muted-foreground tracking-wide">
                        {name}
                      </span>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <CountryFlagAndName countryCode={country} />
                  </TableCell>
                  <TableCell>{totalNights}</TableCell>
                  <TableCell>{formatCurrency(orderTotal)}</TableCell>
                  <TableCell>{formatDate(createdAt)}</TableCell>
                  <TableCell className="flex flex-col ">
                    <span className="flex items-center">
                      <CiLogin className="h-4 w-4 mr-2 text-green-500" />
                      {startDate}
                    </span>
                    <span className="flex items-center">
                      <CiLogout className="h-4 w-4 mr-2 text-red-500" />
                      {endDate}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
