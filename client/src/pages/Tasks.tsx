import DashboardLayoutNew from "@/components/DashboardLayoutNew";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Link } from "wouter";
import { useTranslation } from "@/i18n/useTranslation";

export default function Tasks() {
  const { t } = useTranslation();
  // TODO: Implémenter la liste avec Supabase

  return (
    <DashboardLayoutNew title={t('pages', 'tasks')}>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{t('tasks', 'list')}</h3>
          <Link href="/tasks/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {t('tasks', 'newTask')}
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('tasks', 'title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t('tasks', 'noTasks')}</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayoutNew>
  );
}
