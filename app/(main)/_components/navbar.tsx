"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { Title } from "./title";

interface NavbarProps {
  isCollapse: boolean;
  onResetWidth: () => void;
}

export const Navbar = ({ isCollapse, onResetWidth }: NavbarProps) => {
  // Hooks
  const params = useParams();

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  // Render
  if (document === undefined) {
    return (
      <nav className="bg-background dark:bg-[#1F1F1F] px-2 py-2 w-full flex items-cente">
        <Title.Skeleton />
      </nav>
    );
  }

  if (document === null) {
    return null;
  }

  // Return
  return (
    <>
      <nav className="bg-background dark:bg-[#1F1F1F] px-2 py-2 w-full flex items-center gap-x-4">
        {isCollapse && (
          <MenuIcon
            role="button"
            onClick={onResetWidth}
            className="h-6 w-6 text-muted-foreground"
          />
        )}
        <div className="flex items-center justify-between w-full">
          <Title initialData={document} />
        </div>
      </nav>
    </>
  );
};