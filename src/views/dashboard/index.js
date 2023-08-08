import { useState } from 'react';

// material-ui
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Grid,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';

// import MenuItem from '@mui/material';
// import TextField from '@mui/material';

// project import
import TransactionTable from './TransactionTable';
import BooksTransactionChart from './BooksTransactionChart';
import WeeklyBarChart from './WeeklyBarChart';
import ReportAreaChart from './ReportAreaChart';
import PickupPointColumnChart from './PickupPointColumnChart';
import MainCard from 'ui-component/cards/MainCard';
import AnalyticEcommerce from 'ui-component/cards/statistics/AnalyticEcommerce';
import MonthlyLikedChart from "./MonthlyLikedChart";
import AgeDemographicsChart from "./AgeDemographicsChart";
import TransactionAreaChart from "./TransactionAreaChart";

// assets
import { GiftOutlined, MessageOutlined } from '@ant-design/icons';
// import SettingOutlined from '@ant-design/icons';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// sales report status
// const status = [
//   {
//     value: 'today',
//     label: 'Today'
//   },
//   {
//     value: 'month',
//     label: 'This Month'
//   },
//   {
//     value: 'year',
//     label: 'This Year'
//   }
// ];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  // const [value, setValue] = useState('today');
  const [slot, setSlot] = useState('week');

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Page Views" count="4,420,236" percentage={31.8} extra="140,564" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Registered Users" count="138,250" percentage={45.2} extra="62,489" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Book Listings" count="18,800" percentage={12.4} isLoss color="warning" extra="2,331" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total New Users Registration" count="26,815" percentage={24.8} extra="6650" />
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 2 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Number of books transaction</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
              <Button
                size="small"
                onClick={() => setSlot('month')}
                color={slot === 'month' ? 'primary' : 'secondary'}
                variant={slot === 'month' ? 'outlined' : 'text'}
              >
                Month
              </Button>
              <Button
                size="small"
                onClick={() => setSlot('week')}
                color={slot === 'week' ? 'primary' : 'secondary'}
                variant={slot === 'week' ? 'outlined' : 'text'}
              >
                Week
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1.0, pr: 2 }}>
            <BooksTransactionChart slot={slot} />
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Popular times of the week for user engagement</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 3.0 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
                This Week Statistics
              </Typography>
            </Stack>
          </Box>
          <WeeklyBarChart />
        </MainCard>
      </Grid>

      {/* row 3 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Top 10 most liked books</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 3.0 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
                This Month Statistics
              </Typography>
            </Stack>
          </Box>
          <MonthlyLikedChart />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Demographic Breakdown by Age</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 3.0, height: '475px' }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
                {/*This Week Statistics*/}
              </Typography>
            </Stack>
          </Box>
          <AgeDemographicsChart />
        </MainCard>
      </Grid>

      {/* row 4 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Recent Transactions</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <TransactionTable />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Number of Transaction by Area</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2.0, height: '475px' }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
                This Month Statistics
              </Typography>
            </Stack>
          </Box>
          <TransactionAreaChart />
        </MainCard>
      </Grid>

      {/* row 5 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Pickup Point Information</Typography>
          </Grid>
          {/*<Grid item>*/}
          {/*<TextField*/}
          {/*  id="standard-select-currency"*/}
          {/*  size="small"*/}
          {/*  select*/}
          {/*  value={value}*/}
          {/*  onChange={(e) => setValue(e.target.value)}*/}
          {/*  sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}*/}
          {/*>*/}
          {/*{status.map((option) => (*/}
          {/*  <MenuItem key={option.value} value={option.value}>*/}
          {/*    {option.label}*/}
          {/*  </MenuItem>*/}
          {/*))}*/}
          {/*</TextField>*/}
          {/*</Grid>*/}
        </Grid>
        <MainCard sx={{ mt: 2.0 }}>
          <Stack spacing={1.5} sx={{ mb: 3 }}>
            <Typography variant="h6" color="secondary">
              {/*Net Profit*/}
            </Typography>
          </Stack>
          <PickupPointColumnChart />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Transaction History</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List
            component="nav"
            sx={{
              px: 0,
              py: 0,
              '& .MuiListItemButton-root': {
                py: 1.5,
                '& .MuiAvatar-root': avatarSX,
                '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
              }
            }}
          >
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: 'success.main',
                    bgcolor: 'success.lighter'
                  }}
                >
                  <GiftOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Book Id #1612130291</Typography>} secondary="28 July, 5:45 PM" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    Status
                  </Typography>
                  <Typography variant="h6" color="primary" noWrap>
                    Completed
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: 'success.main',
                    bgcolor: 'success.lighter'
                    // color: 'primary.main',
                    // bgcolor: 'primary.lighter'
                  }}
                >
                  <GiftOutlined />
                  {/*<MessageOutlined />*/}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Book Id #61122416</Typography>} secondary="31 July, 2:00 PM" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    Status
                  </Typography>
                  <Typography variant="h6" color="primary" noWrap>
                    Completed
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: 'error.main',
                    bgcolor: 'error.lighter'
                  }}
                >
                  <MessageOutlined />
                  {/*<SettingOutlined />*/}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Book Id #385732554</Typography>} secondary="7 hours ago" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    Status
                  </Typography>
                  <Typography variant="h6" color="error" noWrap>
                    Pending
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
          </List>
        </MainCard>
        <MainCard sx={{ mt: 2 }}>
          <Stack spacing={3}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Stack>
                  <Typography variant="h5" noWrap>
                    Help & Support Chat
                  </Typography>
                  <Typography variant="caption" color="secondary" noWrap>
                    Typical replay within 5 min
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                  <Avatar alt="Remy Sharp" src={avatar1} />
                  <Avatar alt="Travis Howard" src={avatar2} />
                  <Avatar alt="Cindy Baker" src={avatar3} />
                  <Avatar alt="Agnes Walker" src={avatar4} />
                </AvatarGroup>
              </Grid>
            </Grid>
            <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
              Need Help?
            </Button>
          </Stack>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;
