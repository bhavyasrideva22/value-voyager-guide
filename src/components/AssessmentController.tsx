import { useState } from "react";
import AssessmentIntro from "./AssessmentIntro";
import CoreValuesAssessment from "./CoreValuesAssessment";
import AssessmentResults from "./AssessmentResults";
import ProgressTracker from "./ProgressTracker";
import { AssessmentState, AssessmentResult, ValueRating, ValueComparison } from "@/types/assessment";
import { coreValues, valueProfiles } from "@/data/coreValues";

const AssessmentController = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentData, setAssessmentData] = useState<AssessmentState>({
    currentStep: 0,
    completedSteps: [],
    values: {
      comparisons: [],
      ratings: [],
      dilemmaChoices: [],
      topFiveRanking: []
    }
  });

  const stepLabels = ["Introduction", "Core Values", "Purpose Type", "Fulfillment", "Results"];

  const calculateResults = (data: AssessmentState): AssessmentResult => {
    const { values } = data;
    
    // Calculate top values based on ratings and selections
    const topValueIds = values.topFiveRanking.length > 0 
      ? values.topFiveRanking 
      : values.ratings
          .sort((a, b) => b.score - a.score)
          .slice(0, 5)
          .map(r => r.value.id);
    
    const topValues = topValueIds.map(id => coreValues.find(v => v.id === id)!).filter(Boolean);
    
    // Determine value profile based on top 2 values
    const primaryValues = topValueIds.slice(0, 2).sort();
    const profileKey = primaryValues.join('-');
    const profile = valueProfiles[profileKey as keyof typeof valueProfiles] || "The Balanced Professional";
    
    return {
      coreValues: {
        topValues,
        ratings: values.ratings,
        profile
      }
    };
  };

  const handleIntroNext = () => {
    setCurrentStep(1);
  };

  const handleValuesNext = (data: { 
    comparisons: ValueComparison[]; 
    ratings: ValueRating[]; 
    dilemmaChoice: string; 
    topFive: string[] 
  }) => {
    const updatedData = {
      ...assessmentData,
      values: {
        ...assessmentData.values,
        comparisons: data.comparisons,
        ratings: data.ratings,
        dilemmaChoices: [data.dilemmaChoice],
        topFiveRanking: data.topFive
      },
      completedSteps: [...assessmentData.completedSteps, 1]
    };
    
    setAssessmentData(updatedData);
    
    // Calculate final results and jump to results
    const results = calculateResults(updatedData);
    setAssessmentData(prev => ({ ...prev, results }));
    setCurrentStep(4); // Skip to results for now
  };

  const handlePrevious = () => {
    setCurrentStep(Math.max(0, currentStep - 1));
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAssessmentData({
      currentStep: 0,
      completedSteps: [],
      values: {
        comparisons: [],
        ratings: [],
        dilemmaChoices: [],
        topFiveRanking: []
      }
    });
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <AssessmentIntro onStart={handleIntroNext} />;
      
      case 1:
        return (
          <CoreValuesAssessment 
            onNext={handleValuesNext}
            onPrevious={handlePrevious}
          />
        );
      
      case 4:
        return assessmentData.results ? (
          <AssessmentResults 
            results={assessmentData.results}
            onRestart={handleRestart}
          />
        ) : null;
      
      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Coming Soon
              </h2>
              <p className="text-muted-foreground mb-6">
                This section is under development
              </p>
              <div className="space-x-4">
                <button 
                  onClick={handlePrevious}
                  className="px-4 py-2 border rounded hover:bg-muted"
                >
                  Previous
                </button>
                <button 
                  onClick={() => setCurrentStep(4)}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
                >
                  Skip to Results
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      {/* Progress Tracker - only show for assessment steps */}
      {currentStep > 0 && currentStep < 4 && (
        <div className="bg-background border-b">
          <div className="container mx-auto px-4 py-4">
            <ProgressTracker 
              currentStep={currentStep}
              totalSteps={stepLabels.length - 1} // Exclude results from progress
              stepLabels={stepLabels.slice(1, -1)} // Exclude intro and results
            />
          </div>
        </div>
      )}
      
      {renderCurrentStep()}
    </div>
  );
};

export default AssessmentController;