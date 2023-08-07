/// material-ui
import { Button, Divider, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import DeleteIcon from '@mui/icons-material/DeleteOutlined';

// mui-datagrid
import {
  // useGridApiContext,
  DataGrid,
  GridToolbarContainer,
  // GridActionsCellItem,
  GridToolbarFilterButton,
  GridToolbarExport
  // useGridApiRef
} from '@mui/x-data-grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';

import React, { useEffect, useState } from 'react';
import config from '../../config';
// import { getJWTFromLS } from '../../utils/jwtUtils';
// import { format } from 'date-fns';

// ==============================|| BOOK LISTINGS MANAGEMENT ||============================== //

const apiKey = config.bookAPI;
const apiUrl = 'https://www.googleapis.com/books/v1/volumes';

function BookDataToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

const BookData = () => {
  // const apiRef = useGridApiRef();
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Search results', searchResults);
    console.log('DataGrid is rendering with rows:', rows);
    setRows(searchResults);
  }, [searchResults, rows]);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    console.log('Search button clicked'); // Debugging line
    setLoading(true); // Set loading to true before making the API request
    fetch(`${apiUrl}?q=${query}&key=${apiKey}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data from API:', data); // Debugging line
        setSearchResults(data.items);
        console.log('Search results', searchResults);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setSearchResults([]);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the API request is complete
      });
  };

  const columns = [
    {
      field: 'volumeInfo.title',
      headerName: 'Title',
      width: 200,
      valueGetter: (params) => {
        return params.row.volumeInfo.title || '';
      }
    },
    {
      field: 'volumeInfo.authors',
      headerName: 'Author(s)',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      valueGetter: (params) =>
        params.row.volumeInfo.authors
          ? params.row.volumeInfo.authors.length === 1
            ? params.row.volumeInfo.authors[0]
            : params.row.volumeInfo.authors.join(', ')
          : ''
    },
    {
      field: 'volumeInfo.categories',
      headerName: 'Genre/Subject',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      valueGetter: (params) =>
        params.row.volumeInfo.categories
          ? params.row.volumeInfo.categories.length === 1
            ? params.row.volumeInfo.categories[0]
            : params.row.volumeInfo.categories.join(', ')
          : ''
    },
    {
      field: 'volumeInfo.language',
      headerName: 'Language',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      valueGetter: (params) => {
        return params.row.volumeInfo.language || '';
      }
    },
    {
      field: 'volumeInfo.publisher',
      headerName: 'Press',
      width: 100,
      align: 'left',
      headerAlign: 'left',
      valueGetter: (params) => {
        return params.row.volumeInfo.publisher || '';
      }
    },
    {
      field: 'volumeInfo.industryIdentifiers[0].identifier',
      headerName: 'ISBN',
      width: 80,
      valueGetter: (params) => {
        return params.row.volumeInfo.industryIdentifiers[0].identifier || '';
      }
    },
    {
      field: 'volumeInfo.imageLinks.thumbnail',
      headerName: 'Cover',
      width: 80,
      valueGetter: (params) => {
        return params.row.volumeInfo.imageLinks.thumbnail.identifier || '';
      }
    }
  ];

  return (
    <MainCard title="Book Data">
      <Typography variant="body2">
        <TextField label="Search Books" value={query} onChange={handleInputChange} />
        <Button variant="contained" color="primary" onClick={handleSearch} disabled={loading}>
          Search
        </Button>
        <Divider />
        <Box
          sx={{
            height: 500,
            width: '100%',
            '& .actions': {
              color: 'text.secondary'
            },
            '& .textPrimary': {
              color: 'text.primary'
            }
          }}
        >
          {loading ? (
            <Typography variant="body2">Loading...</Typography>
          ) : (
            <DataGrid
              rows={rows}
              columns={columns}
              slots={{
                toolbar: BookDataToolbar
              }}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5
                  }
                }
              }}
              pageSizeOptions={[5, 10, 25, 50]}
            />
          )}
        </Box>
      </Typography>
    </MainCard>
  );
};

export default BookData;