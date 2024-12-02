import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
  CircularProgress
} from '@mui/material';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveCalendar } from '@nivo/calendar';
import { format, parseISO, subDays } from 'date-fns';
import { Refresh as RefreshIcon } from '@mui/icons-material';
import { useWebhooks } from '../../contexts/WebhookContext';
import WebhookMonitoring from '../../services/webhookMonitoring';

const MetricCard = ({ title, value, subtitle, loading }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Typography color="textSecondary" gutterBottom>
        {title}
      </Typography>
      {loading ? (
        <CircularProgress size={20} />
      ) : (
        <>
          <Typography variant="h4" component="div">
            {value}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {subtitle}
          </Typography>
        </>
      )}
    </CardContent>
  </Card>
);

const WebhookMonitoringDashboard = ({ webhookId }) => {
  const [metrics, setMetrics] = useState(null);
  const [recentExecutions, setRecentExecutions] = useState([]);
  const [dailyStats, setDailyStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useWebhooks();

  const monitoringService = new WebhookMonitoring(user?.uid);

  const loadData = async () => {
    setLoading(true);
    try {
      const [metricsData, executionsData, statsData] = await Promise.all([
        monitoringService.getWebhookMetrics(webhookId),
        monitoringService.getRecentExecutions(webhookId, 10),
        monitoringService.getDailyStats(webhookId, 30)
      ]);

      setMetrics(metricsData);
      setRecentExecutions(executionsData);
      setDailyStats(Object.entries(statsData).map(([date, data]) => ({
        date,
        ...data
      })));
    } catch (error) {
      console.error('Error loading webhook monitoring data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (webhookId && user?.uid) {
      loadData();
    }
  }, [webhookId, user?.uid]);

  const successRate = metrics ? 
    ((metrics.successCount / metrics.totalExecutions) * 100).toFixed(1) : 0;

  const lineData = [{
    id: 'Response Time',
    data: dailyStats.map(day => ({
      x: day.date,
      y: day.averageResponseTime
    }))
  }];

  const barData = dailyStats.map(day => ({
    date: format(parseISO(day.date), 'MMM dd'),
    success: day.success,
    failure: day.failure
  }));

  const pieData = metrics ? [
    {
      id: 'Success',
      label: 'Success',
      value: metrics.successCount
    },
    {
      id: 'Failure',
      label: 'Failure',
      value: metrics.failureCount
    }
  ] : [];

  const calendarData = dailyStats.map(day => ({
    day: day.date,
    value: day.total
  }));

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">Webhook Monitoring</Typography>
        <IconButton onClick={loadData} disabled={loading}>
          <RefreshIcon />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        {/* Metric Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Executions"
            value={metrics?.totalExecutions || 0}
            subtitle="All time"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Success Rate"
            value={`${successRate}%`}
            subtitle="All time"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Average Response Time"
            value={`${metrics?.averageResponseTime?.toFixed(0) || 0}ms`}
            subtitle="All time"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Last Status"
            value={
              <Chip
                label={metrics?.lastStatus || 'N/A'}
                color={metrics?.lastStatus === 'success' ? 'success' : 'error'}
                size="small"
              />
            }
            subtitle={metrics?.lastExecuted ? 
              `Last executed ${format(parseISO(metrics.lastExecuted), 'PPp')}` : 
              'Never executed'}
            loading={loading}
          />
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Response Time Trend</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveLine
                  data={lineData}
                  margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
                  xScale={{ type: 'point' }}
                  yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                  axisBottom={{
                    tickRotation: -45,
                    format: d => format(parseISO(d), 'MMM dd')
                  }}
                  axisLeft={{
                    legend: 'Response Time (ms)',
                    legendOffset: -40
                  }}
                  pointSize={8}
                  pointColor={{ theme: 'background' }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: 'serieColor' }}
                  enableArea={true}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Success vs Failure</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsivePie
                  data={pieData}
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  colors={{ scheme: 'nivo' }}
                  borderWidth={1}
                  borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                  enableArcLinkLabels={true}
                  arcLinkLabelsSkipAngle={10}
                  arcLinkLabelsTextColor="#333333"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Daily Executions</Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveBar
                  data={barData}
                  keys={['success', 'failure']}
                  indexBy="date"
                  margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
                  padding={0.3}
                  valueScale={{ type: 'linear' }}
                  colors={{ scheme: 'nivo' }}
                  axisBottom={{
                    tickRotation: -45
                  }}
                  axisLeft={{
                    legend: 'Executions',
                    legendOffset: -40
                  }}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  legends={[
                    {
                      dataFrom: 'keys',
                      anchor: 'top-right',
                      direction: 'row',
                      translateY: -20,
                      itemWidth: 100,
                      itemHeight: 20,
                      itemDirection: 'left-to-right'
                    }
                  ]}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Recent Executions</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Timestamp</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Response Time</TableCell>
                      <TableCell>Error</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentExecutions.map((execution, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {format(parseISO(execution.timestamp), 'PPp')}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={execution.status}
                            color={execution.status === 'success' ? 'success' : 'error'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{execution.responseTime}ms</TableCell>
                        <TableCell>
                          {execution.errorMessage && (
                            <Tooltip title={execution.errorMessage}>
                              <Typography
                                variant="body2"
                                sx={{
                                  maxWidth: 200,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                {execution.errorMessage}
                              </Typography>
                            </Tooltip>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WebhookMonitoringDashboard;
