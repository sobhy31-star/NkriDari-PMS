import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export function SettingsWebsite() {
  const handleCopyCode = () => {
    const code = `<script src="https://booking.nkridari.com/widget.js"></script>`;
    navigator.clipboard.writeText(code);
    toast.success("Code copié dans le presse-papier");
  };

  const handleCopyLink = () => {
    const link = `https://booking.nkridari.com/your-property`;
    navigator.clipboard.writeText(link);
    toast.success("Lien copié dans le presse-papier");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Site vitrine</CardTitle>
          <CardDescription>Configuration de votre site web</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="websiteUrl">URL du site vitrine</Label>
            <Input
              id="websiteUrl"
              placeholder="https://www.nkridari.com"
              defaultValue="https://www.nkridari.com"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Moteur de réservation</CardTitle>
          <CardDescription>Intégrez le moteur de réservation sur votre site</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bookingUrl">URL du moteur de réservation</Label>
            <div className="flex gap-2">
              <Input
                id="bookingUrl"
                placeholder="https://booking.nkridari.com"
                defaultValue="https://booking.nkridari.com/your-property"
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyLink}
                title="Copier le lien"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="integrationCode">Code d'intégration</Label>
            <div className="relative">
              <Textarea
                id="integrationCode"
                rows={6}
                className="font-mono text-sm"
                defaultValue={`<!-- NkriDari Booking Widget -->
<script src="https://booking.nkridari.com/widget.js"></script>
<div id="nkridari-booking-widget" data-property="your-property-id"></div>
<script>
  NkriDariBooking.init({ propertyId: 'your-property-id' });
</script>`}
                readOnly
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2"
                onClick={handleCopyCode}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copier
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Copiez ce code et collez-le dans votre site web où vous souhaitez afficher le moteur
              de réservation
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
