-- Allow anonymous link creation by making user_id nullable
-- Add user_id column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'links' AND column_name = 'user_id') THEN
        ALTER TABLE public.links ADD COLUMN user_id UUID;
    END IF;
END $$;

ALTER TABLE public.links ALTER COLUMN user_id DROP NOT NULL;

-- Drop old policies if they exist
DROP POLICY IF EXISTS "Users can view their own links" ON public.links;
DROP POLICY IF EXISTS "Users can create their own links" ON public.links;
DROP POLICY IF EXISTS "Users can update their own links" ON public.links;
DROP POLICY IF EXISTS "Users can delete their own links" ON public.links;

-- Create new policies allowing public access for creation and view
CREATE POLICY "Anyone can view links" 
ON public.links 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create links" 
ON public.links 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own links" 
ON public.links 
FOR UPDATE 
USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can delete their own links" 
ON public.links 
FOR DELETE 
USING (auth.uid() = user_id OR user_id IS NULL);