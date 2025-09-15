export interface CoreValue {
  id: string;
  name: string;
  description: string;
}

export interface ValueComparison {
  valueA: CoreValue;
  valueB: CoreValue;
  selected?: string;
}

export interface ValueRating {
  value: CoreValue;
  score: number;
}

export interface AssessmentResult {
  coreValues: {
    topValues: CoreValue[];
    ratings: ValueRating[];
    profile: string;
  };
  purposeArchetype?: {
    primary: string;
    secondary: string;
    description: string;
  };
  fulfillmentFactors?: {
    energizing: string[];
    draining: string[];
    meaningDrivers: string[];
  };
}

export interface AssessmentState {
  currentStep: number;
  completedSteps: number[];
  values: {
    comparisons: ValueComparison[];
    ratings: ValueRating[];
    dilemmaChoices: string[];
    topFiveRanking: string[];
  };
  results?: AssessmentResult;
}