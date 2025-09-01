import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

const ClientIntake = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <FileText className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl">Example Client Intake</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            <p>This page is ready for your client intake requirements.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClientIntake;