import { NextResponse } from "next/server";

import { getCurrentUser } from "@/actions/getCurrentUser";
import db from "@/libs/db";

interface IParams {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { listingId } = await params;

  if (!listingId || typeof listingId !== "string")
    throw new Error("Invalid ID");

  // Option 1:
  // const favoriteIds = [...(currentUser.favoriteIds || [])];
  // favoriteIds.push(listingId);
  // const user = await db.user.update({
  //   where: {
  //     id: currentUser.id,
  //   },
  //   data: {
  //     favoriteIds,
  //   },
  // });

  // Option 2:Using Prisma's push operator (simpler)
  const user = await db.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds: {
        push: listingId,
      },
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { listingId } = await params;

  if (!listingId || typeof listingId !== "string")
    throw new Error("Invalid ID");

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const user = await db.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}
