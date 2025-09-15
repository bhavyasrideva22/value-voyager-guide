import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { coreValues } from "@/data/coreValues";
import { ValueComparison, ValueRating } from "@/types/assessment";

interface CoreValuesAssessmentProps {
  onNext: (data: { comparisons: ValueComparison[]; ratings: ValueRating[]; dilemmaChoice: string; topFive: string[] }) => void;
  onPrevious: () => void;
}

const CoreValuesAssessment = ({ onNext, onPrevious }: CoreValuesAssessmentProps) => {
  const [currentSubStep, setCurrentSubStep] = useState(1);
  const [comparisons, setComparisons] = useState<ValueComparison[]>([]);
  const [ratings, setRatings] = useState<ValueRating[]>(
    coreValues.map(value => ({ value, score: 50 }))
  );
  const [dilemmaChoice, setDilemmaChoice] = useState<string>("");
  const [topFiveRanking, setTopFiveRanking] = useState<string[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  // Generate value pairs for comparison
  const generateComparisons = () => {
    const pairs: ValueComparison[] = [];
    const selectedValueObjs = coreValues.filter(v => ["autonomy", "belonging", "creativity", "security", "service", "mastery"].includes(v.id));
    
    for (let i = 0; i < selectedValueObjs.length; i++) {
      for (let j = i + 1; j < selectedValueObjs.length; j++) {
        pairs.push({
          valueA: selectedValueObjs[i],
          valueB: selectedValueObjs[j]
        });
      }
    }
    return pairs.slice(0, 6); // Limit to 6 comparisons
  };

  const handleComparisonSelect = (comparisonIndex: number, selectedValueId: string) => {
    const updatedComparisons = [...(comparisons.length ? comparisons : generateComparisons())];
    updatedComparisons[comparisonIndex].selected = selectedValueId;
    setComparisons(updatedComparisons);
  };

  const handleRatingChange = (valueId: string, newScore: number) => {
    setRatings(prev => prev.map(rating => 
      rating.value.id === valueId 
        ? { ...rating, score: newScore }
        : rating
    ));
  };

  const handleValueToggle = (valueId: string) => {
    setSelectedValues(prev => {
      if (prev.includes(valueId)) {
        return prev.filter(id => id !== valueId);
      } else if (prev.length < 5) {
        return [...prev, valueId];
      }
      return prev;
    });
  };

  const canProceed = () => {
    switch (currentSubStep) {
      case 1: return comparisons.every(c => c.selected);
      case 2: return true; // Ratings can always proceed
      case 3: return dilemmaChoice !== "";
      case 4: return selectedValues.length === 5;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentSubStep < 4) {
      setCurrentSubStep(currentSubStep + 1);
      if (currentSubStep === 1 && comparisons.length === 0) {
        setComparisons(generateComparisons());
      }
    } else {
      onNext({
        comparisons,
        ratings,
        dilemmaChoice,
        topFive: selectedValues
      });
    }
  };

  const renderSubStep = () => {
    switch (currentSubStep) {
      case 1:
        return (
          <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle className="text-center">Value Comparisons</CardTitle>
              <p className="text-muted-foreground text-center">
                For each pair, choose which feels more essential to your daily satisfaction
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {(comparisons.length ? comparisons : generateComparisons()).map((comparison, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-4">
                    Comparison {index + 1} of {generateComparisons().length}
                  </p>
                  <RadioGroup
                    value={comparison.selected || ""}
                    onValueChange={(value) => handleComparisonSelect(index, value)}
                  >
                    <div className="flex items-center space-x-3 p-3 border rounded hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={comparison.valueA.id} id={`${index}-a`} />
                      <Label htmlFor={`${index}-a`} className="flex-1 cursor-pointer">
                        <div>
                          <div className="font-medium">{comparison.valueA.name}</div>
                          <div className="text-sm text-muted-foreground">{comparison.valueA.description}</div>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={comparison.valueB.id} id={`${index}-b`} />
                      <Label htmlFor={`${index}-b`} className="flex-1 cursor-pointer">
                        <div>
                          <div className="font-medium">{comparison.valueB.name}</div>
                          <div className="text-sm text-muted-foreground">{comparison.valueB.description}</div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              ))}
            </CardContent>
          </Card>
        );

      case 2:
        return (
          <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle className="text-center">Rate Your Values</CardTitle>
              <p className="text-muted-foreground text-center">
                How important are these values in your ideal work environment? (0-100)
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {coreValues.slice(0, 8).map((value) => {
                const rating = ratings.find(r => r.value.id === value.id)?.score || 50;
                return (
                  <div key={value.id} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{value.name}</div>
                        <div className="text-sm text-muted-foreground">{value.description}</div>
                      </div>
                      <Badge variant="secondary">{rating}</Badge>
                    </div>
                    <Slider
                      value={[rating]}
                      onValueChange={(values) => handleRatingChange(value.id, values[0])}
                      max={100}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        );

      case 3:
        return (
          <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle className="text-center">Career Dilemma</CardTitle>
              <p className="text-muted-foreground text-center">
                You're offered two jobs. Which do you choose?
              </p>
            </CardHeader>
            <CardContent>
              <RadioGroup value={dilemmaChoice} onValueChange={setDilemmaChoice}>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="stable" id="stable" className="mt-1" />
                    <Label htmlFor="stable" className="flex-1 cursor-pointer">
                      <div className="font-medium mb-2">High Salary & Security</div>
                      <div className="text-sm text-muted-foreground">
                        Excellent compensation, stable routine, clearly structured roles, 
                        predictable work environment, strong job security
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="creative" id="creative" className="mt-1" />
                    <Label htmlFor="creative" className="flex-1 cursor-pointer">
                      <div className="font-medium mb-2">Creative Freedom & Flexibility</div>
                      <div className="text-sm text-muted-foreground">
                        Lower pay but high creativity, flexible working hours, 
                        varied projects, innovative environment, work-life balance
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        );

      case 4:
        return (
          <Card className="shadow-soft border-0">
            <CardHeader>
              <CardTitle className="text-center">Select Your Top 5 Values</CardTitle>
              <p className="text-muted-foreground text-center">
                Choose exactly 5 values that matter most to you
              </p>
              <div className="text-center">
                <Badge variant={selectedValues.length === 5 ? "default" : "secondary"}>
                  {selectedValues.length}/5 selected
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {coreValues.map((value) => (
                  <button
                    key={value.id}
                    onClick={() => handleValueToggle(value.id)}
                    disabled={!selectedValues.includes(value.id) && selectedValues.length >= 5}
                    className={`p-4 border rounded-lg text-left transition-all ${
                      selectedValues.includes(value.id)
                        ? 'border-primary bg-primary/5 shadow-soft'
                        : 'border-border hover:border-muted-foreground hover:bg-muted/50'
                    } ${!selectedValues.includes(value.id) && selectedValues.length >= 5 ? 'opacity-50' : ''}`}
                  >
                    <div className="font-medium text-sm">{value.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{value.description}</div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  const subStepTitles = ["Comparisons", "Ratings", "Dilemma", "Top 5"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Sub-step Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-foreground">Core Values Discovery</h2>
            <Badge variant="outline">{currentSubStep}/4</Badge>
          </div>
          <Progress value={(currentSubStep / 4) * 100} className="mb-4" />
          <div className="flex justify-between text-sm text-muted-foreground">
            {subStepTitles.map((title, index) => (
              <span 
                key={index}
                className={currentSubStep === index + 1 ? "text-foreground font-medium" : ""}
              >
                {title}
              </span>
            ))}
          </div>
        </div>

        {renderSubStep()}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={currentSubStep === 1 ? onPrevious : () => setCurrentSubStep(currentSubStep - 1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentSubStep === 1 ? "Back to Intro" : "Previous"}
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="gradient-primary"
          >
            {currentSubStep === 4 ? "Complete Values Assessment" : "Next"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CoreValuesAssessment;