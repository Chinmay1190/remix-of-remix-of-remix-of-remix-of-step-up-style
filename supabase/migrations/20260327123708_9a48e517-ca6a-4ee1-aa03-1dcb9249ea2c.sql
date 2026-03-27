
-- Attach trigger for initial tracking on order creation
CREATE OR REPLACE TRIGGER on_order_created
  AFTER INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.create_initial_tracking();

-- Attach trigger for tracking status changes  
CREATE OR REPLACE TRIGGER on_order_status_change
  AFTER UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.track_order_status_change();
