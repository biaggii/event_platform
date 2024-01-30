import { Button } from "@/components/ui/button";
import Link from "next/link";
import Collection from "@/components/shared/Collection";
import { auth } from "@clerk/nextjs";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { getOrdersByUser } from "@/lib/actions/order.actions";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPages) || 1;
  const eventPage = Number(searchParams?.ordersPages) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage })

  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];

  const organizedEvents = await getEventsByUser({ userId, page: eventPage })

  return (
    <>
      {/* My tickers*/ }
      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <div className='wrapper flex items-center justify-center sm:justify-between'>
          <h3 className='h3-bold text-center sm:text-left'>My tickets</h3>
          <Button asChild size='lg' className='button hidden sm:flex'>
            <Link href='/#events' className='button hidden sm:flex'>
              Explore move events
            </Link>
          </Button>
        </div>
      </section>
      <section className='wrapper my-8 '>
        <Collection
          data={ orderedEvents }
          emptyTitle="No Events tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={ 4 }
          page={ ordersPage }
          urlParamName='ordersPages'
          totalPages={ orders?.totalPages }
        />
      </section>
      {/* My events */ }
      {/* Events Organized */ }
      <section className='bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10'>
        <div className='wrapper flex items-center justify-center sm:justify-between'>
          <h3 className='h3-bold text-center sm:text-left'>Event Organized</h3>
          <Button asChild size='lg' className='button hidden sm:flex '>
            <Link href='/events/create' className='button hidden sm:flex'>
              Create new event
            </Link>
          </Button>
        </div>
      </section>
      <section className='wrapper my-8 '>
        <Collection
          data={ organizedEvents?.data }
          emptyTitle="No events have been created yet"
          emptyStateSubtext="Go create some noew"
          collectionType="Events_Organized"
          limit={ 4 }
          page={ eventPage }
          urlParamName='eventsPages'
          totalPages={ organizedEvents?.totalPages }
        />
      </section>
    </>
  );
}

export default ProfilePage;