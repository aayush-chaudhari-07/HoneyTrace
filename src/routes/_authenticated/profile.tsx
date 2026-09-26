import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { HoneycombLoader } from "@/components/HoneycombLoader";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "Profile — HoneyTrace" },
      { name: "description", content: "Manage your HoneyTrace beekeeper profile." },
      { property: "og:title", content: "Profile — HoneyTrace" },
      { property: "og:description", content: "Manage your HoneyTrace beekeeper profile." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = Route.useRouteContext();
  const qc = useQueryClient();
  const profile = useQuery({
    queryKey: ["profile", user.id],
    queryFn: async () => (await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle()).data,
  });
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const display_name = String(f.get("display_name")).trim();
    if (display_name.length < 2) { toast.error("Name must be at least 2 characters"); return; }
    const { error } = await supabase.from("profiles").upsert({
      id: user.id, display_name, apiary_name: String(f.get("apiary_name")).trim(), location: String(f.get("location")).trim(),
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Profile saved");
    qc.invalidateQueries({ queryKey: ["profile"] });
  };
  return (
    <AppShell>
      <h1 className="text-4xl sm:text-5xl">Profile</h1>
      <p className="mt-2 text-muted-foreground">{user.email}</p>
      {profile.isLoading ? (
        <HoneycombLoader label="Opening profile details…" className="mt-8 justify-start" />
      ) : (
        <form onSubmit={submit} className="mt-8 max-w-lg space-y-4 rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="space-y-1"><Label htmlFor="display_name">Your name</Label><Input id="display_name" name="display_name" defaultValue={profile.data?.display_name ?? ""} /></div>
          <div className="space-y-1"><Label htmlFor="apiary_name">Apiary name</Label><Input id="apiary_name" name="apiary_name" defaultValue={profile.data?.apiary_name ?? ""} /></div>
          <div className="space-y-1"><Label htmlFor="location">Location</Label><Input id="location" name="location" defaultValue={profile.data?.location ?? ""} /></div>
          <Button type="submit" variant="honeycomb">Save profile</Button>
        </form>
      )}
    </AppShell>
  );
}
