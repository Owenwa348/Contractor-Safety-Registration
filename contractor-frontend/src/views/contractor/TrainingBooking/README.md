# TrainingBooking Module - Modular Architecture

This module has been completely refactored into a modular component structure for better maintainability, readability, and understanding.

## 🏗️ Architecture Overview

The TrainingBooking module now follows a **component-based architecture** with clear separation of concerns:

- **Components**: Reusable UI components focused on presentation
- **Composables**: Business logic and state management 
- **Main Container**: Orchestrates components and handles data flow

## 📁 Directory Structure

```
TrainingBooking/
├── components/                    # Reusable UI components
│   ├── CalendarHeader.vue        # Calendar navigation and view controls
│   ├── EventDetailModal.vue      # Event information and booking modal
│   ├── MonthView.vue             # Monthly calendar display
│   ├── MoreEventsModal.vue       # Modal for displaying multiple events
│   ├── StatisticsCards.vue       # Training statistics display
│   └── WeekView.vue              # Weekly calendar display
├── composables/                   # Business logic and state management
│   ├── useCalendar.js            # Calendar-related logic
│   ├── useModal.js               # Modal management
│   └── useTrainingEvents.js      # Training events data and validation
├── TrainingBooking.vue           # Main container component
└── README.md                     # This documentation
```

## 🧩 Component Breakdown

### Main Container
- **TrainingBooking.vue**: Main container that orchestrates all components and composables

### UI Components

#### StatisticsCards.vue
- **Purpose**: Displays training statistics (total events, monthly events)
- **Props**: 
  - `totalEvents`: Number - Total number of training events
  - `thisMonthEvents`: Number - Number of events this month
- **Features**: Responsive grid layout with icon indicators

#### CalendarHeader.vue
- **Purpose**: Navigation controls and view mode selection
- **Props**:
  - `currentMonthYear`: String - Current month and year display
  - `viewMode`: String - Current view mode ('month' or 'week')
- **Events**:
  - `previous-month`: Navigate to previous month
  - `next-month`: Navigate to next month
  - `go-to-today`: Jump to current date
  - `update:view-mode`: Change view mode
- **Features**: Responsive design, keyboard navigation

#### MonthView.vue
- **Purpose**: Monthly calendar grid with event display
- **Props**: 
  - `calendarDates`: Array - Calendar dates with events
  - `daysOfWeek`: Array - Day names
  - Various helper functions for event display
- **Events**:
  - `view-event`: Open event details
  - `show-more-events`: Show overflow events modal
- **Features**: Multi-day event bars, event overflow handling

#### WeekView.vue
- **Purpose**: Weekly calendar with time slots
- **Props**:
  - `weekDays`: Array - Week day information
  - `timeSlots`: Array - Available time slots
  - Helper functions for event management
- **Events**:
  - `view-event`: Open event details
  - `add-event-to-time-slot`: Add event to specific time slot
- **Features**: Hourly time slots, drag interaction support

#### EventDetailModal.vue
- **Purpose**: Detailed event information and booking interface
- **Props**: 
  - `show`: Boolean - Modal visibility
  - `selectedEvent`: Object - Selected event data
  - `selectedDate`: String - Selected date for multi-day events
  - Various formatting and validation functions
- **Events**:
  - `close`: Close modal
  - `select-date`: Select specific date for multi-day events
  - `book-training`: Book training event
- **Features**: Registration deadline validation, multi-day date selection

#### MoreEventsModal.vue
- **Purpose**: Display multiple events when overflow occurs
- **Props**:
  - `show`: Boolean - Modal visibility
  - `eventsDate`: String - Date for events display
  - `eventsList`: Array - List of events to show
  - Helper functions for event display
- **Events**:
  - `close`: Close modal
  - `view-event`: View specific event details
- **Features**: Event list with status indicators

### Business Logic (Composables)

#### useCalendar.js
- **Purpose**: Calendar date management, navigation, and formatting
- **Features**:
  - Date navigation (previous/next month, today)
  - Calendar date generation
  - Thai date formatting
  - Date range formatting
  - Event display generation for calendar cells

