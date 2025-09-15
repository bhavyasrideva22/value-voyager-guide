import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Compass, 
  TrendingUp, 
  Users, 
  Lightbulb,
  Award,
  Download,
  RefreshCw
} from "lucide-react";
import { AssessmentResult } from "@/types/assessment";

interface AssessmentResultsProps {
  results: AssessmentResult;
  onRestart: () => void;
}

const AssessmentResults = ({ results, onRestart }: AssessmentResultsProps) => {
  const { coreValues } = results;

  const getValueScore = (valueId: string) => {
    const rating = coreValues.ratings.find(r => r.value.id === valueId);
    return rating?.score || 0;
  };

  const roleMatches = [
    { role: "UX Designer", match: 85, description: "Creative problem-solving with user impact" },
    { role: "Product Manager", match: 78, description: "Strategic thinking with team collaboration" },
    { role: "Learning Designer", match: 72, description: "Education technology and growth focus" },
  ];

  const careerInsights = [
    {
      icon: <Target className="w-5 h-5" />,
      title: "Value Alignment Strong",
      description: "Your top values align well with creative and collaborative roles"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Growth Trajectory",
      description: "Consider roles with learning opportunities and skill development"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Team Environment",
      description: "You thrive in collaborative, supportive team cultures"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            Assessment Complete
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Your Purpose Alignment Profile
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover your unique value system and ideal career direction
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Core Values Results */}
          <Card className="shadow-medium border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-primary" />
                Your Top 5 Core Values
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {coreValues.topValues.map((value, index) => (
                <div key={value.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <Badge className="w-8 h-8 rounded-full flex items-center justify-center">
                        {index + 1}
                      </Badge>
                      <div>
                        <div className="font-medium">{value.name}</div>
                        <div className="text-sm text-muted-foreground">{value.description}</div>
                      </div>
                    </div>
                    <Badge variant="secondary">{getValueScore(value.id)}</Badge>
                  </div>
                  <Progress value={getValueScore(value.id)} className="h-2" />
                </div>
              ))}
              
              <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">Value Profile</h4>
                <p className="text-sm text-muted-foreground">
                  {coreValues.profile}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Career Matches */}
          <Card className="shadow-medium border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                Top Career Matches
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {roleMatches.map((role, index) => (
                <div key={index} className="p-4 border rounded-lg hover:bg-muted/20 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{role.role}</h4>
                    <Badge 
                      variant={role.match >= 80 ? "default" : "secondary"}
                      className={role.match >= 80 ? "bg-success" : ""}
                    >
                      {role.match}% match
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                  <Progress value={role.match} className="mt-2 h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Career Insights */}
        <Card className="shadow-medium border-0 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-secondary" />
              Key Career Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {careerInsights.map((insight, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center mx-auto mb-3">
                    {insight.icon}
                  </div>
                  <h4 className="font-medium text-foreground mb-2">{insight.title}</h4>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="shadow-medium border-0 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-success" />
              Recommended Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Career Experiments</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    Try a 2-week design thinking workshop or online course
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    Shadow a professional in your top-matched roles
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                    Join professional communities aligned with your values
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Values-Aligned Companies</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    IDEO - Design thinking and human-centered innovation
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    Coursera - Education technology and learning
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    Atlassian - Collaborative tools and team culture
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Results
          </Button>
          <Button 
            onClick={onRestart}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Retake Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentResults;