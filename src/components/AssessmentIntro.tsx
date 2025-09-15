import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Compass, Target, Users, Lightbulb, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-compass.jpg";

interface AssessmentIntroProps {
  onStart: () => void;
}

const AssessmentIntro = ({ onStart }: AssessmentIntroProps) => {
  const features = [
    {
      icon: <Target className="w-5 h-5" />,
      title: "Core Values Discovery",
      description: "Identify your top 5 work values through paired comparisons and priority ranking"
    },
    {
      icon: <Compass className="w-5 h-5" />,
      title: "Purpose Archetype",
      description: "Discover your unique purpose archetype: Builder, Healer, Creator, or Explorer"
    },
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Meaning & Fulfillment",
      description: "Understand what energizes vs drains you in your daily work"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Career Alignment",
      description: "Get personalized role matches and career path recommendations"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Compass className="w-4 h-4" />
            Purpose Alignment Detector
          </div>
          
          {/* Hero Image */}
          <div className="mb-8">
            <img 
              src={heroImage} 
              alt="Purpose Alignment Compass - Professional career assessment tool"
              className="w-full max-w-2xl mx-auto rounded-xl shadow-strong"
            />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            Discover What <span className="gradient-primary bg-clip-text text-transparent">Truly Drives You</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Align your work and life with your deepest values and most authentic purpose. 
            Uncover your intrinsic motivators and find career paths that truly fulfill you.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge variant="secondary" className="px-4 py-2">15-20 minutes</Badge>
            <Badge variant="outline" className="px-4 py-2">Science-backed</Badge>
            <Badge variant="outline" className="px-4 py-2">Personalized insights</Badge>
          </div>
        </div>

        {/* Key Question */}
        <Card className="shadow-soft border-0 mb-12">
          <CardContent className="p-8 text-center gradient-card">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              The Question This Assessment Answers:
            </h2>
            <blockquote className="text-xl font-medium text-primary italic">
              "What kind of work is worth devoting my life to?"
            </blockquote>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-soft border-0 transition-smooth hover:shadow-medium">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Who This Is For */}
        <Card className="shadow-soft border-0 mb-12">
          <CardContent className="p-8">
            <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
              Perfect for you if you're:
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <Users className="w-8 h-8 text-secondary mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Starting your career and want clarity on direction</p>
              </div>
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-accent mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Considering a career pivot or change</p>
              </div>
              <div className="text-center">
                <Target className="w-8 h-8 text-success mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Seeking deeper fulfillment in your current role</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Button 
            onClick={onStart}
            size="lg"
            className="gradient-primary hover:shadow-medium transition-spring px-8 py-4 text-lg font-semibold"
          >
            Start Your Assessment
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            No signup required • Results available immediately
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssessmentIntro;