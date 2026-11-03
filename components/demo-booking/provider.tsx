"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import BookingDialog from "./booking-dialog";

type BookingContext = { openBooking: (trigger: HTMLElement) => void };
const Context = createContext<BookingContext | null>(null);
export function useDemoBooking() {
  const context = useContext(Context);
  if (!context) throw new Error("LiveDemoButton requires DemoBookingProvider.");
  return context;
}
/** One dialog per application surface; drafts stay only in component memory. */
export default function DemoBookingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLElement | null>(null);
  const openBooking = useCallback((element: HTMLElement) => {
    trigger.current = element;
    setOpen(true);
  }, []);
  const value = useMemo(() => ({ openBooking }), [openBooking]);
  return (
    <Context.Provider value={value}>
      {children}
      <BookingDialog
        open={open}
        onOpenChange={setOpen}
        returnFocus={() => {
          if (trigger.current?.isConnected) trigger.current.focus();
        }}
      />
    </Context.Provider>
  );
}