#### useTrainingEvents.js
- **Purpose**: Event data, validation, and registration rules
- **Features**:
  - Event data management
  - Registration deadline validation
  - Event booking eligibility checks
  - Multi-day event date availability
  - Event status and display helpers

#### useModal.js
- **Purpose**: Modal state management and event handling
- **Features**:
  - Modal visibility state
  - Event selection and date management
  - Navigation to booking process
  - Event detail display coordination

## 🔄 Data Flow

```
TrainingBooking.vue (Main Container)
├── Composables provide data and methods
├── Components receive props and emit events
└── Data flows down, events flow up
```

## 🚀 Key Features

### Modular Architecture
- **Separation of Concerns**: UI components focus on presentation, composables handle business logic
- **Reusability**: Components can be easily reused in other parts of the application
- **Maintainability**: Each component has a single responsibility, making debugging easier
- **Testability**: Components can be tested in isolation

### Event Management
- **Multi-day Events**: Support for events spanning multiple days with continuous visual bars
- **Registration Rules**: Advance registration requirements with deadline validation
- **Capacity Management**: Track participant count vs. capacity with visual indicators
- **Date Selection**: Smart date selection for multi-day events

### Calendar Features
- **Multiple Views**: Month and week views with different layouts
- **Event Display**: Smart event placement with "more events" overflow handling
- **Navigation**: Month navigation with "today" quick access
- **Thai Localization**: Full Thai language support and Buddhist calendar

### User Experience
- **Responsive Design**: Works on mobile and desktop devices
- **Accessibility**: Keyboard navigation and screen reader support
- **Visual Feedback**: Hover effects, loading states, and clear status indicators
- **Performance**: Optimized rendering and event handling

## 🔧 Usage Example

```vue
<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Statistics -->
    <StatisticsCards 
      :total-events="events.length"
      :this-month-events="thisMonthEvents"
    />
    
    <!-- Calendar -->
    <div class="container mx-auto p-6 max-w-7xl">
      <div class="bg-white rounded-lg border border-gray-300 shadow-sm">
        <CalendarHeader
          :current-month-year="currentMonthYear"
          v-model:view-mode="viewMode"
          @previous-month="previousMonth"
          @next-month="nextMonth"
          @go-to-today="goToToday"
        />
        
        <MonthView v-if="viewMode === 'month'" ... />
        <WeekView v-else-if="viewMode === 'week'" ... />
      </div>
      
      <EventDetailModal ... />
      <MoreEventsModal ... />
    </div>
  </div>
</template>

<script setup>
import { useCalendar } from './composables/useCalendar.js'
import { useTrainingEvents } from './composables/useTrainingEvents.js'
import { useModal } from './composables/useModal.js'
// ... component imports and logic
</script>
```

## 📈 Benefits of This Structure

1. **Easier to Understand**: Each component has a clear, single responsibility
2. **Better Testing**: Components can be tested in isolation
3. **Improved Performance**: Components can be optimized independently
4. **Code Reuse**: Calendar components can be used in other modules
5. **Team Development**: Multiple developers can work on different components simultaneously
6. **Maintainability**: Bugs and features can be traced to specific components quickly
7. **Documentation**: Each component is self-documenting with clear props and events

## 🔮 Future Enhancements

This modular structure makes it easy to add new features:
- Add new calendar views (agenda view, multi-month view)
- Extend event types with different validation rules
- Add recurring events support
- Implement drag-and-drop event management
- Add export functionality for calendars
- Create additional event status types
- Implement event filtering and search

## 🧪 Testing Strategy

With the modular structure, you can test:
- **Unit Tests**: Individual components and composables
- **Integration Tests**: Component interactions
- **E2E Tests**: Full user workflows
- **Visual Tests**: Component rendering and styling

## 📝 Migration Notes

The functionality remains exactly the same as the original component, but now with:
- Better organization and maintainability
- Clearer separation of concerns
- Improved readability and understanding
- Enhanced reusability potential
- Better testing capabilities

All existing features and behaviors are preserved while gaining the benefits of modular architecture.