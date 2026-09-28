-- HoneyTrace Database Schema: Auth Trigger to Sync auth.users -> public.users

-- 1. Create trigger function to handle new auth users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  raw_role text;
  assigned_role user_role;
BEGIN
  raw_role := COALESCE(NEW.raw_user_meta_data->>'role', 'beekeeper');
  
  -- Cast or default to beekeeper
  BEGIN
    assigned_role := raw_role::user_role;
  EXCEPTION WHEN OTHERS THEN
    assigned_role := 'beekeeper'::user_role;
  END;

  -- Insert profile row in public.users
  INSERT INTO public.users (id, email, name, role, created_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    assigned_role,
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    role = EXCLUDED.role,
    email = EXCLUDED.email;

  -- Also sync to user_roles if table exists
  BEGIN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, assigned_role::text)
    ON CONFLICT DO NOTHING;
  EXCEPTION WHEN OTHERS THEN
    NULL;
  END;

  -- Also sync to profiles if table exists
  BEGIN
    INSERT INTO public.profiles (id, display_name)
    VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
    )
    ON CONFLICT (id) DO UPDATE SET display_name = EXCLUDED.display_name;
  EXCEPTION WHEN OTHERS THEN
    NULL;
  END;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Bind trigger to auth.users AFTER INSERT
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
