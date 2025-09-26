import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  // CardContent,
  CardFooter,
} from "@/components/ui/card";
import { deleteJournal } from "@/services/journalApi";
import { getJournals } from "@/services/journalApi";
import type { Journal } from "@/models/journal";
import AppSidebar from "@/components/layouts/side-bar";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { NavLink } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

export default function LandingPage() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    getJournals()
      .then((data) => {
        console.log("Fetched journals:", data);
        setJournals(data);
      })
      .catch((err) => console.error("Failed to load Journal", err))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteJournal(id);
      toast.success("Journal entry deleted successfully ✅");
      setJournals(journals.filter((journal) => journal.id !== id));
    } catch (err) {
      console.error("Failed to delete journal entry", err);
      toast.error("Failed to delete journal entry ❌");
    }
  };

  const filteredJournals =
    selectedCategory === "all"
      ? journals
      : journals.filter((journal) => journal.category === selectedCategory);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <SidebarProvider className="flex min-h-screen">
      <AppSidebar />
      <div className="py-10 px-25 flex-1">
        <div className="flex-cols gap-5 items-center mb-6">
          <h1 className="text-6xl font-bold">All Journal Entries</h1>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="text-[20px] font-bold bg-black text-white border-white w-50 mt-5">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="study">Study</SelectItem>
              <SelectItem value="travel">Travel</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator className="mb-6 h-[3px] shadow" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  ">
          {filteredJournals.length > 0 ? (
            filteredJournals.map((entry) => (
              <Card
                key={entry.id}
                className="flex flex-col justify-between bg-black transform hover:scale-102 transition-transform duration-500"
              >
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-white">
                    {entry.title}
                  </CardTitle>
                  <p className="text-sm text-gray-100">{entry.category}</p>
                </CardHeader>
                <CardFooter className="flex justify-between text-sm text-gray-100">
                  <span>
                    Created: {new Date(entry.createdAt).toLocaleDateString()}
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      asChild
                      className="bg-white text-black transition-colors duration-100 hover:bg-white hover:text-black"
                    >
                      <NavLink to="/entry">View</NavLink>
                    </Button>
                    <Button
                      variant={"destructive"}
                      onClick={() => handleDelete(entry.id)}
                      disabled={loading}
                      className=""
                    >
                      {loading ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">
              No journal entries found.
            </p>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
}
