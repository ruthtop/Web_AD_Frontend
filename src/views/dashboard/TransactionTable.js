import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party - use NumericFormat or PatternFormat in place of NumberFormat
// import { PatternFormat } from 'react-number-format';

// project import
import Dot from 'ui-component/extended/Dot';

function createData(bookId, bookTitle, donarId, status, bookCondition) {
  return { bookId, bookTitle, donarId, status, bookCondition };
}

const rows = [
  createData(439023483, 'The Hunger Games', 1, 1, 8),
  createData(439554934, "Harry Potter and the Philosopher's Stone", 2, 1, 9),
  createData(316015849, 'Twilight', 3, 1, 9),
  createData(61120081, 'To Kill a Mockingbird', 4, 0, 6),
  createData(743273567, 'The Great Gatsby', 5, 1, 9),
  createData(525478817, 'The Fault in Our Stars', 6, 0, 7),
  createData(618260307, 'The Hobbit or There and Back Again', 7, 1, 7),
  createData(316769177, 'The Catcher in the Rye', 8, 1, 8),
  createData(1416524797, 'Angels & Demons ', 9, 2, 5),
  createData(679783261, 'Pride and Prejudice', 10, 1, 9)
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| TRANSACTION TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'bookId',
    align: 'left',
    disablePadding: false,
    label: 'Book Id'
  },
  {
    id: 'bookTitle',
    align: 'left',
    disablePadding: true,
    label: 'Book Title'
  },
  {
    id: 'donarId',
    align: 'center',
    disablePadding: false,
    label: 'Donar Id'
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: false,

    label: 'Status'
  },
  {
    id: 'bookCondition',
    align: 'center',
    disablePadding: false,
    label: 'Book Condition'
  }
];

// ==============================|| TRANSACTION TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| TRANSACTION TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'Pending';
      break;
    case 1:
      color = 'success';
      title = 'Approved';
      break;
    case 2:
      color = 'error';
      title = 'Rejected';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

OrderStatus.propTypes = {
  status: PropTypes.number
};

// ==============================|| TRANSACTION TABLE ||============================== //

export default function TransactionTable() {
  const [order] = useState('asc');
  const [orderBy] = useState([]);
  const [selected] = useState([]);

  const isSelected = (bookId) => selected.indexOf(bookId) !== -1;

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              const isItemSelected = isSelected(row.bookId);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.bookId}
                  selected={isItemSelected}
                >
                  <TableCell component="th" id={labelId} scope="row" align="left">
                    <Link color="secondary" component={RouterLink} to="">
                      {row.bookId}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{row.bookTitle}</TableCell>
                  <TableCell align="center">{row.donarId}</TableCell>
                  <TableCell align="left">
                    <OrderStatus status={row.status} />
                  </TableCell>
                  <TableCell align="center">
                    {row.bookCondition}
                    {/*<PatternFormat value={row.bookCondition} displayType="text" thousandSeparator prefix="$" format="### ###" />*/}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
