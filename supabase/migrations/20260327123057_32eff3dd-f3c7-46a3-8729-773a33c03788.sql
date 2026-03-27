
-- Enable realtime for order_tracking table (ignore if already added)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'order_tracking'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.order_tracking;
  END IF;
END $$;
