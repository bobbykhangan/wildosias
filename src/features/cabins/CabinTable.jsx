import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { getCabins } from '../../services/apiCabins';
// import CabinRow from 'features/cabins/CabinRow';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
// import Table from 'ui/Table';
// import Menus from 'ui/Menus';
// import Empty from 'ui/Empty';
// import { useCabins } from 'features/cabins/useCabins';
// import { useSearchParams } from 'react-router-dom';
// import { Suspense } from 'react';

// v2
// Right now this is not really reusable... But we will want to use a similar table for guests as well, but with different columns. ALSO, right now we are defining these columns in BOTH the TableHeader and the CabinRow, which is not good at all. Instead, it would be much better to simply pass the columns into the Table, and the table would give access to the columns to both the header and row. So how can we do that? Well we can again use a compound component! We don't HAVE to do it like this, there's a million ways to implement a table, also without CSS Grid, but this is what I chose

// v1

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4 rem;
  background-color: var(--color-grey-200);
  border-radius: 7px;
  overflow: hidden;
`
const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

// We want each table row to have a menu, and we only want one of them to be open at the same time. We also want this functionality to be reusable. We could add a openID state here to the table, but that wouldn't really be reusable... The best way is to use a compound component

// The hotel won't ever have a lot of cabins, so there is no need to paginate. So we will do no pagination, AND we will do filtering and sorting. So here we learn how to do it on the FRONT-END (later in the booking we will do the BACK-END version, which is more real world)

function CabinTable() {
    const {isLoading, data:cabins, error} = useQuery({
      queryKey: ["cabins"],
      queryFn: getCabins
    });

    if(isLoading) return <Spinner />
    return <Table role="table">
      <TableHeader role='row'>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {cabins.map((cabin)=> (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}  
    </Table>
}

// We could create yet another layer of abstraction on top of this. We could call this component just <Results>, like: Results({data, count, isLoading, columns, rowComponent}). Then <CabinTable> and ALL other tables would simply call that.
// BUT, creating more abstractions also has a cost! More things to remember, more complex codebase to understand. Sometimes it's okay to just copy and paste instead of creating abstractions

export default CabinTable;
