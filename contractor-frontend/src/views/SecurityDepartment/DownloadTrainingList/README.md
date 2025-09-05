# DownloadTrainingList Component - Refactored Architecture

## Overview
This document describes the refactored component architecture for the DownloadTrainingList feature. The original monolithic Vue component has been broken down into smaller, reusable components and composables for better maintainability and understanding.

## Directory Structure
```
DownloadTrainingList/
├── components/               # UI Components
│   ├── CalendarHeader.vue   # Calendar navigation and view controls
│   ├── MonthView.vue        # Month calendar display
│   ├── WeekView.vue         # Week calendar display
│   ├── EventDetailModal.vue # Event details popup
│   ├── ParticipantsModal.vue # Participants list popup
│   ├── MoreEventsModal.vue  # Multiple events display popup
│   └── StatisticsCards.vue  # Training statistics cards
├── composables/             # Business Logic
│   ├── useCalendar.js       # Calendar state and navigation
│   ├── useEventData.js      # Event data management
│   └── usePDFGeneration.js  # PDF generation utilities
└── DownloadTrainingList.vue # Main container component
```

## Component Responsibilities

### Main Component - `DownloadTrainingList.vue`
- **Purpose**: Main container that orchestrates all child components
- **Responsibilities**:
  - Imports and uses all composables
  - Manages modal states
  - Handles component communication via events
  - Provides PDF download functionality

### UI Components

#### `StatisticsCards.vue`
- **Purpose**: Display training statistics
- **Props**: 
  - `totalEvents`: Total number of training events
  - `monthlyEvents`: Number of events this month
- **Features**: 
  - Responsive card layout
  - Icons and animations

#### `CalendarHeader.vue`
- **Purpose**: Calendar navigation and view mode controls
- **Props**:
  - `currentMonthYear`: Current month/year display text
  - `viewMode`: Current view mode (month/week)
- **Events**:
  - `previous-month`: Navigate to previous month
  - `next-month`: Navigate to next month
  - `go-to-today`: Jump to current date
  - `change-view-mode`: Switch between month/week view

#### `MonthView.vue`
- **Purpose**: Display calendar in month view
- **Props**:
  - `calendarDates`: Array of calendar dates with events
  - `daysOfWeek`: Day names for header
- **Events**:
  - `event-click`: When user clicks on an event
  - `show-more-events`: When user wants to see more events
- **Features**:
  - Multi-day event spanning
  - Event truncation with "more" option
  - Today highlighting

#### `WeekView.vue`
- **Purpose**: Display calendar in week view
- **Props**:
  - `weekDays`: Array of week days
  - `timeSlots`: Time slots for the day
  - `events`: Training events
- **Events**:
  - `event-click`: When user clicks on an event
- **Features**:
  - Time-based event positioning
  - Hourly grid layout

#### `EventDetailModal.vue`
- **Purpose**: Show detailed information about a training event
- **Props**:
  - `show`: Modal visibility state
  - `event`: Event object with details
  - `selectedDate`: Specific date selected (for multi-day events)
- **Events**:
  - `close`: Close the modal
  - `show-participants`: Open participants modal
  - `download-pdf`: Download participant list
- **Features**:
  - Thai date formatting
  - Event status indication (past/future)
  - Action buttons with state management

#### `ParticipantsModal.vue`
- **Purpose**: Display list of training participants
- **Props**:
  - `show`: Modal visibility state
  - `event`: Event object with participants
  - `selectedDate`: Specific date selected
- **Features**:
  - Data censoring (phone numbers, ID cards)
  - Scrollable table for large lists
  - Responsive design

#### `MoreEventsModal.vue`
- **Purpose**: Show multiple events for a specific date
- **Props**:
  - `show`: Modal visibility state
  - `events`: Array of events for the date
  - `date`: Date string
- **Events**:
  - `close`: Close the modal
  - `event-click`: When user selects an event
- **Features**:
  - Event status visual indicators
  - Click-to-select functionality

## Composables (Business Logic)

### `useCalendar.js`
- **Purpose**: Calendar state and navigation logic
- **Returns**:
  - Reactive calendar state
  - Navigation functions
  - Date calculation utilities
- **Features**:
  - Month/week view management
  - Thai calendar integration
  - Date formatting utilities

### `useEventData.js`
- **Purpose**: Training event data management
- **Returns**:
  - Event data and statistics
  - Event filtering functions
  - Event display generation
- **Features**:
  - Mock data for development
  - Multi-day event handling
  - Event positioning for calendar views

### `usePDFGeneration.js`
- **Purpose**: PDF generation functionality
- **Returns**:
  - PDF generation functions
  - Loading state management
  - Multiple fallback methods
- **Features**:
  - HTML-to-Canvas high-quality PDF
  - Browser print-to-PDF fallback
  - ASCII-only fallback for compatibility
  - Thai language support
  - Data privacy (censored personal info)

## Key Features

### Data Privacy
- Phone numbers are masked (081****922)
- ID card numbers are masked (121*******580)
- Privacy notices in generated PDFs

### Thai Language Support
- Buddhist Era (BE) calendar (+543 years)
- Thai month names
- Thai day names
- UTF-8 encoding support

### Multi-Day Events
- Events can span multiple days
- Visual indication of event start/middle/end
- Proper date range formatting

### Event Status Management
- Past events (grayed out, disabled)
- Future events (active)
- Current events (highlighted)

### PDF Generation
- Multiple generation methods for compatibility
- Signature columns for attendance
- Professional report formatting
- Error handling and user feedback

## Benefits of Refactoring

### 1. **Maintainability**
- Each component has a single responsibility
- Easier to locate and fix bugs
- Clear separation of concerns

### 2. **Reusability**
- Components can be reused in other parts of the application
- Composables can be shared across different views
- Modular architecture supports component libraries

### 3. **Testability**
- Individual components can be unit tested
- Composables can be tested independently
- Mocking is easier with separated concerns

### 4. **Readability**
- Smaller files are easier to understand
- Clear naming conventions
- Self-documenting code structure

### 5. **Scalability**
- Easy to add new features without affecting existing code
- New developers can understand the codebase faster
- Better code organization for team development

## Usage Example

```vue
<template>
  <DownloadTrainingList />
</template>

<script setup>
import DownloadTrainingList from './views/SecurityDepartment/DownloadTrainingList/DownloadTrainingList.vue';
</script>
```

## Dependencies
- Vue 3 (Composition API)
- External libraries for PDF generation (loaded dynamically):
  - jsPDF (for PDF creation)
  - html2canvas (for HTML to image conversion)

## Browser Compatibility
- Modern browsers with ES6 support
- PDF generation works best in Chrome/Edge
- Fallback options for older browsers