# Streamify Dashboard

A modern, interactive analytics dashboard for music streaming platforms, providing real-time insights into user growth, revenue distribution, and top-performing content.

## Overview

Streamify Dashboard is a comprehensive analytics platform designed for music streaming services. It provides detailed insights into various metrics including user engagement, revenue streams, and content performance. The dashboard offers both individual user analytics and aggregated country-level views, making it suitable for both personal and business use cases.

## Features

### 1. User Analytics
- **Total Users**: Track the overall user base growth
- **Active Users**: Monitor daily active users and engagement metrics
- **User Growth Trends**: Visualize user acquisition and retention patterns
- **Geographic Distribution**: View user distribution across different regions

### 2. Revenue Analytics
- **Revenue Distribution**: Breakdown of revenue streams (subscriptions, ads, purchases)
- **Revenue Trends**: Track revenue growth and seasonal patterns
- **Revenue by Region**: Geographic distribution of revenue sources

### 3. Content Analytics
- **Top Songs**: Monitor most-streamed tracks
- **Stream Counts**: Track total plays and engagement metrics
- **Content Performance**: Analyze which content performs best across different regions

### 4. Interactive Visualizations
- **User Growth Chart**: Area chart showing user growth trends
- **Revenue Distribution Chart**: Donut chart displaying revenue breakdown
- **Top Songs Chart**: Bar chart showcasing most popular tracks

### 5. Recent Streams Search
The Recent Streams section provides powerful search capabilities to help you find specific streams and analyze listening patterns. Here are some tips for effective searching:

#### Search Parameters
- **Song Title**: Search by exact or partial song names
- **Artist Name**: Filter by specific artists
- **Date Range**: Search within specific time periods
- **Stream Count**: Find songs with specific play counts
- **User ID**: Look up streams from specific users
- **Region**: Filter by geographic location

#### Search Tips
1. **Use Wildcards**:
   - `*` for multiple characters (e.g., `love*` finds "lover", "lovesick", etc.)
   - `?` for single characters (e.g., `b?t` finds "bit", "but", "bet")

2. **Combine Filters**:
   - Artist + Date Range: `artist:"Taylor Swift" date:"2024-03"`
   - Region + Stream Count: `region:"US" streams:>1000`

3. **Time-based Searches**:
   - Last 24 hours: `time:"last24h"`
   - This week: `time:"thisweek"`
   - Custom range: `time:"2024-03-01 to 2024-03-15"`

4. **Advanced Operators**:
   - AND: `artist:"Drake" AND streams:>500`
   - OR: `genre:"pop" OR genre:"rock"`
   - NOT: `artist:"Drake" NOT album:"Views"`

5. **Sorting Options**:
   - Most recent: `sort:date`
   - Most streams: `sort:streams`
   - Alphabetical: `sort:name`

#### Example Searches
- Find popular songs in the US: `region:"US" streams:>1000 sort:streams`
- Recent streams from a specific user: `user:"user123" time:"last24h"`
- Songs by multiple artists: `artist:"Drake" OR artist:"Taylor Swift"`
- High-streaming songs in a genre: `genre:"pop" streams:>5000`

## Data Context

The dashboard provides analytics at two levels:

1. **Individual User Level**
   - Personal listening habits
   - Individual subscription status
   - Personal content preferences
   - User-specific engagement metrics

2. **Aggregated Country Level**
   - Regional user growth patterns
   - Country-specific revenue distribution
   - Geographic content preferences
   - Regional market trends

## Technical Stack

- **Frontend**: React with TypeScript
- **UI Framework**: Material-UI (MUI)
- **Charts**: Recharts
- **State Management**: React Context API
- **Styling**: CSS-in-JS with MUI's styled-components

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── MetricCard.tsx
│   ├── UserGrowthChart.tsx
│   ├── RevenueDistributionChart.tsx
│   └── TopSongsChart.tsx
├── pages/             # Page components
│   └── Dashboard.tsx
├── utils/             # Utility functions and data
│   └── mockData.ts
└── App.tsx            # Main application component
```

## Data Sources

The dashboard can be integrated with various data sources:
- Streaming platform APIs
- User analytics services
- Revenue tracking systems
- Content management systems

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
