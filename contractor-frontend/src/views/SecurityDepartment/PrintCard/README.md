# PrintCard Module - Component Structure

This module has been refactored from a single large component into multiple smaller, manageable components following Vue.js best practices for maintainability and reusability.

## Component Architecture

### Main Component
- **`PrintCard.vue`** - Main orchestrator component that manages the overall state and coordinates between child components

### Child Components

#### 1. **`TrainingTypeSelector.vue`**
- **Purpose**: Displays available training types in a grid layout
- **Responsibility**: 
  - Shows training type cards with descriptions and employee counts
  - Handles training type selection
- **Props**: 
  - `trainingTypes`: Array of training types with counts
- **Emits**: 
  - `selectTraining`: When a training type is selected

#### 2. **`EmployeeListView.vue`**
- **Purpose**: Main employee management interface
- **Responsibility**: 
  - Displays header with navigation back to training selection
  - Contains control panel and employee table
  - Manages the overall layout for employee selection
- **Props**: 
  - `selectedTrainingType`, `contractors`, `selectedContractors`
  - Search filters: `searchCompany`, `searchDate`
  - Date fields: `issueDate`, `expiryDate`
- **Emits**: 
  - Navigation: `goBack`
  - Employee selection: `selectContractor`, `selectAll`
  - Actions: `print`
  - Form updates: `update:searchCompany`, `update:searchDate`, etc.

#### 3. **`ControlPanel.vue`**
- **Purpose**: Filter controls and action buttons
- **Responsibility**: 
  - Search filters (company, training date)
  - Date inputs (issue date, expiry date)
  - Statistics display
  - Action buttons (select all, print)
- **Props**: 
  - Search fields, dates, counts
- **Emits**: 
  - Form field updates and actions

#### 4. **`EmployeeTable.vue`**
- **Purpose**: Employee list display with selection checkboxes
- **Responsibility**: 
  - Tabular display of filtered employees
  - Individual and bulk selection functionality
  - Employee information display
- **Props**: 
  - `contractors`: Filtered employee list
  - `selectedContractors`: Currently selected employees
- **Emits**: 
  - `selectContractor`: Individual selection
  - `selectAll`: Bulk selection toggle

#### 5. **`CardPreview.vue`**
- **Purpose**: Print preview interface
- **Responsibility**: 
  - Shows preview of employee cards before printing
  - Print functionality
  - Navigation back to employee selection
- **Props**: 
  - `selectedContractorData`: Employees with QR codes
  - `selectedTrainingType`, `issueDate`, `expiryDate`
- **Emits**: 
  - `print`: Trigger print function
  - `goBack`: Return to employee selection

#### 6. **`EmployeeCard.vue`**
- **Purpose**: Individual employee card layout
- **Responsibility**: 
  - Displays single employee card with all information
  - QR code display
  - Print-optimized layout
- **Props**: 
  - `contractor`: Employee data
  - `issueDate`, `expiryDate`: Card validity dates

## Composables (Business Logic)

### 1. **`usePrintCard.js`**
- **Purpose**: Main state management and business logic
- **Responsibilities**:
  - Reactive state management (search filters, selections, dates)
  - QR code generation
  - Date validation and management
  - Print functionality
  - Employee selection logic

### 2. **`useContractorData.js`**
- **Purpose**: Data management and filtering
- **Responsibilities**:
  - Mock data definitions (training types, contractors)
  - Data filtering logic
  - Data transformation utilities
  - Count calculations

### 3. **`useUtils.js`**
- **Purpose**: Utility functions
- **Responsibilities**:
  - Date formatting (Thai locale)
  - Card age calculation
  - Date validation
  - Reusable helper functions

## Data Flow

1. **Training Selection**: User selects training type → Updates main state
2. **Employee Selection**: Filtered employees displayed → User selects employees
3. **Date Configuration**: User sets issue/expiry dates → Validated in real-time
4. **Preview Generation**: QR codes generated → Preview cards displayed
5. **Printing**: Print function triggered → Browser print dialog

## Key Benefits of This Architecture

### 1. **Separation of Concerns**
- Each component has a single, clear responsibility
- Business logic separated into composables
- UI components focus only on presentation

### 2. **Reusability**
- Components can be reused in different contexts
- Composables can be shared across components
- Utility functions are easily testable

### 3. **Maintainability**
- Smaller files are easier to understand and modify
- Clear component boundaries make debugging easier
- Changes to one component don't affect others

### 4. **Testability**
- Individual components can be unit tested
- Business logic in composables is easily testable
- Mock data and functions can be easily replaced

### 5. **Performance**
- Components can be lazy-loaded
- Smaller bundle sizes for individual features
- Better tree-shaking opportunities

## Usage Example

```vue
<template>
  <PrintCard />
</template>

<script setup>
import PrintCard from '@/views/SecurityDepartment/PrintCard/PrintCard.vue'
</script>
```

## Component Dependencies

```
PrintCard.vue (Main)
├── TrainingTypeSelector.vue
├── EmployeeListView.vue
│   ├── ControlPanel.vue
│   └── EmployeeTable.vue
├── CardPreview.vue
│   └── EmployeeCard.vue (multiple instances)
├── usePrintCard.js
├── useContractorData.js
└── useUtils.js
```

## File Structure
```
src/views/SecurityDepartment/PrintCard/
├── PrintCard.vue                 # Main component
├── components/
│   ├── TrainingTypeSelector.vue  # Training type selection
│   ├── EmployeeListView.vue      # Employee management interface
│   ├── ControlPanel.vue          # Filters and controls
│   ├── EmployeeTable.vue         # Employee list display
│   ├── CardPreview.vue           # Print preview
│   └── EmployeeCard.vue          # Individual card layout
├── composables/
│   ├── usePrintCard.js           # Main business logic
│   ├── useContractorData.js      # Data management
│   └── useUtils.js               # Utility functions
└── README.md                     # Documentation
```

This refactored architecture provides a clean, maintainable, and scalable solution for the employee card printing functionality while preserving all original features and improving code organization.