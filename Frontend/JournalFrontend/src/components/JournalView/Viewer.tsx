"use client";

import { type ReactNode } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { Journal } from "@/models/journal";

interface JournalDialogProps {
  entry: Journal | null;
  trigger?: ReactNode; // optional trigger (button/icon/etc)
  // optional controlled API
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  // you can add other props (size, className) as needed
}

export default function JournalDialog({
  entry,
  trigger,
  open,
  onOpenChange,
}: JournalDialogProps) {
  if (!entry) return null;

  const createdAt = entry.createdAt ? new Date(entry.createdAt) : null;
  const updatedAt = entry.updatedAt ? new Date(entry.updatedAt) : null;

  // Build props for Dialog: only pass open/onOpenChange if both provided
  const dialogProps =
    open !== undefined && typeof onOpenChange === "function"
      ? { open, onOpenChange }
      : {};

  return (
    // @ts-ignore — dialogProps typed as any to allow conditional spread
    <Dialog {...(dialogProps as any)}>
      {/* if trigger was provided, use it as the DialogTrigger */}
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className="max-w-4xl w-full bg-white text-black">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            {entry.title}
          </DialogTitle>

          {/* Hidden description for accessibility (avoids missing-description warning) */}
          <DialogDescription className="sr-only">
            Journal entry details for {entry.title}
          </DialogDescription>
        </DialogHeader>

        {/* metadata moved outside DialogDescription to avoid invalid nesting */}
        <div className="flex justify-between text-gray-500 text-sm mt-1">
          <span>Category: {entry.category ?? "—"}</span>
          <span>
            Created: {createdAt ? createdAt.toLocaleDateString() : "N/A"}
          </span>
          <span>
            Last updated: {updatedAt ? updatedAt.toLocaleDateString() : "N/A"}
          </span>
        </div>

        <Separator className="my-4" />

        {/* <pre className="text-xs text-gray-500">
          {JSON.stringify(entry, null, 2)}
        </pre> */}
        {/* content */}
        <div className="prose max-w-none text-gray-800">
          {entry.Content ? ( // 👈 notice uppercase
            <div dangerouslySetInnerHTML={{ __html: entry.Content }} />
          ) : (
            <p className="text-gray-400 italic">(No content)</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
