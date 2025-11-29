import DashboardLayoutNew from "@/components/DashboardLayoutNew";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SettingsProfile } from "@/components/settings/SettingsProfile";
import { SettingsServices } from "@/components/settings/SettingsServices";
import { SettingsPlatforms } from "@/components/settings/SettingsPlatforms";
import { SettingsWebsite } from "@/components/settings/SettingsWebsite";
import { SettingsBilling } from "@/components/settings/SettingsBilling";
import { SettingsTeam } from "@/components/settings/SettingsTeam";
import { useTranslation } from "@/i18n/useTranslation";

export default function SettingsNew() {
  const { t } = useTranslation();
  return (
    <DashboardLayoutNew title={t('pages', 'settings')}>
      <Tabs defaultValue="settings" className="space-y-6">
        {/* Onglets principaux */}
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="settings">{t('settings', 'title')}</TabsTrigger>
          <TabsTrigger value="team">{t('settings', 'team')}</TabsTrigger>
        </TabsList>

        {/* Contenu: Paramètres */}
        <TabsContent value="settings" className="space-y-6">
          <Tabs defaultValue="profile" className="space-y-6">
            {/* Sous-onglets */}
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="profile">{t('settings', 'profile')}</TabsTrigger>
              <TabsTrigger value="services">{t('settings', 'services')}</TabsTrigger>
              <TabsTrigger value="platforms">{t('settings', 'platforms')}</TabsTrigger>
              <TabsTrigger value="website">{t('settings', 'website')}</TabsTrigger>
              <TabsTrigger value="billing">{t('settings', 'billing')}</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <SettingsProfile />
            </TabsContent>

            <TabsContent value="services">
              <SettingsServices />
            </TabsContent>

            <TabsContent value="platforms">
              <SettingsPlatforms />
            </TabsContent>

            <TabsContent value="website">
              <SettingsWebsite />
            </TabsContent>

            <TabsContent value="billing">
              <SettingsBilling />
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Contenu: Équipe */}
        <TabsContent value="team">
          <SettingsTeam />
        </TabsContent>
      </Tabs>
    </DashboardLayoutNew>
  );
}
